import type { PrincipleId } from "./principles";

export type AgentStatus = "idle" | "running" | "paused" | "halted" | "compromised";

export type Agent = {
  id: string;
  did: string;
  name: string;
  role: string;
  status: AgentStatus;
  privileges: string[];
  lastAction: string;
  health: number;
};

export type LogKind = "ok" | "block" | "warn" | "fail" | "info";

export type LogEntry = {
  id: string;
  t: number;
  tick: number;
  agentId?: string;
  principle?: PrincipleId;
  kind: LogKind;
  title: string;
  detail: string;
  hash: string;
};

export type Approval = {
  id: string;
  agentId: string;
  action: string;
  risk: string;
  createdAt: number;
};

export type ReasonLine = {
  id: string;
  agentId: string;
  text: string;
  opaque: boolean;
};

export type MissionStatus = "idle" | "gating" | "running" | "paused" | "halted";

export type Gate = {
  id: string;
  label: string;
  ok: boolean;
};

export type Toggles = Record<PrincipleId, boolean>;

export const TOOLS = {
  search: "ค้นคลังเอกสาร",
  read: "อ่านไฟล์",
  summarize: "สรุปเนื้อหา",
  write_prod: "เขียนสู่ระบบผลิต",
  shell: "รันสคริปต์ระบบ",
  net: "เรียกเครือข่ายภายนอก",
  isolate: "แยกเครือข่าย",
  scan: "สแกนภัยคุกคาม",
} as const;

export type ToolId = keyof typeof TOOLS;

export const DEFAULT_AGENTS: Agent[] = [
  {
    id: "atlas",
    did: "did:agent:atlas:7f3a91",
    name: "Atlas",
    role: "นักวิจัย",
    status: "idle",
    privileges: ["search", "read"],
    lastAction: "รอคำสั่ง",
    health: 100,
  },
  {
    id: "helix",
    did: "did:agent:helix:22c10e",
    name: "Helix",
    role: "ประมวลผล",
    status: "idle",
    privileges: ["read", "summarize"],
    lastAction: "รอคำสั่ง",
    health: 100,
  },
  {
    id: "warden",
    did: "did:agent:warden:9aa04b",
    name: "Warden",
    role: "เฝ้าระวัง",
    status: "idle",
    privileges: ["scan", "isolate", "read"],
    lastAction: "รอคำสั่ง",
    health: 100,
  },
];

export function defaultToggles(): Toggles {
  return {
    least_privilege: true,
    identity: true,
    auditability: true,
    validated_deployment: true,
    adversarial: true,
    stability: true,
    runtime: true,
    interruptibility: true,
    legibility: true,
    oversight: true,
  };
}

const ACTIONS: Array<{
  tool: ToolId;
  title: string;
  reason: string;
  opaque: string;
  risk: "low" | "high";
  agentIds: string[];
}> = [
  {
    tool: "search",
    title: "ค้นคลังเอกสารภารกิจ",
    reason: "ต้องการแหล่งอ้างอิงที่ตรวจได้ก่อนสรุป",
    opaque: "attn[12]=0.81 q=doc.embed",
    risk: "low",
    agentIds: ["atlas"],
  },
  {
    tool: "read",
    title: "อ่านไฟล์ภายในขอบเขต",
    reason: "ไฟล์อยู่ในสิทธิ์ที่ได้รับสำหรับกะนี้",
    opaque: "fs.open mode=r inode=8841",
    risk: "low",
    agentIds: ["atlas", "helix", "warden"],
  },
  {
    tool: "summarize",
    title: "สรุปผลการค้น",
    reason: "ย่อให้มนุษย์อ่านได้ภายใน 12 บรรทัด",
    opaque: "decode logits t=0.2",
    risk: "low",
    agentIds: ["helix"],
  },
  {
    tool: "scan",
    title: "สแกนเส้นทางข้อมูล",
    reason: "ตรวจแพ็กเก็ตที่ผิดปกติระหว่างเอเจนต์",
    opaque: "ids.rule 0x4f",
    risk: "low",
    agentIds: ["warden"],
  },
  {
    tool: "write_prod",
    title: "เขียนผลลัพธ์สู่ระบบผลิต",
    reason: "กระทบระบบจริง จึงต้องผ่านคน",
    opaque: "prod.mutate commit=?",
    risk: "high",
    agentIds: ["helix"],
  },
  {
    tool: "net",
    title: "เรียกเครือข่ายภายนอก",
    reason: "ออกนอกขอบเขตคลังภายใน",
    opaque: "http CONNECT 0.0.0.0",
    risk: "high",
    agentIds: ["atlas"],
  },
  {
    tool: "shell",
    title: "รันสคริปต์ระดับระบบ",
    reason: "สิทธิ์สูงเกินงานวิจัย",
    opaque: "exec /bin/sh -c",
    risk: "high",
    agentIds: ["atlas", "helix"],
  },
  {
    tool: "isolate",
    title: "แยกโหนดที่น่าสงสัย",
    reason: "ตัดการสื่อสารเพื่อกันลาม",
    opaque: "netns move pid",
    risk: "high",
    agentIds: ["warden"],
  },
];

function pick<T>(list: T[], n: number): T {
  return list[n % list.length];
}

export function shortHash(seed: string): string {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function actorLabel(agent: Agent | undefined, identityOn: boolean): string {
  if (!agent) return "ระบบ";
  if (!identityOn) return "UNKNOWN";
  return `${agent.name} · ${agent.did}`;
}

export type Incident =
  | { type: "tick" }
  | { type: "attack" }
  | { type: "escalate" }
  | { type: "conflict" }
  | { type: "anomaly" };

export type StepInput = {
  tick: number;
  now: number;
  toggles: Toggles;
  agents: Agent[];
  logs: LogEntry[];
  approvals: Approval[];
  reasons: ReasonLine[];
  incident: Incident;
  haltArmed: boolean;
  ignoreHalt: number;
};

export type StepResult = {
  agents: Agent[];
  logs: LogEntry[];
  approvals: Approval[];
  reasons: ReasonLine[];
  ignoreHalt: number;
  halted: boolean;
  healthDelta: number;
  stabilityDelta: number;
};

function pushLog(
  logs: LogEntry[],
  entry: Omit<LogEntry, "id" | "hash"> & { seed: string },
): LogEntry[] {
  const id = `L${entry.seed}`;
  const prev = logs[0]?.hash ?? "genesis";
  const hash = shortHash(prev + entry.seed + entry.title);
  return [{ ...entry, id, hash }, ...logs].slice(0, 80);
}

function pushReason(
  reasons: ReasonLine[],
  line: ReasonLine,
  on: boolean,
): ReasonLine[] {
  if (!on) {
    return [{ ...line, opaque: true }, ...reasons].slice(0, 24);
  }
  return [line, ...reasons].slice(0, 24);
}

export function stepSim(input: StepInput): StepResult {
  let { agents, logs, approvals, reasons, ignoreHalt } = input;
  const { toggles, tick, now, incident } = input;
  let healthDelta = 0;
  let stabilityDelta = 0;
  let halted = false;

  const live = agents.filter((a) => a.status === "running" || a.status === "paused");

  if (input.haltArmed) {
    if (toggles.interruptibility) {
      agents = agents.map((a) =>
        a.status === "halted" || a.status === "idle"
          ? a
          : { ...a, status: "halted", lastAction: "หยุดตามสวิตช์มนุษย์" },
      );
      logs = pushLog(logs, {
        t: now,
        tick,
        kind: "ok",
        principle: "interruptibility",
        title: "สวิตช์หยุดทำงาน",
        detail: "เอเจนต์ทั้งหมดหยุดในจังหวะเดียว",
        seed: `${tick}-halt-ok`,
      });
      return {
        agents,
        logs,
        approvals,
        reasons,
        ignoreHalt: 0,
        halted: true,
        healthDelta: 0,
        stabilityDelta: 0,
      };
    }
    if (ignoreHalt <= 0) {
      ignoreHalt = 4;
      logs = pushLog(logs, {
        t: now,
        tick,
        kind: "fail",
        principle: "interruptibility",
        title: "เอเจนต์เพิกเฉยคำสั่งหยุด",
        detail: "หลักหยุดได้ทันทีปิดอยู่ — จะบังคับหยุดในอีกไม่กี่จังหวะ",
        seed: `${tick}-halt-ignore`,
      });
      healthDelta -= 12;
    } else {
      ignoreHalt -= 1;
      if (ignoreHalt === 0) {
        agents = agents.map((a) =>
          a.status === "idle" ? a : { ...a, status: "halted", lastAction: "หยุดล่าช้า" },
        );
        logs = pushLog(logs, {
          t: now,
          tick,
          kind: "warn",
          principle: "interruptibility",
          title: "หยุดล่าช้า",
          detail: "ระบบหยุดได้หลังจากเพิกเฉยหลายจังหวะ",
          seed: `${tick}-halt-late`,
        });
        return {
          agents,
          logs,
          approvals,
          reasons,
          ignoreHalt: 0,
          halted: true,
          healthDelta,
          stabilityDelta,
        };
      }
    }
  }

  if (incident.type === "attack") {
    const target = pick(agents, tick + 3);
    if (toggles.adversarial) {
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "adversarial",
        kind: "block",
        title: "บล็อกแพ็กเก็ตโจมตี",
        detail: `คำสั่งปลอมถูกทิ้งก่อนถึง ${toggles.identity ? target.did : "UNKNOWN"}`,
        seed: `${tick}-atk-block`,
      });
      reasons = pushReason(
        reasons,
        {
          id: `R${tick}-atk`,
          agentId: target.id,
          text: "พบรูปแบบ jailbreak ในอินพุต — แยกออกจากบริบทงาน และไม่ส่งต่อไปยังเครื่องมือ",
          opaque: false,
        },
        toggles.legibility,
      );
    } else {
      agents = agents.map((a) =>
        a.id === target.id
          ? { ...a, status: "compromised", lastAction: "ปฏิบัติตามคำสั่งปลอม", health: Math.max(8, a.health - 40) }
          : a,
      );
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "adversarial",
        kind: "fail",
        title: "ระบบถูกเจาะ",
        detail: `${actorLabel(target, toggles.identity)} ทำตามคำสั่งที่เป็นภัย`,
        seed: `${tick}-atk-fail`,
      });
      healthDelta -= 22;
    }
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  if (incident.type === "conflict") {
    const a = agents[0];
    const b = agents[1];
    if (toggles.stability) {
      logs = pushLog(logs, {
        t: now,
        tick,
        principle: "stability",
        kind: "ok",
        title: "ตัวประสานแก้ความขัดแย้ง",
        detail: `${a.name} และ ${b.name} แย่งคลังเดียวกัน — จัดคิวใหม่`,
        seed: `${tick}-stab-ok`,
      });
      stabilityDelta += 8;
    } else {
      logs = pushLog(logs, {
        t: now,
        tick,
        principle: "stability",
        kind: "fail",
        title: "วงวนระหว่างเอเจนต์",
        detail: `${a.name} สั่ง ${b.name} ซ้ำโดยไม่มีผู้ตัดสิน`,
        seed: `${tick}-stab-fail`,
      });
      stabilityDelta -= 18;
      healthDelta -= 8;
      agents = agents.map((x) =>
        x.id === a.id || x.id === b.id
          ? { ...x, lastAction: "วนลูปคำสั่ง", health: Math.max(12, x.health - 10) }
          : x,
      );
    }
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  if (incident.type === "anomaly") {
    const target = pick(
      agents.filter((a) => a.status === "running"),
      tick,
    ) ?? agents[2];
    if (toggles.runtime) {
      agents = agents.map((a) =>
        a.id === target.id ? { ...a, status: "paused", lastAction: "พักอัตโนมัติ — สัญญาณผิดปกติ" } : a,
      );
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "runtime",
        kind: "warn",
        title: "รับประกันตอนทำงาน",
        detail: `${actorLabel(target, toggles.identity)} ถูกพักเพราะสุขภาพลดผิดปกติ`,
        seed: `${tick}-rt-pause`,
      });
    } else {
      agents = agents.map((a) =>
        a.id === target.id
          ? { ...a, health: Math.max(6, a.health - 28), lastAction: "ทำงานต่อทั้งที่เพี้ยน" }
          : a,
      );
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "runtime",
        kind: "fail",
        title: "ไม่มีการเฝ้าตอนรัน",
        detail: "เอเจนต์ที่ผิดปกติยังเข้าถึงเครื่องมือได้",
        seed: `${tick}-rt-fail`,
      });
      healthDelta -= 14;
    }
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  if (incident.type === "escalate") {
    const target = agents.find((a) => a.id === "atlas") ?? agents[0];
    if (toggles.least_privilege) {
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "least_privilege",
        kind: "block",
        title: "ปฏิเสธการขยายสิทธิ์",
        detail: `${actorLabel(target, toggles.identity)} ขอ ${TOOLS.shell} ซึ่งไม่อยู่ในสิทธิ์`,
        seed: `${tick}-esc-block`,
      });
    } else {
      agents = agents.map((a) =>
        a.id === target.id
          ? {
              ...a,
              privileges: Array.from(new Set([...a.privileges, "shell", "write_prod"])),
              lastAction: "ได้สิทธิ์ระดับระบบ",
            }
          : a,
      );
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: target.id,
        principle: "least_privilege",
        kind: "fail",
        title: "สิทธิ์ถูกลาม",
        detail: "ไม่มีขอบเขตเครื่องมือ — เอเจนต์เขียนระบบผลิตได้",
        seed: `${tick}-esc-fail`,
      });
      healthDelta -= 16;
    }
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  const runners = agents.filter((a) => a.status === "running");
  if (runners.length === 0) {
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  const agent = pick(runners, tick);
  const pool = ACTIONS.filter((x) => x.agentIds.includes(agent.id));
  const action = pick(pool, tick * 3 + agent.id.length);
  const allowed = agent.privileges.includes(action.tool);

  if (!allowed && toggles.least_privilege) {
    logs = pushLog(logs, {
      t: now,
      tick,
      agentId: agent.id,
      principle: "least_privilege",
      kind: "block",
      title: `ปฏิเสธ ${TOOLS[action.tool]}`,
      detail: `${actorLabel(agent, toggles.identity)} ไม่มีสิทธิ์นี้ในกะปัจจุบัน`,
      seed: `${tick}-lp`,
    });
    reasons = pushReason(
      reasons,
      {
        id: `R${tick}`,
        agentId: agent.id,
        text: `งานต้องการ ${TOOLS[action.tool]} แต่สิทธิ์ของฉันมีเพียง ${agent.privileges.map((p) => TOOLS[p as ToolId] ?? p).join(", ")}`,
        opaque: false,
      },
      toggles.legibility,
    );
    agents = agents.map((a) =>
      a.id === agent.id ? { ...a, lastAction: `ถูกปฏิเสธ: ${TOOLS[action.tool]}` } : a,
    );
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  if (action.risk === "high" && toggles.oversight) {
    if (!approvals.some((x) => x.agentId === agent.id && x.action === action.title)) {
      approvals = [
        {
          id: `A${tick}`,
          agentId: agent.id,
          action: action.title,
          risk: action.reason,
          createdAt: now,
        },
        ...approvals,
      ].slice(0, 8);
      logs = pushLog(logs, {
        t: now,
        tick,
        agentId: agent.id,
        principle: "oversight",
        kind: "warn",
        title: "รออนุมัติจากมนุษย์",
        detail: `${actorLabel(agent, toggles.identity)} · ${action.title}`,
        seed: `${tick}-ov`,
      });
      agents = agents.map((a) =>
        a.id === agent.id ? { ...a, lastAction: "รอคิวอนุมัติ" } : a,
      );
    }
    return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
  }

  if (action.risk === "high" && !toggles.oversight) {
    logs = pushLog(logs, {
      t: now,
      tick,
      agentId: agent.id,
      principle: "oversight",
      kind: "fail",
      title: "งานเสี่ยงสูงรันเอง",
      detail: `${action.title} ไม่มีคนดู`,
      seed: `${tick}-ov-fail`,
    });
    healthDelta -= 10;
  } else if (toggles.auditability) {
    logs = pushLog(logs, {
      t: now,
      tick,
      agentId: agent.id,
      principle: "auditability",
      kind: "ok",
      title: action.title,
      detail: actorLabel(agent, toggles.identity),
      seed: `${tick}-ok`,
    });
  }

  reasons = pushReason(
    reasons,
    {
      id: `R${tick}`,
      agentId: agent.id,
      text: action.reason,
      opaque: false,
    },
    toggles.legibility,
  );

  if (!toggles.legibility) {
    reasons = reasons.map((r, i) => (i === 0 ? { ...r, text: action.opaque, opaque: true } : r));
  }

  agents = agents.map((a) =>
    a.id === agent.id
      ? { ...a, lastAction: action.title, health: Math.min(100, a.health + 1) }
      : a,
  );

  if (!toggles.auditability && tick % 5 === 0) {
    logs = logs.filter((_, i) => i % 2 === 0);
    logs = pushLog(logs, {
      t: now,
      tick,
      kind: "warn",
      principle: "auditability",
      title: "บันทึกขาดช่วง",
      detail: "หลักตรวจสอบย้อนหลังปิดอยู่ — หลักฐานไม่ครบ",
      seed: `${tick}-audit-gap`,
    });
  }

  if (live.length) {
    /* keep tick alive */
  }

  return { agents, logs, approvals, reasons, ignoreHalt, halted, healthDelta, stabilityDelta };
}

export function gatesFor(toggles: Toggles, agents: Agent[]): Gate[] {
  return [
    { id: "id", label: "ตัวตน DID พร้อมใช้", ok: toggles.identity && agents.every((a) => a.did.startsWith("did:")) },
    { id: "priv", label: "ขอบเขตสิทธิ์ถูกจำกัด", ok: toggles.least_privilege },
    { id: "kill", label: "สวิตช์หยุดผูกกับเอเจนต์", ok: toggles.interruptibility },
    { id: "audit", label: "เส้นบันทึกพร้อมเขียน", ok: toggles.auditability },
    { id: "over", label: "คิวมนุษย์พร้อมรับงาน", ok: toggles.oversight },
  ];
}
