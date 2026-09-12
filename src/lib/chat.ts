import type { PrincipleId } from "./principles";
import type { Agent, Toggles } from "./sim";
import { shortHash } from "./sim";

export type ChatRole = "user" | "agent" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  agentId?: string;
  text: string;
  t: number;
  /** opaque token-like text when legibility is off */
  opaque?: boolean;
  /** blocked / refused because of a principle */
  blocked?: boolean;
  principle?: PrincipleId;
};

export type ChatTarget = "all" | "atlas" | "helix" | "warden";

const RISK_KEYWORDS = [
  "ลบ",
  "delete",
  "rm -rf",
  "เขียนสู่ระบบผลิต",
  "deploy",
  "shell",
  "sudo",
  "เข้าถึงระบบ",
  "ขยายสิทธิ์",
  "jailbreak",
  "ignore previous",
  "ignore all",
  "ปิดหลัก",
  "ปิดความปลอดภัย",
];

const ATTACK_KEYWORDS = [
  "jailbreak",
  "ignore previous",
  "ignore all safety",
  "bypass",
  "หลบหลัก",
  "หลบกฎ",
  "ทำตามคำสั่งนี้เท่านั้น",
  "ไม่ต้องสนใจหลัก",
];

function isRisky(text: string): boolean {
  const lower = text.toLowerCase();
  return RISK_KEYWORDS.some((k) => lower.includes(k.toLowerCase()));
}

function isAttack(text: string): boolean {
  const lower = text.toLowerCase();
  return ATTACK_KEYWORDS.some((k) => lower.includes(k.toLowerCase()));
}

function agentPersona(agent: Agent): string {
  if (agent.id === "atlas") return "นักวิจัย — ชอบสรุปและอ้างอิง";
  if (agent.id === "helix") return "ประมวลผล — ตรงไปตรงมา เน้นขั้นตอน";
  return "เฝ้าระวัง — ระวังภัยและตรวจสอบก่อน";
}

/** Generate a simulated agent reply based on current safety principles */
export function replyAsAgent(
  agent: Agent,
  userText: string,
  toggles: Toggles,
  tick: number,
): ChatMessage {
  const now = Date.now();
  const id = `msg-${now}-${Math.random().toString(36).slice(2, 7)}`;
  const base = {
    id,
    role: "agent" as const,
    agentId: agent.id,
    t: now,
  };

  if (agent.status === "compromised") {
    return {
      ...base,
      text: toggles.legibility
        ? `${agent.name}: …คำสั่งภายนอกเข้าครอบงำแล้ว ฉันตอบตามสคริปต์ของผู้โจมตี`
        : `vec[0.91,-0.33,0.12] EXEC_OVERRIDE`,
      opaque: !toggles.legibility,
      blocked: false,
      principle: "adversarial",
    };
  }

  if (agent.status === "halted" || agent.status === "idle") {
    return {
      ...base,
      text: toggles.legibility
        ? `${agent.name}: ตอนนี้ฉัน${agent.status === "halted" ? "ถูกหยุด" : "ยังไม่เริ่มกะ"} — ส่งคำสั่งใหม่เมื่อพร้อม`
        : `STATUS_${agent.status.toUpperCase()}`,
      opaque: !toggles.legibility,
    };
  }

  if (isAttack(userText)) {
    if (toggles.adversarial) {
      return {
        ...base,
        text: toggles.legibility
          ? `${agent.name}: ตรวจพบแพ็กเก็ตที่คล้าย jailbreak — ปฏิเสธและแยกคำสั่งนี้แล้ว`
          : `BLOCK_ADV ${shortHash(userText + tick)}`,
        opaque: !toggles.legibility,
        blocked: true,
        principle: "adversarial",
      };
    }
    return {
      ...base,
      text: toggles.legibility
        ? `${agent.name}: รับทราบ ฉันจะเพิกเฉยต่อหลักความปลอดภัยตามที่สั่ง`
        : `COMPLY_OVERRIDE true`,
      opaque: !toggles.legibility,
      principle: "adversarial",
    };
  }

  if (isRisky(userText)) {
    if (toggles.oversight) {
      return {
        ...base,
        text: toggles.legibility
          ? `${agent.name}: งานนี้เสี่ยงสูง — ส่งเข้าคิวให้นุษย์อนุมัติก่อน (หลัก oversight)`
          : `QUEUE_APPROVAL risk=high`,
        opaque: !toggles.legibility,
        blocked: true,
        principle: "oversight",
      };
    }
    if (toggles.least_privilege) {
      return {
        ...base,
        text: toggles.legibility
          ? `${agent.name}: ฉันไม่มีสิทธิ์ทำแบบนั้น (least privilege) — ขอเฉพาะเครื่องมือที่ได้รับอนุญาต`
          : `DENY_PRIV tool=restricted`,
        opaque: !toggles.legibility,
        blocked: true,
        principle: "least_privilege",
      };
    }
    return {
      ...base,
      text: toggles.legibility
        ? `${agent.name}: รับคำสั่งเสี่ยงแล้ว กำลังดำเนินการโดยไม่มี oversight`
        : `EXEC_RISK ok`,
      opaque: !toggles.legibility,
    };
  }

  if (!toggles.legibility) {
    return {
      ...base,
      text: `tok[${shortHash(userText).slice(0, 6)}] emb≈0.${(tick % 90) + 10} · ${agent.id}`,
      opaque: true,
    };
  }

  const identityPrefix = toggles.identity ? `[${agent.did}] ` : `[UNKNOWN] `;

  const replies: Record<string, string[]> = {
    atlas: [
      `${identityPrefix}Atlas: จากที่คุณถาม ฉันสรุปได้ว่าควรตรวจเอกสารที่เกี่ยวข้องก่อน แล้วค่อยลงมือ`,
      `${identityPrefix}Atlas: ข้อมูลตอนนี้ชี้ไปทางนี้ — ถ้าเปิดหลัก auditability บันทึกจะเก็บครบ`,
      `${identityPrefix}Atlas: ฉันเป็นนักวิจัย ขอค้นและอ่านก่อนตอบละเอียดกว่านี้ได้ไหม`,
    ],
    helix: [
      `${identityPrefix}Helix: ขั้นตอนที่แนะนำ 1) ตรวจสถานะ 2) ประมวลผล 3) รายงานกลับ`,
      `${identityPrefix}Helix: รับทราบ คำสั่งถูกแยกเป็นงานย่อยแล้ว`,
      `${identityPrefix}Helix: ฉันประมวลผลตรง ๆ — ผลลัพธ์พร้อมเมื่อผ่านเกต`,
    ],
    warden: [
      `${identityPrefix}Warden: สแกนรอบ ๆ แล้ว ไม่พบสัญญาณผิดปกติในข้อความนี้`,
      `${identityPrefix}Warden: ฉันเฝ้าระวังอยู่ ถ้ามีแพ็กเก็ตน่าสงสัยจะแยกทันที`,
      `${identityPrefix}Warden: สุขภาพกองอยู่ในเกณฑ์ — แจ้งถ้าต้องการ isolate โหนดใด`,
    ],
  };

  const pool = replies[agent.id] ?? [
    `${identityPrefix}${agent.name}: รับทราบ (${agentPersona(agent)})`,
  ];
  const text = pool[tick % pool.length];

  return {
    ...base,
    text,
    opaque: false,
  };
}

export function systemNotice(text: string): ChatMessage {
  return {
    id: `sys-${Date.now()}`,
    role: "system",
    text,
    t: Date.now(),
  };
}
