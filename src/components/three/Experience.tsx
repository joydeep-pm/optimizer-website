import { useRef } from "react";
import { Environment, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ExperienceProps {
  progress: number;
}

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

export default function Experience({ progress }: ExperienceProps) {
  const cardRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);

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
      <ambientLight intensity={0.35} />
      <directionalLight position={[2.4, 2.8, 3.8]} intensity={1.2} />
      <pointLight position={[-2.6, -1.2, 2.6]} intensity={0.42} color="#67e8f9" />

      <RoundedBox ref={cardRef} args={[1.9, 1.2, 0.08]} radius={0.06} castShadow receiveShadow>
        <meshPhysicalMaterial
          ref={materialRef}
          color="#b2f5ff"
          transmission={1}
          roughness={0.2}
          thickness={1.4}
          ior={1.18}
          metalness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#38bdf8"
          emissiveIntensity={0.06}
        />
      </RoundedBox>

      <Environment preset="city" />
    </>
  );
}
