import { useEffect, useMemo, useRef } from "react";
import { Environment, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ExperienceProps {
  progress: number;
}

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

function buildCardTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 1024, 640);
  bg.addColorStop(0, "#0b1226");
  bg.addColorStop(0.48, "#0f2941");
  bg.addColorStop(1, "#180f2a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 640);

  const glow = ctx.createRadialGradient(760, 420, 40, 760, 420, 340);
  glow.addColorStop(0, "rgba(56,189,248,0.65)");
  glow.addColorStop(1, "rgba(56,189,248,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 640);

  const stripe = ctx.createLinearGradient(150, 90, 900, 560);
  stripe.addColorStop(0, "rgba(56,189,248,0.35)");
  stripe.addColorStop(0.5, "rgba(59,130,246,0.1)");
  stripe.addColorStop(1, "rgba(244,114,182,0.25)");
  ctx.strokeStyle = stripe;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(120, 140);
  ctx.bezierCurveTo(280, 20, 560, 320, 920, 130);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = "600 48px Sora, sans-serif";
  ctx.fillText("Card Optimizer", 88, 130);

  ctx.fillStyle = "rgba(148,163,184,0.95)";
  ctx.font = "500 24px Sora, sans-serif";
  ctx.fillText("Decision Intelligence", 90, 174);

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 3;
  ctx.strokeRect(88, 238, 270, 180);

  ctx.fillStyle = "rgba(250,204,21,0.85)";
  ctx.fillRect(114, 266, 98, 72);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "500 22px Sora, sans-serif";
  ctx.fillText("•••• 8842", 88, 500);
  ctx.fillText("ONLINE / UPI / OFFLINE", 88, 540);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export default function Experience({ progress }: ExperienceProps) {
  const cardRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    return buildCardTexture();
  }, []);

  useEffect(() => {
    return () => {
      if (cardTexture) cardTexture.dispose();
    };
  }, [cardTexture]);

  useFrame((state, delta) => {
    const t = clamp01(progress);

    const phaseEvaluate = clamp01((t - 0.33) / 0.34);
    const phaseChoose = clamp01((t - 0.67) / 0.33);

    const targetRotX = -THREE.MathUtils.degToRad(34) * phaseEvaluate;
    const targetRotY = Math.PI * phaseChoose;
    const targetPosY = Math.sin(state.clock.elapsedTime * 1.1) * 0.05 * (1 - phaseEvaluate * 0.72);

    cardRef.current.rotation.x = THREE.MathUtils.damp(cardRef.current.rotation.x, targetRotX, 7, delta);
    cardRef.current.rotation.y = THREE.MathUtils.damp(cardRef.current.rotation.y, targetRotY, 7, delta);
    cardRef.current.position.y = THREE.MathUtils.damp(cardRef.current.position.y, targetPosY, 7, delta);

    const glowIntensity = 0.06 + phaseEvaluate * 0.5 + phaseChoose * 0.22;
    materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
      materialRef.current.emissiveIntensity,
      glowIntensity,
      7,
      delta,
    );
  });

  return (
    <>
      <ambientLight intensity={0.34} />
      <directionalLight position={[2.4, 2.8, 3.8]} intensity={1.2} />
      <pointLight position={[-2.6, -1.2, 2.6]} intensity={0.42} color="#67e8f9" />

      <RoundedBox ref={cardRef} args={[1.9, 1.2, 0.08]} radius={0.06} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#d9fcff"
          transmission={1}
          roughness={0.2}
          thickness={1.4}
          ior={1.18}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.1}
          map={cardTexture ?? undefined}
          emissive="#38bdf8"
          emissiveIntensity={0.06}
        />
      </RoundedBox>

      <Environment preset="city" />
    </>
  );
}
