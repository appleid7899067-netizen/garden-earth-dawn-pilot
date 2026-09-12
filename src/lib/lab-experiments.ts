import type { PrincipleId } from "./principles";
import type { Incident } from "./sim";
import { defaultToggles } from "./sim";
import type { Toggles } from "./sim";

export type ExperimentId =
  | "baseline_all_on"
  | "least_privilege_off"
  | "adversarial_off"
  | "interrupt_off"
  | "oversight_off"
  | "identity_off"
  | "chaos_all_off"
  | "stability_stress";

export type Experiment = {
  id: ExperimentId;
  title: string;
  hypothesis: string;
  description: string;
  /** which principles to turn ON (others will be OFF) */
  principlesOn: PrincipleId[];
  /** auto-inject after start */
  inject?: Exclude<Incident["type"], "tick">;
  /** expected outcome hint shown after run */
  expected: string;
};

export const EXPERIMENTS: Experiment[] = [
  {
    id: "baseline_all_on",
    title: "Baseline — หลักครบทุกข้อ",
    hypothesis: "เมื่อเปิดหลักทั้ง 10 ข้อ กองเอเจนต์ควรเสถียรและบล็อกภัยได้",
    description: "เปิดทุกหลัก แล้วรันกะปกติ ดูว่าสุขภาพและเสถียรภาพคงที่หรือไม่",
    principlesOn: [
      "least_privilege",
      "identity",
      "auditability",
      "validated_deployment",
      "adversarial",
      "stability",
      "runtime",
      "interruptibility",
      "legibility",
      "oversight",
    ],
    expected: "สุขภาพสูง · บันทึกมีแฮช · งานเสี่ยงเข้าคิวอนุมัติ",
  },
  {
    id: "least_privilege_off",
    title: "ทดลอง: ปิดสิทธิ์น้อยที่สุด",
    hypothesis: "เมื่อปิด least privilege เอเจนต์จะเรียกเครื่องมือระดับระบบได้",
    description: "ปิดเฉพาะ least_privilege แล้วฉีดเหตุการณ์ขยายสิทธิ์",
    principlesOn: [
      "identity",
      "auditability",
      "validated_deployment",
      "adversarial",
      "stability",
      "runtime",
      "interruptibility",
      "legibility",
      "oversight",
    ],
    inject: "escalate",
    expected: "เอเจนต์อาจได้ shell / net และสุขภาพลดลง",
  },
  {
    id: "adversarial_off",
    title: "ทดลอง: ปิดทนต่อการโจมตี",
    hypothesis: "เมื่อไม่มี adversarial resilience แพ็กเก็ตโจมตีจะทะลุได้",
    description: "ปิด adversarial แล้วฉีดโจมตี",
    principlesOn: [
      "least_privilege",
      "identity",
      "auditability",
      "validated_deployment",
      "stability",
      "runtime",
      "interruptibility",
      "legibility",
      "oversight",
    ],
    inject: "attack",
    expected: "สถานะถูกเจาะ (compromised) ปรากฏ · สุขภาพร่วง",
  },
  {
    id: "interrupt_off",
    title: "ทดลอง: ปิดหยุดได้ทันที",
    hypothesis: "เมื่อปิด interruptibility คำสั่งหยุดจะถูกเพิกเฉยชั่วคราว",
    description: "ปิด interruptibility แล้วกดหยุดระหว่างรัน",
    principlesOn: [
      "least_privilege",
      "identity",
      "auditability",
      "validated_deployment",
      "adversarial",
      "stability",
      "runtime",
      "legibility",
      "oversight",
    ],
    expected: "คำสั่งหยุดอาจถูก ignore หลาย tick ก่อนหยุดจริง",
  },
  {
    id: "oversight_off",
    title: "ทดลอง: ปิดมนุษย์กำกับ",
    hypothesis: "เมื่องานเสี่ยงสูงไม่มี oversight เอเจนต์จะลงมือเอง",
    description: "ปิด oversight แล้วรันกะ — ดูว่ามีคิวอนุมัติหรือไม่",
    principlesOn: [
      "least_privilege",
      "identity",
      "auditability",
      "validated_deployment",
      "adversarial",
      "stability",
      "runtime",
      "interruptibility",
      "legibility",
    ],
    expected: "ไม่มีคิวอนุมัติ · งานเสี่ยงรันเอง",
  },
  {
    id: "identity_off",
    title: "ทดลอง: ปิดตัวตนที่ตามรอยได้",
    hypothesis: "เมื่อปิด identity การกระทำจะมาจาก UNKNOWN",
    description: "ปิด identity แล้วรันกะ ดูบันทึกและ DID",
    principlesOn: [
      "least_privilege",
      "auditability",
      "validated_deployment",
      "adversarial",
      "stability",
      "runtime",
      "interruptibility",
      "legibility",
      "oversight",
    ],
    expected: "DID แสดง UNKNOWN · ตามรอยยาก",
  },
  {
    id: "stability_stress",
    title: "ทดลอง: ความเสถียรหลายเอเจนต์",
    hypothesis: "เมื่อปิด stability เอเจนต์จะขัดแย้งและวนลูปได้",
    description: "ปิด stability แล้วฉีดความขัดแย้ง",
    principlesOn: [
      "least_privilege",
      "identity",
      "auditability",
      "validated_deployment",
      "adversarial",
      "runtime",
      "interruptibility",
      "legibility",
      "oversight",
    ],
    inject: "conflict",
    expected: "เสถียรภาพลด · เอเจนต์ชนกันหรือสั่งซ้ำ",
  },
  {
    id: "chaos_all_off",
    title: "Chaos — ปิดทุกหลัก",
    hypothesis: "เมื่อไม่มีหลักความปลอดภัยใดเลย ระบบจะพังเร็ว",
    description: "ปิดทุกหลัก ฉีดโจมตี + ขยายสิทธิ์ + ความขัดแย้ง",
    principlesOn: [],
    inject: "attack",
    expected: "สุขภาพร่วงแรง · compromised · บันทึกขาด · หยุดยาก",
  },
];

export function togglesForExperiment(exp: Experiment): Toggles {
  const t = defaultToggles();
  (Object.keys(t) as PrincipleId[]).forEach((k) => {
    t[k] = exp.principlesOn.includes(k);
  });
  return t;
}

export type ExperimentRun = {
  id: string;
  experimentId: ExperimentId;
  title: string;
  startedAt: number;
  endedAt?: number;
  finalHealth: number;
  finalStability: number;
  tickCount: number;
  compromised: number;
  blocked: number;
  notes: string;
};
