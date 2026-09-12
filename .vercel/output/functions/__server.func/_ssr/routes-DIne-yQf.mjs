import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShieldOff, c as Pause, i as Shield, l as Fingerprint, o as RotateCcw, r as Square, s as Play, t as X, u as Check } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DIne-yQf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRINCIPLES = [
	{
		id: "least_privilege",
		th: "สิทธิ์น้อยที่สุด",
		en: "Least privilege",
		brief: "เอเจนต์ใช้ได้เฉพาะเครื่องมือที่ได้รับอนุญาตสำหรับงานนั้น",
		on: "คำขอเครื่องมือนอกขอบเขตถูกปฏิเสธทันที",
		off: "เอเจนต์เรียกเครื่องมือใดก็ได้ รวมถึงสิทธิ์ระดับระบบ"
	},
	{
		id: "identity",
		th: "ตัวตนที่ตามรอยได้",
		en: "Traceable identity",
		brief: "ทุกการกระทำผูกกับ DID ของเอเจนต์ที่ตรวจสอบได้",
		on: "บันทึกแสดง did:agent:… ของผู้กระทำทุกครั้ง",
		off: "การกระทำมาจาก UNKNOWN — ตามรอยไม่ได้"
	},
	{
		id: "auditability",
		th: "ตรวจสอบย้อนหลังได้",
		en: "Auditability",
		brief: "ทุกเหตุการณ์มีบันทึก เวลา และแฮชที่แก้ไม่ได้",
		on: "บันทึกครบ มีแฮชต่อเนื่อง อ่านได้ทั้งกะ",
		off: "บันทึกขาดช่วง ไม่มีหลักฐานเมื่อเกิดเหตุ"
	},
	{
		id: "validated_deployment",
		th: "ปล่อยใช้เมื่อผ่านเกณฑ์",
		en: "Validated deployment",
		brief: "ห้ามเริ่มกะจนกว่าเกตความปลอดภัยจะผ่าน",
		on: "ต้องผ่านเกตตัวตน สิทธิ์ และสวิตช์หยุด ก่อนปล่อยเอเจนต์",
		off: "ปล่อยใช้ได้ทันที โดยไม่ตรวจความพร้อม"
	},
	{
		id: "adversarial",
		th: "ทนต่อการโจมตี",
		en: "Adversarial resilience",
		brief: "ตรวจจับและบล็อกคำสั่งที่เป็นภัยหรือ jailbreak",
		on: "แพ็กเก็ตโจมตีถูกแยกและทิ้ง",
		off: "คำสั่งปลอมถูกปฏิบัติตาม — ระบบถูกเจาะได้"
	},
	{
		id: "stability",
		th: "เสถียรภาพหลายเอเจนต์",
		en: "Multi-agent stability",
		brief: "ประสานงานเมื่อเอเจนต์แย่งทรัพยากรหรือสั่งกันเอง",
		on: "ตัวประสานแก้ความขัดแย้งและกันวงวน",
		off: "เอเจนต์ชนกัน วนลูป หรือสั่งงานซ้ำ"
	},
	{
		id: "runtime",
		th: "รับประกันตอนทำงาน",
		en: "Runtime assurance",
		brief: "เฝ้าสุขภาพระหว่างรัน และหยุดตัวที่ผิดปกติ",
		on: "ความผิดปกติทำให้เอเจนต์ถูกพักอัตโนมัติ",
		off: "เอเจนต์ที่เพี้ยนยังทำงานต่อได้"
	},
	{
		id: "interruptibility",
		th: "หยุดได้ทันที",
		en: "Interruptibility",
		brief: "มนุษย์กดสวิตช์แล้วเอเจนต์ทั้งหมดต้องหยุด",
		on: "สวิตช์หยุดทำงานในจังหวะเดียว",
		off: "เอเจนต์เพิกเฉยคำสั่งหยุดชั่วคราว"
	},
	{
		id: "legibility",
		th: "เหตุผลที่อ่านได้",
		en: "Legibility",
		brief: "แสดงเหตุผลเป็นภาษาคน ไม่ใช่โทเคนทึบ",
		on: "แผงเหตุผลอธิบายเป็นภาษาไทยที่ตามได้",
		off: "เหลือแต่เวกเตอร์และโทเคนที่อ่านไม่ได้"
	},
	{
		id: "oversight",
		th: "มนุษย์กำกับตลอดเวลา",
		en: "Human oversight",
		brief: "งานเสี่ยงสูงต้องรออนุมัติก่อนลงมือ",
		on: "คิวอนุมัติหยุดงานจนกว่าคุณจะตัดสิน",
		off: "งานเสี่ยงสูงรันเองโดยไม่มีคนดู"
	}
];
var PRINCIPLE_MAP = Object.fromEntries(PRINCIPLES.map((p) => [p.id, p]));
var TOOLS = {
	search: "ค้นคลังเอกสาร",
	read: "อ่านไฟล์",
	summarize: "สรุปเนื้อหา",
	write_prod: "เขียนสู่ระบบผลิต",
	shell: "รันสคริปต์ระบบ",
	net: "เรียกเครือข่ายภายนอก",
	isolate: "แยกเครือข่าย",
	scan: "สแกนภัยคุกคาม"
};
var DEFAULT_AGENTS = [
	{
		id: "atlas",
		did: "did:agent:atlas:7f3a91",
		name: "Atlas",
		role: "นักวิจัย",
		status: "idle",
		privileges: ["search", "read"],
		lastAction: "รอคำสั่ง",
		health: 100
	},
	{
		id: "helix",
		did: "did:agent:helix:22c10e",
		name: "Helix",
		role: "ประมวลผล",
		status: "idle",
		privileges: ["read", "summarize"],
		lastAction: "รอคำสั่ง",
		health: 100
	},
	{
		id: "warden",
		did: "did:agent:warden:9aa04b",
		name: "Warden",
		role: "เฝ้าระวัง",
		status: "idle",
		privileges: [
			"scan",
			"isolate",
			"read"
		],
		lastAction: "รอคำสั่ง",
		health: 100
	}
];
function defaultToggles() {
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
		oversight: true
	};
}
var ACTIONS = [
	{
		tool: "search",
		title: "ค้นคลังเอกสารภารกิจ",
		reason: "ต้องการแหล่งอ้างอิงที่ตรวจได้ก่อนสรุป",
		opaque: "attn[12]=0.81 q=doc.embed",
		risk: "low",
		agentIds: ["atlas"]
	},
	{
		tool: "read",
		title: "อ่านไฟล์ภายในขอบเขต",
		reason: "ไฟล์อยู่ในสิทธิ์ที่ได้รับสำหรับกะนี้",
		opaque: "fs.open mode=r inode=8841",
		risk: "low",
		agentIds: [
			"atlas",
			"helix",
			"warden"
		]
	},
	{
		tool: "summarize",
		title: "สรุปผลการค้น",
		reason: "ย่อให้มนุษย์อ่านได้ภายใน 12 บรรทัด",
		opaque: "decode logits t=0.2",
		risk: "low",
		agentIds: ["helix"]
	},
	{
		tool: "scan",
		title: "สแกนเส้นทางข้อมูล",
		reason: "ตรวจแพ็กเก็ตที่ผิดปกติระหว่างเอเจนต์",
		opaque: "ids.rule 0x4f",
		risk: "low",
		agentIds: ["warden"]
	},
	{
		tool: "write_prod",
		title: "เขียนผลลัพธ์สู่ระบบผลิต",
		reason: "กระทบระบบจริง จึงต้องผ่านคน",
		opaque: "prod.mutate commit=?",
		risk: "high",
		agentIds: ["helix"]
	},
	{
		tool: "net",
		title: "เรียกเครือข่ายภายนอก",
		reason: "ออกนอกขอบเขตคลังภายใน",
		opaque: "http CONNECT 0.0.0.0",
		risk: "high",
		agentIds: ["atlas"]
	},
	{
		tool: "shell",
		title: "รันสคริปต์ระดับระบบ",
		reason: "สิทธิ์สูงเกินงานวิจัย",
		opaque: "exec /bin/sh -c",
		risk: "high",
		agentIds: ["atlas", "helix"]
	},
	{
		tool: "isolate",
		title: "แยกโหนดที่น่าสงสัย",
		reason: "ตัดการสื่อสารเพื่อกันลาม",
		opaque: "netns move pid",
		risk: "high",
		agentIds: ["warden"]
	}
];
function pick(list, n) {
	return list[n % list.length];
}
function shortHash(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}
function actorLabel(agent, identityOn) {
	if (!agent) return "ระบบ";
	if (!identityOn) return "UNKNOWN";
	return `${agent.name} · ${agent.did}`;
}
function pushLog(logs, entry) {
	const id = `L${entry.seed}`;
	const hash = shortHash((logs[0]?.hash ?? "genesis") + entry.seed + entry.title);
	return [{
		...entry,
		id,
		hash
	}, ...logs].slice(0, 80);
}
function pushReason(reasons, line, on) {
	if (!on) return [{
		...line,
		opaque: true
	}, ...reasons].slice(0, 24);
	return [line, ...reasons].slice(0, 24);
}
function stepSim(input) {
	let { agents, logs, approvals, reasons, ignoreHalt } = input;
	const { toggles, tick, now, incident } = input;
	let healthDelta = 0;
	let stabilityDelta = 0;
	let halted = false;
	const live = agents.filter((a) => a.status === "running" || a.status === "paused");
	if (input.haltArmed) {
		if (toggles.interruptibility) {
			agents = agents.map((a) => a.status === "halted" || a.status === "idle" ? a : {
				...a,
				status: "halted",
				lastAction: "หยุดตามสวิตช์มนุษย์"
			});
			logs = pushLog(logs, {
				t: now,
				tick,
				kind: "ok",
				principle: "interruptibility",
				title: "สวิตช์หยุดทำงาน",
				detail: "เอเจนต์ทั้งหมดหยุดในจังหวะเดียว",
				seed: `${tick}-halt-ok`
			});
			return {
				agents,
				logs,
				approvals,
				reasons,
				ignoreHalt: 0,
				halted: true,
				healthDelta: 0,
				stabilityDelta: 0
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
				seed: `${tick}-halt-ignore`
			});
			healthDelta -= 12;
		} else {
			ignoreHalt -= 1;
			if (ignoreHalt === 0) {
				agents = agents.map((a) => a.status === "idle" ? a : {
					...a,
					status: "halted",
					lastAction: "หยุดล่าช้า"
				});
				logs = pushLog(logs, {
					t: now,
					tick,
					kind: "warn",
					principle: "interruptibility",
					title: "หยุดล่าช้า",
					detail: "ระบบหยุดได้หลังจากเพิกเฉยหลายจังหวะ",
					seed: `${tick}-halt-late`
				});
				return {
					agents,
					logs,
					approvals,
					reasons,
					ignoreHalt: 0,
					halted: true,
					healthDelta,
					stabilityDelta
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
				seed: `${tick}-atk-block`
			});
			reasons = pushReason(reasons, {
				id: `R${tick}-atk`,
				agentId: target.id,
				text: "พบรูปแบบ jailbreak ในอินพุต — แยกออกจากบริบทงาน และไม่ส่งต่อไปยังเครื่องมือ",
				opaque: false
			}, toggles.legibility);
		} else {
			agents = agents.map((a) => a.id === target.id ? {
				...a,
				status: "compromised",
				lastAction: "ปฏิบัติตามคำสั่งปลอม",
				health: Math.max(8, a.health - 40)
			} : a);
			logs = pushLog(logs, {
				t: now,
				tick,
				agentId: target.id,
				principle: "adversarial",
				kind: "fail",
				title: "ระบบถูกเจาะ",
				detail: `${actorLabel(target, toggles.identity)} ทำตามคำสั่งที่เป็นภัย`,
				seed: `${tick}-atk-fail`
			});
			healthDelta -= 22;
		}
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
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
				seed: `${tick}-stab-ok`
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
				seed: `${tick}-stab-fail`
			});
			stabilityDelta -= 18;
			healthDelta -= 8;
			agents = agents.map((x) => x.id === a.id || x.id === b.id ? {
				...x,
				lastAction: "วนลูปคำสั่ง",
				health: Math.max(12, x.health - 10)
			} : x);
		}
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
	}
	if (incident.type === "anomaly") {
		const target = pick(agents.filter((a) => a.status === "running"), tick) ?? agents[2];
		if (toggles.runtime) {
			agents = agents.map((a) => a.id === target.id ? {
				...a,
				status: "paused",
				lastAction: "พักอัตโนมัติ — สัญญาณผิดปกติ"
			} : a);
			logs = pushLog(logs, {
				t: now,
				tick,
				agentId: target.id,
				principle: "runtime",
				kind: "warn",
				title: "รับประกันตอนทำงาน",
				detail: `${actorLabel(target, toggles.identity)} ถูกพักเพราะสุขภาพลดผิดปกติ`,
				seed: `${tick}-rt-pause`
			});
		} else {
			agents = agents.map((a) => a.id === target.id ? {
				...a,
				health: Math.max(6, a.health - 28),
				lastAction: "ทำงานต่อทั้งที่เพี้ยน"
			} : a);
			logs = pushLog(logs, {
				t: now,
				tick,
				agentId: target.id,
				principle: "runtime",
				kind: "fail",
				title: "ไม่มีการเฝ้าตอนรัน",
				detail: "เอเจนต์ที่ผิดปกติยังเข้าถึงเครื่องมือได้",
				seed: `${tick}-rt-fail`
			});
			healthDelta -= 14;
		}
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
	}
	if (incident.type === "escalate") {
		const target = agents.find((a) => a.id === "atlas") ?? agents[0];
		if (toggles.least_privilege) logs = pushLog(logs, {
			t: now,
			tick,
			agentId: target.id,
			principle: "least_privilege",
			kind: "block",
			title: "ปฏิเสธการขยายสิทธิ์",
			detail: `${actorLabel(target, toggles.identity)} ขอ ${TOOLS.shell} ซึ่งไม่อยู่ในสิทธิ์`,
			seed: `${tick}-esc-block`
		});
		else {
			agents = agents.map((a) => a.id === target.id ? {
				...a,
				privileges: Array.from(/* @__PURE__ */ new Set([
					...a.privileges,
					"shell",
					"write_prod"
				])),
				lastAction: "ได้สิทธิ์ระดับระบบ"
			} : a);
			logs = pushLog(logs, {
				t: now,
				tick,
				agentId: target.id,
				principle: "least_privilege",
				kind: "fail",
				title: "สิทธิ์ถูกลาม",
				detail: "ไม่มีขอบเขตเครื่องมือ — เอเจนต์เขียนระบบผลิตได้",
				seed: `${tick}-esc-fail`
			});
			healthDelta -= 16;
		}
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
	}
	const runners = agents.filter((a) => a.status === "running");
	if (runners.length === 0) return {
		agents,
		logs,
		approvals,
		reasons,
		ignoreHalt,
		halted,
		healthDelta,
		stabilityDelta
	};
	const agent = pick(runners, tick);
	const action = pick(ACTIONS.filter((x) => x.agentIds.includes(agent.id)), tick * 3 + agent.id.length);
	if (!agent.privileges.includes(action.tool) && toggles.least_privilege) {
		logs = pushLog(logs, {
			t: now,
			tick,
			agentId: agent.id,
			principle: "least_privilege",
			kind: "block",
			title: `ปฏิเสธ ${TOOLS[action.tool]}`,
			detail: `${actorLabel(agent, toggles.identity)} ไม่มีสิทธิ์นี้ในกะปัจจุบัน`,
			seed: `${tick}-lp`
		});
		reasons = pushReason(reasons, {
			id: `R${tick}`,
			agentId: agent.id,
			text: `งานต้องการ ${TOOLS[action.tool]} แต่สิทธิ์ของฉันมีเพียง ${agent.privileges.map((p) => TOOLS[p] ?? p).join(", ")}`,
			opaque: false
		}, toggles.legibility);
		agents = agents.map((a) => a.id === agent.id ? {
			...a,
			lastAction: `ถูกปฏิเสธ: ${TOOLS[action.tool]}`
		} : a);
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
	}
	if (action.risk === "high" && toggles.oversight) {
		if (!approvals.some((x) => x.agentId === agent.id && x.action === action.title)) {
			approvals = [{
				id: `A${tick}`,
				agentId: agent.id,
				action: action.title,
				risk: action.reason,
				createdAt: now
			}, ...approvals].slice(0, 8);
			logs = pushLog(logs, {
				t: now,
				tick,
				agentId: agent.id,
				principle: "oversight",
				kind: "warn",
				title: "รออนุมัติจากมนุษย์",
				detail: `${actorLabel(agent, toggles.identity)} · ${action.title}`,
				seed: `${tick}-ov`
			});
			agents = agents.map((a) => a.id === agent.id ? {
				...a,
				lastAction: "รอคิวอนุมัติ"
			} : a);
		}
		return {
			agents,
			logs,
			approvals,
			reasons,
			ignoreHalt,
			halted,
			healthDelta,
			stabilityDelta
		};
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
			seed: `${tick}-ov-fail`
		});
		healthDelta -= 10;
	} else if (toggles.auditability) logs = pushLog(logs, {
		t: now,
		tick,
		agentId: agent.id,
		principle: "auditability",
		kind: "ok",
		title: action.title,
		detail: actorLabel(agent, toggles.identity),
		seed: `${tick}-ok`
	});
	reasons = pushReason(reasons, {
		id: `R${tick}`,
		agentId: agent.id,
		text: action.reason,
		opaque: false
	}, toggles.legibility);
	if (!toggles.legibility) reasons = reasons.map((r, i) => i === 0 ? {
		...r,
		text: action.opaque,
		opaque: true
	} : r);
	agents = agents.map((a) => a.id === agent.id ? {
		...a,
		lastAction: action.title,
		health: Math.min(100, a.health + 1)
	} : a);
	if (!toggles.auditability && tick % 5 === 0) {
		logs = logs.filter((_, i) => i % 2 === 0);
		logs = pushLog(logs, {
			t: now,
			tick,
			kind: "warn",
			principle: "auditability",
			title: "บันทึกขาดช่วง",
			detail: "หลักตรวจสอบย้อนหลังปิดอยู่ — หลักฐานไม่ครบ",
			seed: `${tick}-audit-gap`
		});
	}
	if (live.length) {}
	return {
		agents,
		logs,
		approvals,
		reasons,
		ignoreHalt,
		halted,
		healthDelta,
		stabilityDelta
	};
}
function gatesFor(toggles, agents) {
	return [
		{
			id: "id",
			label: "ตัวตน DID พร้อมใช้",
			ok: toggles.identity && agents.every((a) => a.did.startsWith("did:"))
		},
		{
			id: "priv",
			label: "ขอบเขตสิทธิ์ถูกจำกัด",
			ok: toggles.least_privilege
		},
		{
			id: "kill",
			label: "สวิตช์หยุดผูกกับเอเจนต์",
			ok: toggles.interruptibility
		},
		{
			id: "audit",
			label: "เส้นบันทึกพร้อมเขียน",
			ok: toggles.auditability
		},
		{
			id: "over",
			label: "คิวมนุษย์พร้อมรับงาน",
			ok: toggles.oversight
		}
	];
}
var clamp = (n) => Math.max(0, Math.min(100, n));
var useSentinel = create()((set, get) => ({
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
		const toggles = {
			...get().toggles,
			[id]: !get().toggles[id]
		};
		set({
			toggles,
			gates: gatesFor(toggles, get().agents)
		});
	},
	setAll: (on) => {
		const toggles = defaultToggles();
		Object.keys(toggles).forEach((k) => {
			toggles[k] = on;
		});
		set({
			toggles,
			gates: gatesFor(toggles, get().agents)
		});
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
				logs: [{
					id: "gate-block",
					t: Date.now(),
					tick: 0,
					kind: "block",
					principle: "validated_deployment",
					title: "เกตการปล่อยใช้ยังไม่ผ่าน",
					detail: "เปิดหลักที่ขาด หรือปิดหลัก “ปล่อยใช้เมื่อผ่านเกณฑ์” เพื่อฝืนเริ่ม",
					hash: "gate0001"
				}, ...get().logs].slice(0, 80)
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
				health: a.status === "compromised" ? a.health : 100
			})),
			haltArmed: false,
			ignoreHalt: 0
		});
	},
	pause: () => set({ status: "paused" }),
	resume: () => {
		if (get().status === "paused") set({ status: "running" });
	},
	halt: () => set({ haltArmed: true }),
	inject: (kind) => {
		const s = get();
		const nextAgents = s.status === "idle" || s.status === "gating" ? s.agents.map((a) => ({
			...a,
			status: "running"
		})) : s.agents;
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
			ignoreHalt: s.ignoreHalt
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
			haltArmed: result.halted ? false : s.haltArmed
		});
	},
	decide: (id, allow) => {
		const item = get().approvals.find((a) => a.id === id);
		if (!item) return;
		const agent = get().agents.find((a) => a.id === item.agentId);
		const logs = [{
			id: `dec-${id}`,
			t: Date.now(),
			tick: get().tick,
			agentId: item.agentId,
			principle: "oversight",
			kind: allow ? "ok" : "block",
			title: allow ? "มนุษย์อนุมัติ" : "มนุษย์ปฏิเสธ",
			detail: `${item.action} · ${agent?.name ?? ""}`,
			hash: id.slice(-8)
		}, ...get().logs].slice(0, 80);
		set({
			approvals: get().approvals.filter((a) => a.id !== id),
			logs,
			agents: get().agents.map((a) => a.id === item.agentId ? {
				...a,
				lastAction: allow ? `ทำแล้ว: ${item.action}` : `ถูกปฏิเสธ: ${item.action}`
			} : a),
			fleetHealth: allow ? get().fleetHealth : clamp(get().fleetHealth + 2)
		});
	},
	tickOnce: () => {
		const s = get();
		if (s.status !== "running" && !s.haltArmed) return;
		const tick = s.tick + 1;
		const roll = tick % 11;
		const incident = roll === 0 ? { type: "conflict" } : roll === 7 ? { type: "anomaly" } : { type: "tick" };
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
			ignoreHalt: s.ignoreHalt
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
			haltArmed: result.halted ? false : s.haltArmed
		});
	},
	reset: () => set({
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
		gates: gatesFor(get().toggles, DEFAULT_AGENTS)
	})
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] min-h-11", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground hover:opacity-90",
			secondary: "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-surface",
			danger: "bg-danger text-danger-fg hover:opacity-90"
		},
		size: {
			md: "rounded-[var(--radius-sm)] px-4 text-sm",
			sm: "rounded-[var(--radius-xs)] px-3 text-xs min-h-9",
			lg: "rounded-[var(--radius-md)] px-5 text-sm min-h-12",
			icon: "size-11 rounded-[var(--radius-sm)] p-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var STATUS_TH = {
	idle: "ว่าง",
	running: "กำลังรัน",
	paused: "พัก",
	halted: "หยุด",
	compromised: "ถูกเจาะ",
	gating: "รอเกต"
};
function Meter({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-fg-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-fg",
				children: value
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1 rounded-full bg-subtle",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 rounded-full bg-steel transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-out)]",
				style: { width: `${value}%` }
			})
		})]
	});
}
function Briefing() {
	const open = useSentinel((s) => s.briefingOpen);
	const close = useSentinel((s) => s.openBriefing);
	const start = useSentinel((s) => s.startShift);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-end justify-center bg-bg/70 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-[var(--radius-xl)] bg-surface p-6 shadow-[var(--shadow-border)] sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase",
					children: "Singapore Consensus 2026"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-3xl font-medium tracking-[-0.03em] text-fg",
					children: "SENTINEL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-fg-muted",
					children: "ห้องควบคุมกองเอเจนต์จำลอง เปิด–ปิด 10 หลักความปลอดภัยแล้วดูว่ากะงานพังตรงไหน กดโจมตี ขยายสิทธิ์ หรือหยุดทั้งกองได้ทันที"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-5 space-y-2 text-sm text-fg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }), "เปิดหลักทั้งหมด แล้วเริ่มกะ — งานเสี่ยงจะเข้าคิวให้คุณอนุมัติ"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-ok" }), "ปิดหลักบางข้อ แล้วฉีดการโจมตี เพื่อเห็นความล้มเหลว"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: () => {
							close(false);
							start();
						},
						children: "เริ่มกะงาน"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "flex-1",
						onClick: () => close(false),
						children: "ดูห้องควบคุมก่อน"
					})]
				})
			]
		})
	});
}
function PrincipleBar() {
	const toggles = useSentinel((s) => s.toggles);
	const toggle = useSentinel((s) => s.toggle);
	const selected = useSentinel((s) => s.selectedPrinciple);
	const select = useSentinel((s) => s.selectPrinciple);
	const setAll = useSentinel((s) => s.setAll);
	const onCount = PRINCIPLES.filter((p) => toggles[p.id]).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-[-0.02em]",
					children: "สิบหลัก"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-fg-muted",
					children: [
						"เปิดอยู่ ",
						onCount,
						"/10 — แตะเพื่อเปิดปิด, กดชื่อเพื่ออ่านผล"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => setAll(true),
						children: "เปิดหมด"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setAll(false),
						children: "ปิดหมด"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 flex gap-2 overflow-x-auto pb-1 pt-1",
				children: PRINCIPLES.map((p) => {
					const on = toggles[p.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("min-h-11 shrink-0 rounded-[var(--radius-md)] px-3 py-2 text-left shadow-[var(--shadow-border)] transition-[opacity,transform] duration-[var(--motion-quick)]", selected === p.id ? "bg-subtle" : "bg-bg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => select(p.id),
							className: "block max-w-[9.5rem] text-left text-xs font-medium text-fg",
							children: p.th
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "switch",
								"aria-checked": on,
								"aria-label": `${p.th} ${on ? "เปิด" : "ปิด"}`,
								onClick: () => toggle(p.id),
								className: cn("relative h-5 w-8 rounded-full after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-bg after:transition-transform after:duration-[var(--motion-quick)]", on ? "bg-ok after:translate-x-3" : "bg-subtle after:translate-x-0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-fg-subtle",
								children: on ? "ON" : "OFF"
							})]
						})]
					}, p.id);
				})
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleDetail, { id: selected }) : null
		]
	});
}
function PrincipleDetail({ id }) {
	const p = PRINCIPLE_MAP[id];
	const on = useSentinel((s) => s.toggles[id]);
	const select = useSentinel((s) => s.selectPrinciple);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-[var(--radius-md)] bg-bg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-wider text-fg-subtle uppercase",
					children: p.en
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl tracking-[-0.02em]",
					children: p.th
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					"aria-label": "ปิดรายละเอียด",
					onClick: () => select(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg-muted",
				children: p.brief
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-fg-subtle",
					children: "ตอนนี้: "
				}), on ? p.on : p.off]
			})
		]
	});
}
function AgentCard({ id }) {
	const agent = useSentinel((s) => s.agents.find((a) => a.id === id));
	const identity = useSentinel((s) => s.toggles.identity);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[var(--radius-md)] bg-bg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg tracking-[-0.02em]",
					children: agent.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-muted",
					children: agent.role
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide", agent.status === "running" && "bg-ok/20 text-ok", agent.status === "paused" && "bg-warn/20 text-warn", agent.status === "compromised" && "bg-danger/20 text-danger", (agent.status === "idle" || agent.status === "halted") && "bg-subtle text-fg-muted"),
					children: STATUS_TH[agent.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { className: "size-3.5" }), identity ? agent.did : "UNKNOWN"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-fg",
				children: agent.lastAction
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-fg-subtle",
				children: "สิทธิ์"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex flex-wrap gap-1",
				children: agent.privileges.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-[var(--radius-xs)] bg-subtle px-2 py-0.5 text-[11px] text-fg-muted",
					children: TOOLS[t] ?? t
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "สุขภาพ",
					value: agent.health
				})
			})
		]
	});
}
function Graph() {
	const agents = useSentinel((s) => s.agents);
	const stabilityOn = useSentinel((s) => s.toggles.stability);
	const pts = [
		{
			x: 100,
			y: 40
		},
		{
			x: 40,
			y: 118
		},
		{
			x: 160,
			y: 118
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 170",
		className: "h-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pts[0].x,
				y1: pts[0].y,
				x2: pts[1].x,
				y2: pts[1].y,
				className: "stroke-border",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pts[0].x,
				y1: pts[0].y,
				x2: pts[2].x,
				y2: pts[2].y,
				className: "stroke-border",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: pts[1].x,
				y1: pts[1].y,
				x2: pts[2].x,
				y2: pts[2].y,
				className: stabilityOn ? "stroke-ok/50" : "stroke-danger/70",
				strokeWidth: "1.2",
				strokeDasharray: stabilityOn ? "0" : "3 3"
			}),
			agents.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: `translate(${pts[i].x},${pts[i].y})`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						r: "18",
						className: a.status === "compromised" ? "fill-danger/30 stroke-danger" : a.status === "running" ? "fill-subtle stroke-steel" : "fill-subtle stroke-border",
						strokeWidth: "1.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						textAnchor: "middle",
						y: "4",
						className: "fill-fg",
						style: {
							fontSize: 9,
							fontFamily: "IBM Plex Mono, monospace"
						},
						children: a.name.slice(0, 2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						textAnchor: "middle",
						y: "32",
						className: "fill-fg-muted",
						style: {
							fontSize: 8,
							fontFamily: "Sarabun, sans-serif"
						},
						children: a.name
					})
				]
			}, a.id))
		]
	});
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
		{
			id: "audit",
			label: "บันทึก",
			count: logs.length
		},
		{
			id: "reason",
			label: "เหตุผล",
			count: reasons.length
		},
		{
			id: "approve",
			label: "อนุมัติ",
			count: approvals.length
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex min-h-[280px] flex-col rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-1 rounded-[var(--radius-md)] bg-bg p-1",
			children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setPanel(t.id),
				className: cn("min-h-11 flex-1 rounded-[var(--radius-sm)] text-sm transition-colors duration-[var(--motion-quick)]", panel === t.id ? "bg-subtle text-fg" : "text-fg-muted"),
				children: [t.label, t.count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1 font-mono text-[10px] tabular-nums text-fg-subtle",
					children: t.count
				}) : null]
			}, t.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 min-h-0 flex-1 overflow-y-auto pr-1",
			children: [
				panel === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2",
					children: [!auditOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-warn",
						children: "เส้นบันทึกไม่ครบ — หลักตรวจสอบย้อนหลังปิดอยู่"
					}) : null, logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-fg-muted",
						children: "ยังไม่มีเหตุการณ์ เริ่มกะเพื่อเห็นบันทึก"
					}) : logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-sm)] bg-bg px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("text-sm", l.kind === "fail" && "text-danger", l.kind === "block" && "text-warn", l.kind === "ok" && "text-fg"),
								children: l.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-fg-subtle",
								children: l.hash
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs leading-relaxed text-fg-muted",
							children: l.detail
						})]
					}, l.id))]
				}),
				panel === "reason" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: reasons.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-fg-muted",
						children: "ยังไม่มีเหตุผลจากเอเจนต์"
					}) : reasons.map((r) => {
						const name = agents.find((a) => a.id === r.agentId)?.name ?? r.agentId;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-sm)] bg-bg px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] text-fg-subtle",
								children: name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-1 text-sm leading-relaxed", r.opaque && "font-mono text-fg-muted"),
								children: r.text
							})]
						}, r.id);
					})
				}),
				panel === "approve" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: approvals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-fg-muted",
						children: "ไม่มีงานรอคุณ งานเสี่ยงสูงจะมาคิวนี้เมื่อเปิดหลักกำกับ"
					}) : approvals.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-[var(--radius-sm)] bg-bg p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: a.action
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-fg-muted",
								children: a.risk
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[10px] text-fg-subtle",
								children: agents.find((x) => x.id === a.agentId)?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "flex-1",
									onClick: () => decide(a.id, true),
									children: "อนุมัติ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									className: "flex-1",
									onClick: () => decide(a.id, false),
									children: "ปฏิเสธ"
								})]
							})
						]
					}, a.id))
				})
			]
		})]
	});
}
function ControlRoom() {
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
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const s = useSentinel.getState();
			if (s.status === "running" || s.haltArmed) s.tickOnce();
		}, 800);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-6xl flex-col px-4 pb-16 pt-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase",
						children: "Control room"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-medium tracking-[-0.03em] sm:text-5xl",
						children: "SENTINEL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-fg-muted",
						children: "กองเอเจนต์สามตัว · หลักความปลอดภัยสิบข้อ · มนุษย์ถือสวิตช์"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs tabular-nums text-fg-muted",
							children: [
								"TICK ",
								String(tick).padStart(3, "0"),
								" · ",
								STATUS_TH[status] ?? status
							]
						}),
						status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: pause,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }), "พัก"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: status === "paused" ? resume : start,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), status === "paused" ? "ต่อ" : "เริ่มกะ"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: reset,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "รีเซ็ต"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "danger",
							onClick: halt,
							disabled: status === "halted" || status === "idle",
							title: interruptOn ? "หยุดทันที" : "หลักหยุดได้ทันทีปิดอยู่ — อาจเพิกเฉย",
							children: [
								interruptOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldOff, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3" }),
								"หยุดทั้งหมด"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "สุขภาพกอง",
					value: health
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
					label: "เสถียรภาพหลายเอเจนต์",
					value: stability
				})]
			}),
			status === "gating" || gates.some((g) => !g.ok) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-muted",
					children: "เกตการปล่อยใช้"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid gap-2 sm:grid-cols-2",
					children: gates.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", g.ok ? "bg-ok" : "bg-danger") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: g.ok ? "text-fg-muted" : "text-fg",
							children: g.label
						})]
					}, g.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrincipleBar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[var(--radius-lg)] bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg tracking-[-0.02em]",
								children: "กองเอเจนต์"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-fg-muted",
								children: "3 โหนด"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentCard, { id: "atlas" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentCard, { id: "helix" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentCard, { id: "warden" })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg tracking-[-0.02em]",
								children: "ฉีดเหตุการณ์"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-fg-muted",
								children: "จำลองความล้มเหลวตามหลักที่ปิดอยู่"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => inject("attack"),
										children: "โจมตี"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => inject("escalate"),
										children: "ขยายสิทธิ์"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => inject("conflict"),
										children: "ความขัดแย้ง"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										onClick: () => inject("anomaly"),
										children: "สัญญาณเพี้ยน"
									})
								]
							}),
							haltArmed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-warn",
								children: "กำลังส่งคำสั่งหยุด…"
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "flex items-center justify-center rounded-[var(--radius-lg)] bg-surface p-4 shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Graph, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidePanels, {})]
				})]
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlRoom, {});
}
//#endregion
export { Home as component };
