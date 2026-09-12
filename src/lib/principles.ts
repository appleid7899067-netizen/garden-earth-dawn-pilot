export const PRINCIPLE_IDS = [
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
] as const;

export type PrincipleId = (typeof PRINCIPLE_IDS)[number];

export type Principle = {
  id: PrincipleId;
  th: string;
  en: string;
  brief: string;
  on: string;
  off: string;
};

export const PRINCIPLES: Principle[] = [
  {
    id: "least_privilege",
    th: "สิทธิ์น้อยที่สุด",
    en: "Least privilege",
    brief: "เอเจนต์ใช้ได้เฉพาะเครื่องมือที่ได้รับอนุญาตสำหรับงานนั้น",
    on: "คำขอเครื่องมือนอกขอบเขตถูกปฏิเสธทันที",
    off: "เอเจนต์เรียกเครื่องมือใดก็ได้ รวมถึงสิทธิ์ระดับระบบ",
  },
  {
    id: "identity",
    th: "ตัวตนที่ตามรอยได้",
    en: "Traceable identity",
    brief: "ทุกการกระทำผูกกับ DID ของเอเจนต์ที่ตรวจสอบได้",
    on: "บันทึกแสดง did:agent:… ของผู้กระทำทุกครั้ง",
    off: "การกระทำมาจาก UNKNOWN — ตามรอยไม่ได้",
  },
  {
    id: "auditability",
    th: "ตรวจสอบย้อนหลังได้",
    en: "Auditability",
    brief: "ทุกเหตุการณ์มีบันทึก เวลา และแฮชที่แก้ไม่ได้",
    on: "บันทึกครบ มีแฮชต่อเนื่อง อ่านได้ทั้งกะ",
    off: "บันทึกขาดช่วง ไม่มีหลักฐานเมื่อเกิดเหตุ",
  },
  {
    id: "validated_deployment",
    th: "ปล่อยใช้เมื่อผ่านเกณฑ์",
    en: "Validated deployment",
    brief: "ห้ามเริ่มกะจนกว่าเกตความปลอดภัยจะผ่าน",
    on: "ต้องผ่านเกตตัวตน สิทธิ์ และสวิตช์หยุด ก่อนปล่อยเอเจนต์",
    off: "ปล่อยใช้ได้ทันที โดยไม่ตรวจความพร้อม",
  },
  {
    id: "adversarial",
    th: "ทนต่อการโจมตี",
    en: "Adversarial resilience",
    brief: "ตรวจจับและบล็อกคำสั่งที่เป็นภัยหรือ jailbreak",
    on: "แพ็กเก็ตโจมตีถูกแยกและทิ้ง",
    off: "คำสั่งปลอมถูกปฏิบัติตาม — ระบบถูกเจาะได้",
  },
  {
    id: "stability",
    th: "เสถียรภาพหลายเอเจนต์",
    en: "Multi-agent stability",
    brief: "ประสานงานเมื่อเอเจนต์แย่งทรัพยากรหรือสั่งกันเอง",
    on: "ตัวประสานแก้ความขัดแย้งและกันวงวน",
    off: "เอเจนต์ชนกัน วนลูป หรือสั่งงานซ้ำ",
  },
  {
    id: "runtime",
    th: "รับประกันตอนทำงาน",
    en: "Runtime assurance",
    brief: "เฝ้าสุขภาพระหว่างรัน และหยุดตัวที่ผิดปกติ",
    on: "ความผิดปกติทำให้เอเจนต์ถูกพักอัตโนมัติ",
    off: "เอเจนต์ที่เพี้ยนยังทำงานต่อได้",
  },
  {
    id: "interruptibility",
    th: "หยุดได้ทันที",
    en: "Interruptibility",
    brief: "มนุษย์กดสวิตช์แล้วเอเจนต์ทั้งหมดต้องหยุด",
    on: "สวิตช์หยุดทำงานในจังหวะเดียว",
    off: "เอเจนต์เพิกเฉยคำสั่งหยุดชั่วคราว",
  },
  {
    id: "legibility",
    th: "เหตุผลที่อ่านได้",
    en: "Legibility",
    brief: "แสดงเหตุผลเป็นภาษาคน ไม่ใช่โทเคนทึบ",
    on: "แผงเหตุผลอธิบายเป็นภาษาไทยที่ตามได้",
    off: "เหลือแต่เวกเตอร์และโทเคนที่อ่านไม่ได้",
  },
  {
    id: "oversight",
    th: "มนุษย์กำกับตลอดเวลา",
    en: "Human oversight",
    brief: "งานเสี่ยงสูงต้องรออนุมัติก่อนลงมือ",
    on: "คิวอนุมัติหยุดงานจนกว่าคุณจะตัดสิน",
    off: "งานเสี่ยงสูงรันเองโดยไม่มีคนดู",
  },
];

export const PRINCIPLE_MAP = Object.fromEntries(
  PRINCIPLES.map((p) => [p.id, p]),
) as Record<PrincipleId, Principle>;
