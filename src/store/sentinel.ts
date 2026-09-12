import { create } from "zustand";
import {
  DEFAULT_AGENTS,
  defaultToggles,
  gatesFor,
  stepSim,
  type Agent,
  type Approval,
  type Gate,
  type LogEntry,
  type MissionStatus,
  type ReasonLine,
  type Toggles,
  type Incident,
} from "@/lib/sim";
import type { PrincipleId } from "@/lib/principles";

type SentinelState = {
  toggles: Toggles;
  agents: Agent[];
  logs: LogEntry[];
  approvals: Approval[];
  reasons: ReasonLine[];
  status: MissionStatus;
  tick: number;
  fleetHealth: number;
  stability: number;
  briefingOpen: boolean;
  selectedPrinciple: PrincipleId | null;
  ignoreHalt: number;
  haltArmed: boolean;
  gates: Gate[];
  panel: "audit" | "reason" | "approve";
  setPanel: (p: SentinelState["panel"]) => void;
  toggle: (id: PrincipleId) => void;
  setAll: (on: boolean) => void;
  openBriefing: (open: boolean) => void;
  selectPrinciple: (id: PrincipleId | null) => void;
  startShift: () => void;
  pause: () => void;
  resume: () => void;
  halt: () => void;
  inject: (kind: Exclude<Incident["type"], "tick">) => void;
  decide: (id: string, allow: boolean) => void;
  tickOnce: () => void;
  reset: () => void;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export const useSentinel = create<SentinelState>()((set, get) => ({
  toggles: defaultToggles(),
  agents: DEFAULT_AGENTS.map((a) => ({ ...a })),
  logs: [],
  approvals: [],
  reasons: [],
  status: "idle",
  tick: 0,
  fleetHealth: 100,
  stability: 92,
  briefingOpen: true,
  selectedPrinciple: null,
  ignoreHalt: 0,
  haltArmed: false,
  panel: "audit",
  gates: gatesFor(defaultToggles(), DEFAULT_AGENTS),
  setPanel: (p) => set({ panel: p }),
  toggle: (id) => {
    const toggles = { ...get().toggles, [id]: !get().toggles[id] };
    set({ toggles, gates: gatesFor(toggles, get().agents) });
  },
  setAll: (on) => {
    const toggles = defaultToggles();
    (Object.keys(toggles) as PrincipleId[]).forEach((k) => {
      toggles[k] = on;
    });
    set({ toggles, gates: gatesFor(toggles, get().agents) });
  },
  openBriefing: (open) => set({ briefingOpen: open }),
  selectPrinciple: (id) => set({ selectedPrinciple: id }),
  startShift: () => {
    const { toggles, agents } = get();
    const gates = gatesFor(toggles, agents);
    if (toggles.validated_deployment && gates.some((g) => !g.ok)) {
      set({
        status: "gating",
        gates,
        logs: [
          {
            id: "gate-block",
            t: Date.now(),
            tick: 0,
            kind: "block",
            principle: "validated_deployment",
            title: "เกตการปล่อยใช้ยังไม่ผ่าน",
            detail: "เปิดหลักที่ขาด หรือปิดหลัก “ปล่อยใช้เมื่อผ่านเกณฑ์” เพื่อฝืนเริ่ม",
            hash: "gate0001",
          } satisfies LogEntry,
          ...get().logs,
        ].slice(0, 80),
      });
      return;
    }
    set({
      status: "running",
      gates,
      agents: agents.map((a) => ({
        ...a,
        status: "running",
        lastAction: "เริ่มกะ",
        health: a.status === "compromised" ? a.health : 100,
      })),
      haltArmed: false,
      ignoreHalt: 0,
    });
  },
  pause: () => set({ status: "paused" }),
  resume: () => {
    if (get().status === "paused") set({ status: "running" });
  },
  halt: () => set({ haltArmed: true }),
  inject: (kind) => {
    const s = get();
    const nextAgents =
      s.status === "idle" || s.status === "gating"
        ? s.agents.map((a) => ({ ...a, status: "running" as const }))
        : s.agents;
    const tick = s.tick + 1;
    const result = stepSim({
      tick,
      now: Date.now(),
      toggles: s.toggles,
      agents: nextAgents,
      logs: s.logs,
      approvals: s.approvals,
      reasons: s.reasons,
      incident: { type: kind },
      haltArmed: s.haltArmed,
      ignoreHalt: s.ignoreHalt,
    });
    set({
      tick,
      agents: result.agents,
      logs: result.logs,
      approvals: result.approvals,
      reasons: result.reasons,
      ignoreHalt: result.ignoreHalt,
      fleetHealth: clamp(s.fleetHealth + result.healthDelta),
      stability: clamp(s.stability + result.stabilityDelta),
      status: result.halted ? "halted" : "running",
      haltArmed: result.halted ? false : s.haltArmed,
    });
  },
  decide: (id, allow) => {
    const item = get().approvals.find((a) => a.id === id);
    if (!item) return;
    const agent = get().agents.find((a) => a.id === item.agentId);
    const entry: LogEntry = {
      id: `dec-${id}`,
      t: Date.now(),
      tick: get().tick,
      agentId: item.agentId,
      principle: "oversight",
      kind: allow ? "ok" : "block",
      title: allow ? "มนุษย์อนุมัติ" : "มนุษย์ปฏิเสธ",
      detail: `${item.action} · ${agent?.name ?? ""}`,
      hash: id.slice(-8),
    };
    const logs = [entry, ...get().logs].slice(0, 80);
    set({
      approvals: get().approvals.filter((a) => a.id !== id),
      logs,
      agents: get().agents.map((a) =>
        a.id === item.agentId
          ? { ...a, lastAction: allow ? `ทำแล้ว: ${item.action}` : `ถูกปฏิเสธ: ${item.action}` }
          : a,
      ),
      fleetHealth: allow ? get().fleetHealth : clamp(get().fleetHealth + 2),
    });
  },
  tickOnce: () => {
    const s = get();
    if (s.status !== "running" && !s.haltArmed) return;
    const tick = s.tick + 1;
    const roll = tick % 11;
    const incident: Incident =
      roll === 0 ? { type: "conflict" } : roll === 7 ? { type: "anomaly" } : { type: "tick" };
    const result = stepSim({
      tick,
      now: Date.now(),
      toggles: s.toggles,
      agents: s.agents,
      logs: s.logs,
      approvals: s.approvals,
      reasons: s.reasons,
      incident,
      haltArmed: s.haltArmed,
      ignoreHalt: s.ignoreHalt,
    });
    set({
      tick,
      agents: result.agents,
      logs: result.logs,
      approvals: result.approvals,
      reasons: result.reasons,
      ignoreHalt: result.ignoreHalt,
      fleetHealth: clamp(s.fleetHealth + result.healthDelta),
      stability: clamp(s.stability + result.stabilityDelta),
      status: result.halted ? "halted" : s.status === "halted" ? "halted" : "running",
      haltArmed: result.halted ? false : s.haltArmed,
    });
  },
  reset: () =>
    set({
      agents: DEFAULT_AGENTS.map((a) => ({ ...a })),
      logs: [],
      approvals: [],
      reasons: [],
      status: "idle",
      tick: 0,
      fleetHealth: 100,
      stability: 92,
      ignoreHalt: 0,
      haltArmed: false,
      gates: gatesFor(get().toggles, DEFAULT_AGENTS),
    }),
}));
