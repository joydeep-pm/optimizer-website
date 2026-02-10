import { useEffect, useMemo, useRef } from "react";
import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { carouselCards } from "../../content/siteContent";

interface ExperienceProps {
  progress: number;
}

function clamp01(v: number) {
  return THREE.MathUtils.clamp(v, 0, 1);
}

function configureTexture(texture: THREE.Texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
}

function buildFallbackTexture(label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = ctx.createLinearGradient(0, 0, 1024, 640);
  bg.addColorStop(0, "#111827");
  bg.addColorStop(0.6, "#0f172a");
  bg.addColorStop(1, "#020617");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 640);

  const glow = ctx.createRadialGradient(760, 420, 20, 760, 420, 340);
  glow.addColorStop(0, "rgba(56,189,248,0.45)");
  glow.addColorStop(1, "rgba(56,189,248,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1024, 640);

  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, 940, 556);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "600 54px Sora, sans-serif";
  ctx.fillText(label, 78, 328);

  const tex = new THREE.CanvasTexture(canvas);
  configureTexture(tex);
  return tex;
}

function loadTextureWithFallback(url: string, label: string) {
  const fallback = buildFallbackTexture(label);
  if (!fallback) return null;

  if (!url) return fallback;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    fallback.image = img;
    fallback.needsUpdate = true;
  };
  img.onerror = () => {
    // keep fallback texture silently
  };
  img.src = url;

  return fallback;
}

function buildNoiseNormalMap(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const nx = (Math.random() - 0.5) * 0.18;
    const ny = (Math.random() - 0.5) * 0.18;
    const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

    data[i] = Math.round((nx * 0.5 + 0.5) * 255);
    data[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
    data[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
    data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 5);
  tex.needsUpdate = true;
  return tex;
}

const CAROUSEL_RADIUS = 0.95;
const ANGLE_STEP = (2 * Math.PI) / 3; // 120 degrees

export default function Experience({ progress }: ExperienceProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const card0Ref = useRef<THREE.Mesh>(null!);
  const card1Ref = useRef<THREE.Mesh>(null!);
  const card2Ref = useRef<THREE.Mesh>(null!);

  const cards = useMemo(() => {
    const defaults = [
      { id: "hsbc", name: "HSBC Premier", textureUrl: "", edgeColor: "#cfd4dd" },
      { id: "icici", name: "ICICI Emeralde", textureUrl: "", edgeColor: "#c8a258" },
      { id: "axis", name: "Axis Atlas", textureUrl: "", edgeColor: "#949aa4" },
    ];

    const merged = defaults.map((item, index) => ({
      ...item,
      ...(carouselCards[index] ?? {}),
    }));

    return merged.slice(0, 3);
  }, []);

  const textures = useMemo(() => {
    if (typeof document === "undefined") return [null, null, null] as const;
    return cards.map((item) => loadTextureWithFallback(item.textureUrl, item.name)) as [
      THREE.Texture | null,
      THREE.Texture | null,
      THREE.Texture | null,
    ];
  }, [cards]);

  const noiseNormalMap = useMemo(() => {
    if (typeof document === "undefined") return null;
    return buildNoiseNormalMap(256);
  }, []);

  useEffect(() => {
    return () => {
      textures.forEach((tex) => tex?.dispose());
      noiseNormalMap?.dispose();
    };
  }, [textures, noiseNormalMap]);

  useFrame((state, delta) => {
    const t = clamp01(progress);

    // Phase breakpoints (shifted for header scroll region)
    const phaseB = clamp01((t - 0.18) / 0.28); // 18%-46%: rotate to card 2
    const phaseC = clamp01((t - 0.52) / 0.28); // 52%-80%: rotate to card 3

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

  const faceMaterialProps = {
    metalness: 0.72,
    roughness: 0.24,
    envMapIntensity: 1.4,
    clearcoat: 0.35,
    clearcoatRoughness: 0.14,
    color: "#ffffff" as const,
    normalMap: noiseNormalMap ?? undefined,
    normalScale: new THREE.Vector2(0.08, 0.08),
  };

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
        {cards.map((card, index) => {
          const ref = index === 0 ? card0Ref : index === 1 ? card1Ref : card2Ref;
          const texture = textures[index] ?? undefined;

          return (
            <mesh
              key={card.id}
              ref={ref}
              position={initPos(index)}
              rotation={[0, index * ANGLE_STEP, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1.45, 0.92, 0.055]} />
              <meshPhysicalMaterial attach="material-0" color={card.edgeColor} metalness={0.85} roughness={0.28} />
              <meshPhysicalMaterial attach="material-1" color={card.edgeColor} metalness={0.85} roughness={0.28} />
              <meshPhysicalMaterial attach="material-2" color={card.edgeColor} metalness={0.85} roughness={0.28} />
              <meshPhysicalMaterial attach="material-3" color={card.edgeColor} metalness={0.85} roughness={0.28} />
              <meshPhysicalMaterial attach="material-4" map={texture} {...faceMaterialProps} />
              <meshPhysicalMaterial attach="material-5" map={texture} {...faceMaterialProps} />
            </mesh>
          );
        })}
      </group>

      <Environment preset="city" />
    </>
  );
}
