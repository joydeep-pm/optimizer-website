import { useEffect, useMemo, useRef } from "react";
import { Environment, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ExperienceProps {
  progress: number;
}

function clamp01(v: number) {
  return THREE.MathUtils.clamp(v, 0, 1);
}

/* ─── Drawing helpers ───────────────────────────────────────────── */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawChip(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const g = ctx.createLinearGradient(x, y, x + 72, y + 56);
  g.addColorStop(0, "#dac382");
  g.addColorStop(0.5, "#f8e4a0");
  g.addColorStop(1, "#c8af64");
  ctx.fillStyle = g;
  roundRect(ctx, x, y, 72, 56, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(160,130,60,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 36, y + 6);
  ctx.lineTo(x + 36, y + 50);
  ctx.moveTo(x + 8, y + 28);
  ctx.lineTo(x + 64, y + 28);
  ctx.stroke();
}

function drawContactless(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x, y, 10 + i * 9, -0.8, 0.8);
    ctx.stroke();
  }
}

function drawMastercard(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "#eb001b";
  ctx.beginPath();
  ctx.arc(x - 14, y, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f79e1b";
  ctx.beginPath();
  ctx.arc(x + 14, y, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function makeTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/* ─── HSBC Premier (landscape 1024 x 640) ────────────────────────── */

function buildHSBCTexture() {
  const W = 1024, H = 640;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Deep purple gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#3d1f5c");
  bg.addColorStop(0.3, "#4e2970");
  bg.addColorStop(0.7, "#3a1d56");
  bg.addColorStop(1, "#2d1645");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Soft curved highlight (top-left, like real card)
  const arc = ctx.createRadialGradient(W * 0.2, H * 0.15, 20, W * 0.2, H * 0.15, 380);
  arc.addColorStop(0, "rgba(130,90,180,0.16)");
  arc.addColorStop(1, "transparent");
  ctx.fillStyle = arc;
  ctx.fillRect(0, 0, W, H);

  // HSBC red hexagon — top-left
  ctx.fillStyle = "#db0011";
  ctx.beginPath();
  const hx = 75, hy = 72, hr = 30;
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const px = hx + hr * Math.cos(a);
    const py = hy + hr * Math.sin(a);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // White cross inside hexagon
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(hx - 13, hy - 2.5, 26, 5);
  ctx.fillRect(hx - 2.5, hy - 13, 5, 26);

  // "HSBC"
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "bold 36px 'Space Grotesk', sans-serif";
  ctx.fillText("HSBC", 120, 84);

  // Contactless — top-right
  drawContactless(ctx, W - 55, 62);

  // Chip
  drawChip(ctx, 200, 58);

  // "Premier Credit"
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "500 24px 'Space Grotesk', sans-serif";
  ctx.fillText("Premier", 65, 160);
  ctx.fillText("Credit", 65, 188);

  // ── Geometric diamond pattern (center-right) ──
  ctx.save();
  ctx.translate(W * 0.54, H * 0.56);
  ctx.rotate(Math.PI / 4);
  const sz = 155;

  // Diamond border
  ctx.strokeStyle = "rgba(200,160,240,0.50)";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(-sz / 2, -sz / 2, sz, sz);

  // Cross dividers
  ctx.beginPath();
  ctx.moveTo(-sz / 2, 0);
  ctx.lineTo(sz / 2, 0);
  ctx.moveTo(0, -sz / 2);
  ctx.lineTo(0, sz / 2);
  ctx.stroke();

  // Fill triangles with vibrant marble-like gradients
  const fills = [
    ["rgba(160,120,240,0.45)", "rgba(100,160,250,0.25)", "rgba(180,140,255,0.35)"],
    ["rgba(200,150,255,0.40)", "rgba(120,200,240,0.22)", "rgba(160,100,220,0.32)"],
    ["rgba(130,90,220,0.42)", "rgba(180,140,255,0.26)", "rgba(100,140,230,0.35)"],
    ["rgba(180,150,240,0.45)", "rgba(100,120,220,0.25)", "rgba(200,160,255,0.36)"],
  ];
  for (let i = 0; i < 4; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 2);
    const tg = ctx.createLinearGradient(0, 0, sz / 2, -sz / 2);
    tg.addColorStop(0, fills[i][0]);
    tg.addColorStop(0.5, fills[i][2]);
    tg.addColorStop(1, fills[i][1]);
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(sz / 2, -sz / 2);
    ctx.lineTo(-sz / 2, -sz / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // "World" — bottom-left
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "400 20px 'Space Grotesk', sans-serif";
  ctx.fillText("World", 65, H - 55);

  // Mastercard — bottom-right
  drawMastercard(ctx, W - 90, H - 65);

  return makeTexture(c);
}

/* ─── ICICI Emeralde Private (landscape 1024 x 640) ─────────────── */

function buildEmeraldeTexture() {
  const W = 1024, H = 640;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Dark teal-to-black
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#021a1a");
  bg.addColorStop(0.35, "#042e2e");
  bg.addColorStop(0.65, "#031f1f");
  bg.addColorStop(1, "#010f0f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Teal glow — more prominent
  const glow = ctx.createRadialGradient(W * 0.32, H * 0.55, 20, W * 0.32, H * 0.55, 320);
  glow.addColorStop(0, "rgba(0,200,180,0.28)");
  glow.addColorStop(0.5, "rgba(0,180,160,0.10)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Emerald gem shape (octagonal, left-center)
  ctx.save();
  ctx.translate(280, 310);
  const gs = 2.0;
  const gemPts: [number, number][] = [
    [-40, -65], [40, -65], [65, -40], [65, 40],
    [40, 65], [-40, 65], [-65, 40], [-65, -40],
  ];

  // Gem fill — more visible
  const gemG = ctx.createLinearGradient(-120, -120, 120, 120);
  gemG.addColorStop(0, "rgba(0,200,180,0.22)");
  gemG.addColorStop(0.3, "rgba(0,240,220,0.14)");
  gemG.addColorStop(0.6, "rgba(0,180,160,0.18)");
  gemG.addColorStop(1, "rgba(0,160,140,0.08)");
  ctx.fillStyle = gemG;
  ctx.beginPath();
  gemPts.forEach(([px, py], i) => {
    i === 0 ? ctx.moveTo(px * gs, py * gs) : ctx.lineTo(px * gs, py * gs);
  });
  ctx.closePath();
  ctx.fill();

  // Gem outline
  ctx.strokeStyle = "rgba(0,220,200,0.45)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Facet lines — stronger
  ctx.strokeStyle = "rgba(0,200,180,0.25)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-40 * gs, -65 * gs);
  ctx.lineTo(40 * gs, 65 * gs);
  ctx.moveTo(40 * gs, -65 * gs);
  ctx.lineTo(-40 * gs, 65 * gs);
  ctx.moveTo(-65 * gs, 0);
  ctx.lineTo(65 * gs, 0);
  ctx.moveTo(0, -65 * gs);
  ctx.lineTo(0, 65 * gs);
  ctx.stroke();

  // Inner highlight for 3D effect
  const innerGlow = ctx.createRadialGradient(0, -20, 10, 0, -20, 80);
  innerGlow.addColorStop(0, "rgba(100,255,240,0.12)");
  innerGlow.addColorStop(1, "transparent");
  ctx.fillStyle = innerGlow;
  ctx.fillRect(-130, -130, 260, 260);

  ctx.restore();

  // ICICI Bank logo (orange dot + text)
  ctx.fillStyle = "#f26722";
  ctx.beginPath();
  ctx.arc(W - 130, 60, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 32px 'Space Grotesk', sans-serif";
  ctx.fillText("ICICI Bank", W - 280, 72);

  // "Emeralde Private" + contactless
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  ctx.font = "500 24px 'Space Grotesk', sans-serif";
  ctx.fillText("Emeralde", W - 240, 180);
  ctx.fillText("Private", W - 240, 210);
  drawContactless(ctx, W - 55, 195);

  // Chip
  drawChip(ctx, 80, 200);

  // Name
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "500 22px 'Space Grotesk', sans-serif";
  ctx.fillText("SIDDHARTH R", 80, H - 75);

  // Mastercard
  drawMastercard(ctx, W - 90, H - 78);

  return makeTexture(c);
}

/* ─── Axis Atlas (landscape 1024 x 640) ─────────────────────────── */

function buildAtlasTexture() {
  const W = 1024, H = 640;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // Pure black
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#080808");
  bg.addColorStop(0.5, "#0c0c0c");
  bg.addColorStop(1, "#050505");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Globe (circle + grid lines)
  ctx.save();
  ctx.translate(W * 0.58, H * 0.48);
  const gr = 155;

  // Globe outline
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, gr, 0, Math.PI * 2);
  ctx.stroke();

  // Latitude lines
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  for (let i = -2; i <= 2; i++) {
    const y = i * (gr / 3);
    const rx = Math.sqrt(gr * gr - y * y);
    ctx.beginPath();
    ctx.ellipse(0, y, rx, Math.abs(i) === 2 ? 4 : 8, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Longitude lines
  for (let i = 0; i < 5; i++) {
    const xr = gr * (0.15 + i * 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, xr, gr, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Red/pink landmass accents — more vivid
  ctx.fillStyle = "rgba(220,30,70,0.55)";
  ctx.beginPath();
  ctx.ellipse(45, -25, 55, 45, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(210,35,75,0.50)";
  ctx.beginPath();
  ctx.ellipse(-55, 30, 28, 50, -0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(200,40,80,0.48)";
  ctx.beginPath();
  ctx.ellipse(-110, -15, 35, 30, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // AXIS BANK logo (triangle + text)
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.beginPath();
  ctx.moveTo(65, 48);
  ctx.lineTo(95, 92);
  ctx.lineTo(35, 92);
  ctx.closePath();
  ctx.fill();
  ctx.font = "bold 32px 'Space Grotesk', sans-serif";
  ctx.fillText("AXIS BANK", 115, 85);

  // "ATLAS"
  ctx.font = "500 30px 'Space Grotesk', sans-serif";
  ctx.fillText("ATLAS", W - 180, 85);

  // Contactless
  drawContactless(ctx, W - 60, 68);

  // Chip
  drawChip(ctx, 80, 200);

  // Name
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "500 22px 'Space Grotesk', sans-serif";
  ctx.fillText("SIDDHARTH RAMAN", 80, H - 75);

  // VISA Signature
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "bold 38px 'Space Grotesk', sans-serif";
  ctx.fillText("VISA", W - 250, H - 78);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "400 18px 'Space Grotesk', sans-serif";
  ctx.fillText("Signature", W - 155, H - 52);

  return makeTexture(c);
}

/* ─── Constants ─────────────────────────────────────────────────── */

const CAROUSEL_RADIUS = 0.95;
const ANGLE_STEP = (2 * Math.PI) / 3; // 120 degrees

/* ─── Main Experience ───────────────────────────────────────────── */

export default function Experience({ progress }: ExperienceProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const card0Ref = useRef<THREE.Mesh>(null!);
  const card1Ref = useRef<THREE.Mesh>(null!);
  const card2Ref = useRef<THREE.Mesh>(null!);

  const textures = useMemo(() => {
    if (typeof document === "undefined") return { hsbc: null, emeralde: null, atlas: null };
    return {
      hsbc: buildHSBCTexture(),
      emeralde: buildEmeraldeTexture(),
      atlas: buildAtlasTexture(),
    };
  }, []);

  useEffect(() => {
    return () => {
      textures.hsbc?.dispose();
      textures.emeralde?.dispose();
      textures.atlas?.dispose();
    };
  }, [textures]);

  useFrame((state, delta) => {
    const t = clamp01(progress);

    // Phase breakpoints (shifted for header scroll region)
    const phaseB = clamp01((t - 0.18) / 0.28); // 18%-46%: rotate to Emeralde
    const phaseC = clamp01((t - 0.52) / 0.28); // 52%-80%: rotate to Atlas

    // Group rotation: 0 -> -120deg -> -240deg (clean circular)
    const targetRotY = -(phaseB + phaseC) * ANGLE_STEP;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      6,
      delta,
    );

    // Cards stay on a flat horizontal circle — no vertical displacement
    const refs = [card0Ref, card1Ref, card2Ref];
    refs.forEach((ref, i) => {
      const angle = i * ANGLE_STEP;
      const tx = Math.sin(angle) * CAROUSEL_RADIUS;
      const tz = Math.cos(angle) * CAROUSEL_RADIUS;

      ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, tx, 6, delta);
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, 0, 6, delta);
      ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, tz, 6, delta);
      ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, angle, 6, delta);
    });

    // Gentle hover
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.035;
  });

  // Shared physical material properties for premium shiny look
  const matProps = {
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    metalness: 0.25,
    roughness: 0.08,
    envMapIntensity: 1.3,
    color: "#ffffff" as const,
    side: THREE.DoubleSide as const,
  };

  // Initial positions (match first-frame useFrame targets)
  const initPos = (i: number): [number, number, number] => {
    const a = i * ANGLE_STEP;
    return [Math.sin(a) * CAROUSEL_RADIUS, 0, Math.cos(a) * CAROUSEL_RADIUS];
  };

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 5]} intensity={1.4} />
      <pointLight position={[-3, -1, 3]} intensity={0.5} color="#67e8f9" />
      <pointLight position={[2, 2, -2]} intensity={0.35} color="#a78bfa" />
      <spotLight position={[0, 5, 3]} angle={0.5} penumbra={0.6} intensity={0.55} />

      <group ref={groupRef}>
        {/* HSBC Premier (landscape card) */}
        <RoundedBox
          ref={card0Ref}
          args={[1.45, 0.92, 0.04]}
          radius={0.04}
          position={initPos(0)}
          rotation={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            map={textures.hsbc ?? undefined}
            {...matProps}
            emissive="#8b5cf6"
            emissiveIntensity={0.05}
          />
        </RoundedBox>

        {/* ICICI Emeralde Private (landscape card) */}
        <RoundedBox
          ref={card1Ref}
          args={[1.45, 0.92, 0.04]}
          radius={0.04}
          position={initPos(1)}
          rotation={[0, ANGLE_STEP, 0]}
        >
          <meshPhysicalMaterial
            map={textures.emeralde ?? undefined}
            {...matProps}
            emissive="#0d9488"
            emissiveIntensity={0.05}
          />
        </RoundedBox>

        {/* Axis Atlas (landscape card) */}
        <RoundedBox
          ref={card2Ref}
          args={[1.45, 0.92, 0.04]}
          radius={0.04}
          position={initPos(2)}
          rotation={[0, 2 * ANGLE_STEP, 0]}
        >
          <meshPhysicalMaterial
            map={textures.atlas ?? undefined}
            {...matProps}
            emissive="#dc2626"
            emissiveIntensity={0.04}
          />
        </RoundedBox>
      </group>

      <Environment preset="city" />
    </>
  );
}
