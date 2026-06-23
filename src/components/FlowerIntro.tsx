import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PetalConfig {
  id: number
  angle: number        // rotation angle in degrees (position around center)
  exitX: number        // final x translation in vw
  exitY: number        // final y translation in vh
  exitRotate: number   // cumulative rotation during exit
  delay: number        // stagger delay for exit
  scaleX: number       // slight variation per petal
}

// ─── Petal SVG path — organic teardrop shape ─────────────────────────────────
// Drawn around origin (0,0) pointing upward, to be rotated into position
const PETAL_PATH =
  'M 0 -52 C 14 -38, 22 -18, 18 0 C 14 18, 6 30, 0 34 C -6 30, -14 18, -18 0 C -22 -18, -14 -38, 0 -52 Z'

// ─── Petal configs — 8 petals evenly distributed ─────────────────────────────
const PETALS: PetalConfig[] = [
  { id: 0, angle: 0,    exitX: 32,  exitY: 45,  exitRotate: 380,  delay: 0,    scaleX: 1 },
  { id: 1, angle: 45,   exitX: 44,  exitY: 42,  exitRotate: -320, delay: 0.08, scaleX: 0.95 },
  { id: 2, angle: 90,   exitX: 40,  exitY: 36,  exitRotate: 290,  delay: 0.16, scaleX: 1.02 },
  { id: 3, angle: 135,  exitX: 38,  exitY: 48,  exitRotate: -350, delay: 0.24, scaleX: 0.98 },
  { id: 4, angle: 180,  exitX: 35,  exitY: 40,  exitRotate: 310,  delay: 0.32, scaleX: 1 },
  { id: 5, angle: 225,  exitX: 42,  exitY: 44,  exitRotate: -280, delay: 0.40, scaleX: 0.97 },
  { id: 6, angle: 270,  exitX: 36,  exitY: 38,  exitRotate: 340,  delay: 0.48, scaleX: 1.03 },
  { id: 7, angle: 315,  exitX: 40,  exitY: 46,  exitRotate: -360, delay: 0.56, scaleX: 0.96 },
]

// ─── Duration constants ───────────────────────────────────────────────────────
// Phase 1 — flower blooms in (0 → 0.8s)
// Phase 2 — brief pause with subtle pulse (0.8s → 1.6s)
// Phase 3 — petals fly out staggered (1.6s → 2.8s)
// Phase 4 — core fades, background dissolves (2.8s → 3.5s)
const BLOOM_DURATION   = 0.7   // s — individual petal bloom
const PHASE2_START     = 1000  // ms — when petals start flying
const CORE_FADE_DELAY  = 0.65  // s after last petal exits
const BG_FADE_DELAY    = 0.85  // s after last petal exits

// ─── Single Petal ─────────────────────────────────────────────────────────────
function Petal({
  config,
  phase,
}: {
  config: PetalConfig
  phase: 'hidden' | 'bloom' | 'exit'
}) {
  const isExit = phase === 'exit'
  const isVisible = phase === 'bloom' || phase === 'exit'

  // Colours alternate between rose and sage tones
  const fills = [
    'rgba(212,165,165,0.88)',
    'rgba(222,175,170,0.84)',
    'rgba(200,155,160,0.86)',
    'rgba(225,178,172,0.82)',
    'rgba(157,191,143,0.30)',
    'rgba(212,165,165,0.78)',
    'rgba(218,170,165,0.85)',
    'rgba(205,160,155,0.88)',
  ]
  const fill = fills[config.id % fills.length]

  // Stroke — lighter version
  const strokes = [
    'rgba(212,165,165,0.40)',
    'rgba(212,165,165,0.35)',
    'rgba(200,155,160,0.38)',
    'rgba(212,165,165,0.32)',
    'rgba(157,191,143,0.25)',
    'rgba(212,165,165,0.30)',
    'rgba(212,165,165,0.38)',
    'rgba(205,160,155,0.40)',
  ]
  const stroke = strokes[config.id % strokes.length]

  return (
    <motion.g
      // Each petal is rotated into position around the flower center
      transform={`rotate(${config.angle})`}
      initial={{ opacity: 0, scaleY: 0, scaleX: 0 }}
      animate={
        isExit
          ? {
              // Fly toward bottom-right corner of screen
              // We use translateX/Y in the SVG space — large values push beyond viewport
              x: `${config.exitX}vw`,
              y: `${config.exitY}vh`,
              rotate: config.angle + config.exitRotate,
              opacity: 0,
              scaleX: config.scaleX * 0.6,
              scaleY: 0.6,
            }
          : isVisible
          ? {
              opacity: 1,
              scaleY: 1,
              scaleX: config.scaleX,
            }
          : {
              opacity: 0,
              scaleY: 0,
              scaleX: 0,
            }
      }
      transition={
        isExit
          ? {
              duration: 0.9,
              delay: config.delay,
              ease: [0.4, 0, 0.2, 1],
            }
          : {
              duration: BLOOM_DURATION,
              delay: config.id * 0.06,
              ease: [0.34, 1.56, 0.64, 1],
            }
      }
      style={{ originX: 0, originY: 0, transformOrigin: '0px 0px' }}
      aria-hidden="true"
    >
      {/* Petal shadow/depth layer */}
      <path
        d={PETAL_PATH}
        fill="rgba(180,140,140,0.12)"
        transform="translate(2, 3)"
      />
      {/* Petal body */}
      <path
        d={PETAL_PATH}
        fill={fill}
        stroke={stroke}
        strokeWidth="0.8"
      />
      {/* Central vein */}
      <line
        x1="0" y1="-48"
        x2="0" y2="28"
        stroke="rgba(255,248,243,0.35)"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </motion.g>
  )
}

// ─── Flower center / core ─────────────────────────────────────────────────────
function FlowerCore({ phase }: { phase: 'hidden' | 'bloom' | 'exit' | 'gone' }) {
  const visible = phase === 'bloom' || phase === 'exit'

  return (
    <motion.g aria-hidden="true">
      {/* Outer glow ring */}
      <motion.circle
        cx="0" cy="0" r="18"
        fill="rgba(212,165,165,0.15)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: visible ? 0.45 : 0, ease: 'easeOut' }}
        style={{ transformOrigin: '0px 0px' }}
      />
      {/* Core disc */}
      <motion.circle
        cx="0" cy="0" r="13"
        fill="#FFF8F3"
        stroke="rgba(212,165,165,0.6)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === 'gone'
            ? { scale: 0, opacity: 0 }
            : { scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }
        }
        transition={
          phase === 'gone'
            ? { duration: 0.4, ease: 'easeIn' }
            : { duration: 0.5, delay: visible ? 0.5 : 0, ease: [0.34, 1.56, 0.64, 1] }
        }
        style={{ transformOrigin: '0px 0px' }}
      />
      {/* Center detail — small stamens pattern */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={
          phase === 'gone'
            ? { opacity: 0, scale: 0 }
            : { opacity: visible ? 0.7 : 0, scale: visible ? 1 : 0 }
        }
        transition={
          phase === 'gone'
            ? { duration: 0.3, ease: 'easeIn' }
            : { duration: 0.4, delay: visible ? 0.65 : 0, ease: 'easeOut' }
        }
        style={{ transformOrigin: '0px 0px' }}
      >
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle
            key={a}
            cx={Math.cos((a * Math.PI) / 180) * 5.5}
            cy={Math.sin((a * Math.PI) / 180) * 5.5}
            r="1.4"
            fill="rgba(212,165,165,0.75)"
          />
        ))}
        <circle cx="0" cy="0" r="2" fill="rgba(157,191,143,0.9)" />
      </motion.g>
    </motion.g>
  )
}

// ─── FlowerIntro ──────────────────────────────────────────────────────────────
export default function FlowerIntro({ onDone }: { onDone: () => void }) {
  const shouldReduceMotion = useReducedMotion()

  const [phase, setPhase] = useState<'hidden' | 'bloom' | 'exit' | 'gone'>('hidden')
  const [bgVisible, setBgVisible] = useState(true)

  useEffect(() => {
    if (shouldReduceMotion) {
      onDone()
      return
    }

    // Small settle before bloom
    const t0 = setTimeout(() => setPhase('bloom'), 120)

    // After bloom + brief pause, petals fly out
    const t1 = setTimeout(() => setPhase('exit'), PHASE2_START)

    // Core fades after last petal leaves
    const lastPetalOut = PHASE2_START + (PETALS[PETALS.length - 1].delay * 1000) + 900
    const t2 = setTimeout(() => setPhase('gone'), lastPetalOut + CORE_FADE_DELAY * 1000)

    // Background dissolves
    const t3 = setTimeout(() => setBgVisible(false), lastPetalOut + BG_FADE_DELAY * 1000)

    // Signal parent
    const t4 = setTimeout(() => onDone(), lastPetalOut + 1300)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onDone, shouldReduceMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden"
      style={{
        // Warm cream background that mirrors the main site — not a jarring dark screen
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #FFF0E8 0%, #FFF8F3 55%, #F5E6E0 100%)',
      }}
      animate={{ opacity: bgVisible ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Animation d'ouverture"
      role="status"
      aria-live="polite"
    >
      {/* Subtle ambient ring decorations */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'min(70vw, 420px)',
          height: 'min(70vw, 420px)',
          border: '1px solid rgba(212,165,165,0.12)',
        }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: phase !== 'hidden' ? 1 : 0.6, opacity: phase !== 'hidden' ? 1 : 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 'min(50vw, 300px)',
          height: 'min(50vw, 300px)',
          border: '1px solid rgba(157,191,143,0.10)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: phase !== 'hidden' ? 1 : 0.5, opacity: phase !== 'hidden' ? 0.8 : 0 }}
        transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* ── Flower SVG ── */}
      <motion.svg
        viewBox="-120 -120 240 240"
        width="min(55vw, 320px)"
        height="min(55vw, 320px)"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
        // Gentle entrance scale for the whole flower
        initial={{ scale: 0.5 }}
        animate={{ scale: phase !== 'hidden' ? 1 : 0.5 }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Petals — rendered before core so core sits on top */}
        {/* 'gone' maps to 'exit' for Petal — petals have already flown away */}
        {PETALS.map((cfg) => (
          <Petal
            key={cfg.id}
            config={cfg}
            phase={phase === 'gone' ? 'exit' : phase}
          />
        ))}

        {/* Core — sits above petals */}
        <FlowerCore phase={phase} />
      </motion.svg>

      {/* ── Signature text ── */}
      <motion.div
        className="absolute"
        style={{ bottom: '28%' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: phase === 'bloom' ? 1 : 0,
          y: phase === 'bloom' ? 0 : 12,
        }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <p className="font-serif text-stone/35 text-sm tracking-[0.32em] uppercase select-none">
          Alicia Henneton
        </p>
      </motion.div>

      {/* Screen-reader only progress message */}
      <span className="sr-only">Chargement du portfolio en cours…</span>
    </motion.div>
  )
}
