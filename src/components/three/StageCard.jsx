import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, RoundedBox } from "@react-three/drei";
import { MathUtils, SRGBColorSpace, TextureLoader } from "three";

const PI = Math.PI;
const NAV_PX = 78;
const BOUNDS = [100, 420, 640, 840];
const FADE_ZONE = 28;

const smooth = (a, b, x) => {
  const t = MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const DESKTOP = [
  [0, { fx: 0.4, fy: 0, s: 1.05 }],
  [960, { fx: 0.4, fy: 0, s: 1.05 }],
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

function topAt(tops, vh) {
  let i = 0;
  while (i < BOUNDS.length && vh >= BOUNDS[i]) i += 1;
  const cur = tops[i];
  const next = tops[Math.min(i + 1, tops.length - 1)];
  const b = BOUNDS[i];
  if (b === undefined || cur === undefined) return cur ?? 0;
  return cur + ((next ?? cur) - cur) * smooth(b - FADE_ZONE, b, vh);
}

function flipAt(vh) {
  if (vh <= 840) return PI * smooth(640, 690, vh);
  return PI * (1 - smooth(850, 890, vh));
}

function CardMesh({ texture, back, setRef }) {
  return (
    <group ref={setRef}>
      <RoundedBox args={[1.6, 1.0, 0.03]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial color="#15151c" metalness={0.9} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0165]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshPhysicalMaterial map={texture} alphaToCoverage roughness={0.34} metalness={0.12} clearcoat={1} clearcoatRoughness={0.14} />
      </mesh>
      <mesh position={[0, 0, -0.0165]} rotation={[0, PI, 0]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshPhysicalMaterial map={back} alphaToCoverage roughness={0.4} metalness={0.2} clearcoat={0.6} clearcoatRoughness={0.2} />
      </mesh>
    </group>
  );
}

function Deck({ stateRef, winners, urls, pickRange, onReady }) {
  const root = useRef(null);
  const cards = useRef([null, null, null]);
  const cur = useRef([0, 1, 2].map((i) => ({ x: 0, y: 0, z: 0, s: i === 0 ? 1 : 0.001, rz: 0 })));
  const smoothVh = useRef(0);
  const order = useRef([0, 1, 2]);
  const lastWinner = useRef(0);
  const all = useLoader(TextureLoader, [...urls, "/cards/card-back.webp"]);
  const viewport = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);

  useEffect(() => {
    all.forEach((tex) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = 16;
    });
  }, [all]);

  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    smoothVh.current = MathUtils.damp(smoothVh.current, stateRef.current.vh, 7, d);
    const vh = smoothVh.current;
    const mobile = size.width < 1024;
    const pose = poseAt(DESKTOP, vh);
    const perPx = viewport.height / size.height;
    if (mobile) {
      const tops = stateRef.current.tops;
      const textTop = tops.every((v) => v > 0) ? topAt(tops, vh) : size.height * 0.55;
      const free = Math.max(textTop - NAV_PX - 28, 60);
      pose.s = Math.min(free * 0.9 * perPx, (size.width * 0.8 * perPx) / 1.6);
      pose.fx = 0;
      pose.fy = ((size.height / 2 - (NAV_PX + free / 2 + 6)) * perPx) / (viewport.height / 2);
    }

    const g = root.current;
    if (!g) return;
    g.position.x = pose.fx * (viewport.width / 2);
    g.position.y = pose.fy * (viewport.height / 2);
    g.scale.setScalar(pose.s);
    g.rotation.x = (mobile ? 0.04 : 0.07) - state.pointer.y * 0.025;
    g.rotation.y = (mobile ? 0 : -0.14) + flipAt(vh) + state.pointer.x * 0.035;

    const [ps, pe] = pickRange;
    const inPick = vh > ps - 20 && vh < pe + 20;
    const winner = inPick ? winners[stateRef.current.step] : 0;
    const deck = smooth(110, 140, vh) * (1 - smooth(405, 435, vh));

    if (winner !== lastWinner.current) {
      const o = order.current;
      const at = o.indexOf(winner);
      const prev = o[0];
      o[0] = winner;
      o[at] = prev;
      cur.current[prev].x = -0.32;
      cur.current[prev].z = 0.12;
      lastWinner.current = winner;
    }

    for (let c = 0; c < 3; c += 1) {
      const rank = order.current.indexOf(c);
      let tx = 0;
      let ty = 0;
      let tz = 0;
      let ts = 0.001;
      let trz = 0;
      if (rank === 0) {
        tz = 0.04 * deck;
        ts = 1;
      } else {
        ty = 0.17 * rank * deck;
        tz = -0.1 * rank * deck;
        ts = Math.max(0.001, 1 - 0.07 * rank) * deck;
        trz = (rank === 1 ? 0.035 : -0.035) * deck;
      }
      const cs = cur.current[c];
      cs.x = MathUtils.damp(cs.x, tx, 9, d);
      cs.y = MathUtils.damp(cs.y, ty, 9, d);
      cs.z = MathUtils.damp(cs.z, tz, 9, d);
      cs.s = MathUtils.damp(cs.s, ts, 9, d);
      cs.rz = MathUtils.damp(cs.rz, trz, 9, d);
      const node = cards.current[c];
      if (node) {
        node.position.set(cs.x, cs.y, cs.z);
        node.scale.setScalar(cs.s);
        node.rotation.z = cs.rz;
        node.visible = cs.s > 0.01;
      }
    }
  });

  const back = all[urls.length];
  return (
    <group ref={root}>
      {urls.map((u, idx) => (
        <CardMesh
          key={u}
          texture={all[idx]}
          back={back}
          setRef={(node) => {
            cards.current[idx] = node;
          }}
        />
      ))}
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
      <Deck stateRef={stateRef} winners={winners} urls={urls} pickRange={pickRange} onReady={onReady} />
      <Environment files="/hdr/city.hdr" />
    </Canvas>
  );
}
