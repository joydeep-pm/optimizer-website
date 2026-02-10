import { useRef } from "react";
import { Box, Environment, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function clamp01(value: number) {
  return THREE.MathUtils.clamp(value, 0, 1);
}

export default function Experience() {
  const cardRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const scroll = useScroll();

  useFrame((state, delta) => {
    const t = scroll.offset;

    const phaseEvaluate = clamp01((t - 0.33) / 0.34);
    const phaseChoose = clamp01((t - 0.67) / 0.33);

    const targetRotX = -THREE.MathUtils.degToRad(45) * phaseEvaluate;
    const targetRotY = Math.PI * phaseChoose;
    const targetPosY = Math.sin(state.clock.elapsedTime * 1.2) * 0.08 * (1 - phaseEvaluate * 0.75);

    cardRef.current.rotation.x = THREE.MathUtils.damp(cardRef.current.rotation.x, targetRotX, 7, delta);
    cardRef.current.rotation.y = THREE.MathUtils.damp(cardRef.current.rotation.y, targetRotY, 7, delta);
    cardRef.current.position.y = THREE.MathUtils.damp(cardRef.current.position.y, targetPosY, 7, delta);

    const glowIntensity = 0.07 + phaseEvaluate * 0.72 + phaseChoose * 0.24;
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
      <directionalLight position={[2.8, 3, 4]} intensity={1.35} />
      <pointLight position={[-3.5, -1.3, 3]} intensity={0.65} color="#67e8f9" />

      <group position={[0, 0, 0]}>
        <Box ref={cardRef} args={[2.45, 1.55, 0.09]} castShadow receiveShadow>
          <meshPhysicalMaterial
            ref={materialRef}
            color="#b2f5ff"
            transmission={1}
            roughness={0.2}
            thickness={2}
            ior={1.18}
            metalness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissive="#38bdf8"
            emissiveIntensity={0.08}
          />
        </Box>

        <Box args={[2.55, 1.63, 0.02]} position={[0, 0, -0.09]}>
          <meshStandardMaterial color="#060c1d" transparent opacity={0.55} />
        </Box>
      </group>

      <Environment preset="city" />
    </>
  );
}
