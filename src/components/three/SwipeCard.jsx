import { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { SRGBColorSpace, TextureLoader, MathUtils } from "three";

const smooth = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function Card({ progressRef, winners, urls }) {
  const group = useRef(null);
  const front = useRef(null);
  const textures = useLoader(TextureLoader, urls);
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = 8;
    });
  }, [textures]);

  useFrame((state) => {
    const p = progressRef.current;
    const last = winners.length - 1;
    const i = Math.min(Math.floor(p), last);
    const f = i >= last ? 0 : p - i;
    const t = smooth(0.4, 1, f);
    const showing = t < 0.5 ? i : Math.min(i + 1, last);
    const tex = textures[winners[showing]];
    if (front.current && front.current.map !== tex) {
      front.current.map = tex;
      front.current.needsUpdate = true;
    }
    const g = group.current;
    if (!g) return;
    const time = state.clock.elapsedTime;
    g.rotation.y = t * Math.PI * 2 + state.pointer.x * 0.35;
    g.rotation.x = -state.pointer.y * 0.25 + Math.sin(time * 0.8) * 0.03;
    g.rotation.z = Math.sin(t * Math.PI) * -0.12;
    g.position.y = Math.sin(time * 1.1) * 0.04 + Math.sin(t * Math.PI) * 0.12;
    g.scale.setScalar(1.22 + Math.sin(t * Math.PI) * 0.08);
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.6, 1.0, 0.03]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial color="#15151c" metalness={0.9} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0165]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshPhysicalMaterial
          ref={front}
          map={textures[winners[0]]}
          transparent
          roughness={0.32}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0, -0.0165]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.58, 0.98]} />
        <meshPhysicalMaterial color="#0d0d12" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.27, -0.0172]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1.58, 0.18]} />
        <meshStandardMaterial color="#040406" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[-0.2, -0.1, -0.0172]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.95, 0.13]} />
        <meshStandardMaterial color="#8c52ff" metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function SwipeCard({ progressRef, winners, urls }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.6], fov: 38 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 5]} intensity={1.3} />
      <pointLight position={[-3, -1, 3]} intensity={0.6} color="#c4b0ff" />
      <Card progressRef={progressRef} winners={winners} urls={urls} />
      <Environment files="/hdr/city.hdr" />
    </Canvas>
  );
}
