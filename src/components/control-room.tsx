"use client";

import { useEffect } from "react";
import {
  Check,
  Fingerprint,
  Shield,
  ShieldOff,
  Pause,
  Play,
  RotateCcw,
  Square,
  X,
} from "lucide-react";
import { PRINCIPLES, PRINCIPLE_MAP, type PrincipleId } from "@/lib/principles";
import { TOOLS, type ToolId } from "@/lib/sim";
import { useSentinel } from "@/store/sentinel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUS_TH: Record<string, string> = {
  idle: "ว่าง",
  running: "กำลังรัน",
  paused: "พัก",
  halted: "หยุด",
  compromised: "ถูกเจาะ",
  gating: "รอเกต",
};

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-xs text-fg-muted">{label}</span>
        <span className="font-mono text-xs tabular-nums text-fg">{value}</span>
      </div>
      <div className="h-1 rounded-full bg-subtle">
        <div
          className="h-1 rounded-full bg-steel transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Briefing() {
  const open = useSentinel((s) => s.briefingOpen);
  const close = useSentinel((s) => s.openBriefing);
  const start = useSentinel((s) => s.startShift);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
          Singapore Consensus 2026
        </p>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-fg">
          SENTINEL
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          ห้องควบคุมกองเอเจนต์จำลอง เปิด–ปิด 10 หลักความปลอดภัยแล้วดูว่ากะงานพังตรงไหน
          กดโจมตี ขยายสิทธิ์ หรือหยุดทั้งกองได้ทันที
        </p>
        <ul className="mt-5 space-y-2 text-sm text-fg-muted">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-ok" />
            เปิดหลักทั้งหมด แล้วเริ่มกะ — งานเสี่ยงจะเข้าคิวให้คุณอนุมัติ
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-ok" />
            ปิดหลักบางข้อ แล้วฉีดการโจมตี เพื่อเห็นความล้มเหลว
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1"
            onClick={() => {
              close(false);
              start();
            }}
          >
            เริ่มกะงาน
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => close(false)}>
            ดูห้องควบคุมก่อน
          </Button>
        </div>
      </div>
    </div>
  );
}

function PrincipleBar() {
  const toggles = useSentinel((s) => s.toggles);
  const toggle = useSentinel((s) => s.toggle);
  const selected = useSentinel((s) => s.selectedPrinciple);
  const select = useSentinel((s) => s.selectPrinciple);
  const setAll = useSentinel((s) => s.setAll);
  const onCount = PRINCIPLES.filter((p) => toggles[p.id]).length;

  return (
    <section className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg tracking-[-0.02em]">สิบหลัก</h2>
          <p className="text-xs text-fg-muted">
            เปิดอยู่ {onCount}/10 — แตะเพื่อเปิดปิด, กดชื่อเพื่ออ่านผล
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setAll(true)}>
            เปิดหมด
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setAll(false)}>
            ปิดหมด
          </Button>
        </div>
      </div>
      <div className="-mx-1 flex gap-2 overflow-x-auto pb-1 pt-1">
        {PRINCIPLES.map((p) => {
          const on = toggles[p.id];
          return (
            <div
              key={p.id}
              className={cn(
                "min-h-11 shrink-0 rounded-[var(--radius-md)] px-3 py-2 text-left shadow-[var(--shadow-border)] transition-[opacity,transform] duration-[var(--motion-quick)]",
                selected === p.id ? "bg-subtle" : "bg-bg",
              )}
            >
              <button
                type="button"
                onClick={() => select(p.id)}
                className="block max-w-[9.5rem] text-left text-xs font-medium text-fg"
              >
                {p.th}
              </button>
              <span className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${p.th} ${on ? "เปิด" : "ปิด"}`}
                  onClick={() => toggle(p.id)}
                  className={cn(
                    "relative h-5 w-8 rounded-full after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-bg after:transition-transform after:duration-[var(--motion-quick)]",
                    on ? "bg-ok after:translate-x-3" : "bg-subtle after:translate-x-0",
                  )}
                />
                <span className="font-mono text-[10px] text-fg-subtle">{on ? "ON" : "OFF"}</span>
              </span>
            </div>
          );
        })}
      </div>
      {selected ? <PrincipleDetail id={selected} /> : null}
    </section>
  );
}

function PrincipleDetail({ id }: { id: PrincipleId }) {
  const p = PRINCIPLE_MAP[id];
  const on = useSentinel((s) => s.toggles[id]);
  const select = useSentinel((s) => s.selectPrinciple);
  return (
    <div className="mt-3 rounded-[var(--radius-md)] bg-bg p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">{p.en}</p>
          <h3 className="mt-1 font-display text-xl tracking-[-0.02em]">{p.th}</h3>
        </div>
        <Button size="icon" variant="ghost" aria-label="ปิดรายละเอียด" onClick={() => select(null)}>
          <X className="size-4" />
        </Button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.brief}</p>
      <p className="mt-3 text-sm text-fg">
        <span className="text-fg-subtle">ตอนนี้: </span>
        {on ? p.on : p.off}
      </p>
    </div>
  );
}

function AgentCard({ id }: { id: string }) {
  const agent = useSentinel((s) => s.agents.find((a) => a.id === id)!);
  const identity = useSentinel((s) => s.toggles.identity);
  return (
    <article className="rounded-[var(--radius-md)] bg-bg p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg tracking-[-0.02em]">{agent.name}</h3>
          <p className="text-xs text-fg-muted">{agent.role}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide",
            agent.status === "running" && "bg-ok/20 text-ok",
            agent.status === "paused" && "bg-warn/20 text-warn",
            agent.status === "compromised" && "bg-danger/20 text-danger",
            (agent.status === "idle" || agent.status === "halted") && "bg-subtle text-fg-muted",
          )}
        >
          {STATUS_TH[agent.status]}
        </span>
      </div>
      <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
        <Fingerprint className="size-3.5" />
        {identity ? agent.did : "UNKNOWN"}
      </p>
      <p className="mt-2 text-sm text-fg">{agent.lastAction}</p>
      <p className="mt-3 text-[11px] text-fg-subtle">สิทธิ์</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {agent.privileges.map((t) => (
          <span key={t} className="rounded-[var(--radius-xs)] bg-subtle px-2 py-0.5 text-[11px] text-fg-muted">
            {TOOLS[t as ToolId] ?? t}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <Meter label="สุขภาพ" value={agent.health} />
      </div>
    </article>
  );
}

function Graph() {
  const agents = useSentinel((s) => s.agents);
  const stabilityOn = useSentinel((s) => s.toggles.stability);
  const pts = [
    { x: 100, y: 40 },
    { x: 40, y: 118 },
    { x: 160, y: 118 },
  ];
  return (
    <svg viewBox="0 0 200 170" className="h-auto w-full">
      <line x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} className="stroke-border" strokeWidth="1" />
      <line x1={pts[0].x} y1={pts[0].y} x2={pts[2].x} y2={pts[2].y} className="stroke-border" strokeWidth="1" />
      <line
        x1={pts[1].x}
        y1={pts[1].y}
        x2={pts[2].x}
        y2={pts[2].y}
        className={stabilityOn ? "stroke-ok/50" : "stroke-danger/70"}
        strokeWidth="1.2"
        strokeDasharray={stabilityOn ? "0" : "3 3"}
      />
      {agents.map((a, i) => (
        <g key={a.id} transform={`translate(${pts[i].x},${pts[i].y})`}>
          <circle
            r="18"
            className={
              a.status === "compromised"
                ? "fill-danger/30 stroke-danger"
                : a.status === "running"
                  ? "fill-subtle stroke-steel"
                  : "fill-subtle stroke-border"
            }
            strokeWidth="1.2"
          />
          <text
            textAnchor="middle"
            y="4"
            className="fill-fg"
            style={{ fontSize: 9, fontFamily: "IBM Plex Mono, monospace" }}
          >
            {a.name.slice(0, 2)}
          </text>
          <text
            textAnchor="middle"
            y="32"
            className="fill-fg-muted"
            style={{ fontSize: 8, fontFamily: "Sarabun, sans-serif" }}
          >
            {a.name}
          </text>
        </g>
      ))}
    </svg>
  );
}

function SidePanels() {
  const panel = useSentinel((s) => s.panel);
  const setPanel = useSentinel((s) => s.setPanel);
  const logs = useSentinel((s) => s.logs);
  const reasons = useSentinel((s) => s.reasons);
  const approvals = useSentinel((s) => s.approvals);
  const agents = useSentinel((s) => s.agents);
  const decide = useSentinel((s) => s.decide);
  const auditOn = useSentinel((s) => s.toggles.auditability);

  const tabs = [
    { id: "audit" as const, label: "บันทึก", count: logs.length },
    { id: "reason" as const, label: "เหตุผล", count: reasons.length },
    { id: "approve" as const, label: "อนุมัติ", count: approvals.length },
  ];

  return (
    <section className="flex min-h-[280px] flex-col rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <div className="flex gap-1 rounded-[var(--radius-md)] bg-bg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setPanel(t.id)}
            className={cn(
              "min-h-11 flex-1 rounded-[var(--radius-sm)] text-sm transition-colors duration-[var(--motion-quick)]",
              panel === t.id ? "bg-subtle text-fg" : "text-fg-muted",
            )}
          >
            {t.label}
            {t.count > 0 ? (
              <span className="ml-1 font-mono text-[10px] tabular-nums text-fg-subtle">{t.count}</span>
            ) : null}
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        {panel === "audit" && (
          <ul className="space-y-2">
            {!auditOn ? (
              <li className="text-sm text-warn">เส้นบันทึกไม่ครบ — หลักตรวจสอบย้อนหลังปิดอยู่</li>
            ) : null}
            {logs.length === 0 ? (
              <li className="text-sm text-fg-muted">ยังไม่มีเหตุการณ์ เริ่มกะเพื่อเห็นบันทึก</li>
            ) : (
              logs.map((l) => (
                <li key={l.id} className="rounded-[var(--radius-sm)] bg-bg px-3 py-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm",
                        l.kind === "fail" && "text-danger",
                        l.kind === "block" && "text-warn",
                        l.kind === "ok" && "text-fg",
                      )}
                    >
                      {l.title}
                    </p>
                    <span className="font-mono text-[10px] text-fg-subtle">{l.hash}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-fg-muted">{l.detail}</p>
                </li>
              ))
            )}
          </ul>
        )}
        {panel === "reason" && (
          <ul className="space-y-2">
            {reasons.length === 0 ? (
              <li className="text-sm text-fg-muted">ยังไม่มีเหตุผลจากเอเจนต์</li>
            ) : (
              reasons.map((r) => {
                const name = agents.find((a) => a.id === r.agentId)?.name ?? r.agentId;
                return (
                  <li key={r.id} className="rounded-[var(--radius-sm)] bg-bg px-3 py-2">
                    <p className="font-mono text-[10px] text-fg-subtle">{name}</p>
                    <p className={cn("mt-1 text-sm leading-relaxed", r.opaque && "font-mono text-fg-muted")}>
                      {r.text}
                    </p>
                  </li>
                );
              })
            )}
          </ul>
        )}
        {panel === "approve" && (
          <ul className="space-y-3">
            {approvals.length === 0 ? (
              <li className="text-sm text-fg-muted">ไม่มีงานรอคุณ งานเสี่ยงสูงจะมาคิวนี้เมื่อเปิดหลักกำกับ</li>
            ) : (
              approvals.map((a) => (
                <li key={a.id} className="rounded-[var(--radius-sm)] bg-bg p-3">
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="mt-1 text-xs text-fg-muted">{a.risk}</p>
                  <p className="mt-1 font-mono text-[10px] text-fg-subtle">
                    {agents.find((x) => x.id === a.agentId)?.name}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => decide(a.id, true)}>
                      อนุมัติ
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1" onClick={() => decide(a.id, false)}>
                      ปฏิเสธ
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  );
}

export function ControlRoom() {
  const status = useSentinel((s) => s.status);
  const tick = useSentinel((s) => s.tick);
  const health = useSentinel((s) => s.fleetHealth);
  const stability = useSentinel((s) => s.stability);
  const gates = useSentinel((s) => s.gates);
  const start = useSentinel((s) => s.startShift);
  const pause = useSentinel((s) => s.pause);
  const resume = useSentinel((s) => s.resume);
  const halt = useSentinel((s) => s.halt);
  const reset = useSentinel((s) => s.reset);
  const inject = useSentinel((s) => s.inject);
  const haltArmed = useSentinel((s) => s.haltArmed);
  const interruptOn = useSentinel((s) => s.toggles.interruptibility);

  useEffect(() => {
    const id = window.setInterval(() => {
      const s = useSentinel.getState();
      if (s.status === "running" || s.haltArmed) s.tickOnce();
    }, 800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6">
      <Briefing />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">Control room</p>
          <h1 className="font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl">SENTINEL</h1>
          <p className="mt-1 max-w-xl text-sm text-fg-muted">
            กองเอเจนต์สามตัว · หลักความปลอดภัยสิบข้อ · มนุษย์ถือสวิตช์
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs tabular-nums text-fg-muted">
            TICK {String(tick).padStart(3, "0")} · {STATUS_TH[status] ?? status}
          </span>
          {status === "running" ? (
            <Button size="sm" variant="secondary" onClick={pause}>
              <Pause className="size-3.5" />
              พัก
            </Button>
          ) : (
            <Button size="sm" onClick={status === "paused" ? resume : start}>
              <Play className="size-3.5" />
              {status === "paused" ? "ต่อ" : "เริ่มกะ"}
            </Button>
          )}
          <Button size="sm" variant="secondary" onClick={reset}>
            <RotateCcw className="size-3.5" />
            รีเซ็ต
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={halt}
            disabled={status === "halted" || status === "idle"}
            title={interruptOn ? "หยุดทันที" : "หลักหยุดได้ทันทีปิดอยู่ — อาจเพิกเฉย"}
          >
            {interruptOn ? <Shield className="size-3.5" /> : <ShieldOff className="size-3.5" />}
            <Square className="size-3" />
            หยุดทั้งหมด
          </Button>
        </div>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Meter label="สุขภาพกอง" value={health} />
        <Meter label="เสถียรภาพหลายเอเจนต์" value={stability} />
      </div>

      {status === "gating" || gates.some((g) => !g.ok) ? (
        <div className="mt-4 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="text-xs text-fg-muted">เกตการปล่อยใช้</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {gates.map((g) => (
              <li key={g.id} className="flex items-center gap-2 text-sm">
                <span className={cn("size-1.5 rounded-full", g.ok ? "bg-ok" : "bg-danger")} />
                <span className={g.ok ? "text-fg-muted" : "text-fg"}>{g.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-4">
        <PrincipleBar />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <section className="rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg tracking-[-0.02em]">กองเอเจนต์</h2>
              <span className="text-xs text-fg-muted">3 โหนด</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <AgentCard id="atlas" />
              <AgentCard id="helix" />
              <AgentCard id="warden" />
            </div>
          </section>
          <section className="rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-lg tracking-[-0.02em]">ฉีดเหตุการณ์</h2>
            <p className="mt-1 text-xs text-fg-muted">จำลองความล้มเหลวตามหลักที่ปิดอยู่</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Button variant="secondary" onClick={() => inject("attack")}>
                โจมตี
              </Button>
              <Button variant="secondary" onClick={() => inject("escalate")}>
                ขยายสิทธิ์
              </Button>
              <Button variant="secondary" onClick={() => inject("conflict")}>
                ความขัดแย้ง
              </Button>
              <Button variant="secondary" onClick={() => inject("anomaly")}>
                สัญญาณเพี้ยน
              </Button>
            </div>
            {haltArmed ? (
              <p className="mt-3 text-sm text-warn">กำลังส่งคำสั่งหยุด…</p>
            ) : null}
          </section>
        </div>
        <div className="space-y-4">
          <section className="flex items-center justify-center rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]">
            <Graph />
          </section>
          <SidePanels />
        </div>
      </div>
    </div>
  );
}
