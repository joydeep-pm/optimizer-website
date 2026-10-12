import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { MathUtils, SRGBColorSpace, TextureLoader } from "three";

const PI = Math.PI;
const smooth = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const DESKTOP = [
  [0, { fx: 0.46, fy: 0, s: 1.1, rx: 0.15, ry: -0.55, rz: 0.06 }],
  [100, { fx: 0.46, fy: 0, s: 1.1, rx: 0.1, ry: -0.35, rz: 0 }],
  [150, { fx: 0.46, fy: 0, s: 1.1, rx: 0, ry: 0, rz: 0 }],
  [420, { fx: 0.46, fy: 0, s: 1.1, rx: 0, ry: 0, rz: 0 }],
  [490, { fx: 0.46, fy: 0.02, s: 1.05, rx: 0.05, ry: -0.2, rz: 0 }],
  [640, { fx: 0.46, fy: 0.02, s: 1.05, rx: 0.05, ry: -0.2, rz: 0 }],
  [710, { fx: -0.46, fy: 0, s: 1.0, rx: 0.05, ry: PI - 0.35, rz: -0.08 }],
  [840, { fx: -0.46, fy: 0, s: 1.0, rx: 0.05, ry: PI - 0.35, rz: -0.08 }],
  [910, { fx: 0.5, fy: 0.02, s: 1.15, rx: 0.05, ry: 2 * PI, rz: 0 }],
  [960, { fx: 0.5, fy: 0.02, s: 1.15, rx: 0.05, ry: 2 * PI, rz: 0 }],
];

const MOBILE = [
  [0, { fx: 0, fy: 0.42, s: 0.5, rx: 0.15, ry: -0.5, rz: 0.04 }],
  [100, { fx: 0, fy: 0.42, s: 0.5, rx: 0.1, ry: -0.3, rz: 0 }],
  [150, { fx: 0, fy: 0.3, s: 0.58, rx: 0, ry: 0, rz: 0 }],
  [420, { fx: 0, fy: 0.3, s: 0.58, rx: 0, ry: 0, rz: 0 }],
  [490, { fx: 0, fy: 0.28, s: 0.56, rx: 0.05, ry: 0, rz: 0 }],
  [640, { fx: 0, fy: 0.28, s: 0.56, rx: 0.05, ry: 0, rz: 0 }],
  [710, { fx: 0, fy: 0.3, s: 0.55, rx: 0.05, ry: PI - 0.35, rz: -0.06 }],
  [840, { fx: 0, fy: 0.3, s: 0.55, rx: 0.05, ry: PI - 0.35, rz: -0.06 }],
  [910, { fx: 0, fy: 0.25, s: 0.62, rx: 0.05, ry: 2 * PI, rz: 0 }],
  [960, { fx: 0, fy: 0.25, s: 0.62, rx: 0.05, ry: 2 * PI, rz: 0 }],
];

function poseAt(table, vh) {
  if (vh <= table[0][0]) return { ...table[0][1] };
  for (let i = 0; i < table.length - 1; i += 1) {
    const [a, pa] = table[i];
    const [b, pb] = table[i + 1];
    if (vh <= b) {
      const t = smooth(a, b, vh);
      const out = {};
      Object.keys(pa).forEach((k) => {
        out[k] = pa[k] + (pb[k] - pa[k]) * t;
      });
      return out;
    }
  }
  return { ...table[table.length - 1][1] };
}

function Card({ stateRef, winners, urls, pickRange, onReady }) {
  const group = useRef(null);
  const front = useRef(null);
  const smoothVh = useRef(0);
  const smoothP = useRef(0);
  const textures = useLoader(TextureLoader, urls);
  const viewport = useThree((s) => s.viewport);
  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = 16;
    });
  }, [textures]);

  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    smoothVh.current = MathUtils.damp(smoothVh.current, stateRef.current.vh, 7, d);
    const vh = smoothVh.current;
    const mobile = viewport.width / viewport.height < 0.9;
    const pose = poseAt(mobile ? MOBILE : DESKTOP, vh);

    const [ps, pe] = pickRange;
    const n = winners.length - 1;
    const rawP = MathUtils.clamp(((vh - ps) / (pe - ps)) * n, 0, n);
    smoothP.current = MathUtils.damp(smoothP.current, rawP, 5, d);
    const p = smoothP.current;
    const i = Math.min(Math.floor(p), n);
    const f = i >= n ? 0 : p - i;
    const t = smooth(0.4, 1, f);
    const inPick = vh > ps - 20 && vh < pe + 20;
    const showing = inPick ? (t < 0.5 ? i : Math.min(i + 1, n)) : vh >= pe + 20 ? n : 0;
    const tex = textures[winners[showing]];
    if (front.current && front.current.map !== tex) {
      front.current.map = tex;
      front.current.needsUpdate = true;
    }
    const spin = inPick ? t * PI * 2 : 0;

    const g = group.current;
    if (!g) return;
    const time = state.clock.elapsedTime;
    const idle = vh > 900 ? time * 0.35 : 0;
    g.position.x = pose.fx * (viewport.width / 2);
    g.position.y = pose.fy * (viewport.height / 2) + Math.sin(time * 1.1) * 0.035 + Math.sin(t * PI) * (inPick ? 0.1 : 0);
    g.scale.setScalar(pose.s + (inPick ? Math.sin(t * PI) * 0.06 : 0));
    g.rotation.x = pose.rx - state.pointer.y * 0.2 + Math.sin(time * 0.8) * 0.025;
    g.rotation.y = pose.ry + spin + idle + state.pointer.x * 0.3;
    g.rotation.z = pose.rz + (inPick ? Math.sin(t * PI) * -0.1 : 0);
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
          alphaToCoverage
          roughness={0.32}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0, -0.0165]} rotation={[0, PI, 0]}>
        <planeGeometry args={[1.58, 0.98]} />
        <meshPhysicalMaterial color="#0d0d12" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.27, -0.0172]} rotation={[0, PI, 0]}>
        <planeGeometry args={[1.58, 0.18]} />
        <meshStandardMaterial color="#040406" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[-0.2, -0.1, -0.0172]} rotation={[0, PI, 0]}>
        <planeGeometry args={[0.95, 0.13]} />
        <meshStandardMaterial color="#8c52ff" metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function StageCard({ stateRef, winners, urls, pickRange, onReady, active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 3, 5]} intensity={1.3} />
      <pointLight position={[-3, -1, 3]} intensity={0.6} color="#c4b0ff" />
      <Card stateRef={stateRef} winners={winners} urls={urls} pickRange={pickRange} onReady={onReady} />
      <Environment files="/hdr/city.hdr" />
    </Canvas>
  );
}
