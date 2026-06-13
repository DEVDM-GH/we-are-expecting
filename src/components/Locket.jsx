import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import PhotoReveal from './PhotoReveal'

const BABY_DATE = new Date('2027-02-01')
const daysAway = Math.ceil((BABY_DATE - new Date()) / (1000 * 60 * 60 * 24))

// Locket dimensions
const W = 320
const H = 380
const HALF_H = H / 2 // 190 — half height for the lid

function fireConfetti() {
  const colors = ['#C9A84C', '#F4B8C1', '#8FAF8A', '#FFF8EC', '#ffffff', '#E8C96A']
  const end = Date.now() + 3500
  const burst = () => {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors, scalar: 1.2 })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors, scalar: 1.2 })
    if (Date.now() < end) requestAnimationFrame(burst)
  }
  burst()
}

// Helper: fade a content step in with a transition
function FadeStep({ show, children, style }) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function GoldDivider() {
  return (
    <div
      style={{
        width: '60%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
        margin: '10px auto',
      }}
    />
  )
}

export default function Locket() {
  const [isOpen, setIsOpen] = useState(false)
  const [contentStep, setContentStep] = useState(0) // 0=hidden, 1=emoji, 2=names, 3=expecting, 4=divider2, 5=date, 6=badge
  const [showMessage, setShowMessage] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    // confetti 400ms after open
    setTimeout(fireConfetti, 400)
    // staggered content reveal (lid animation is 800ms, start content after lid lifts)
    setTimeout(() => setContentStep(1), 860)
    setTimeout(() => setContentStep(2), 1060)
    setTimeout(() => setContentStep(3), 1260)
    setTimeout(() => setContentStep(4), 1460)
    setTimeout(() => setContentStep(5), 1660)
    setTimeout(() => setContentStep(6), 1860)
    // love note outside the locket
    setTimeout(() => setShowMessage(true), 2200)
    // photo section
    setTimeout(() => setShowPhoto(true), 3300)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        width: '100%',
      }}
    >
      {/* Pre-open tagline */}
      {!isOpen && (
        <p
          className="font-playfair animate-fade-in"
          style={{
            color: '#7B4F1A',
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: 36,
            maxWidth: 320,
          }}
        >
          Something precious is waiting inside… 💛
        </p>
      )}

      {/* ── Chain + Locket ── */}
      <div
        onClick={handleOpen}
        role="button"
        aria-label="Open the locket"
        style={{
          cursor: isOpen ? 'default' : 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          userSelect: 'none',
          width: '100%',
          maxWidth: W,
        }}
      >
        {/* Chain SVG — wider to match larger locket */}
        <svg
          width={W}
          height="60"
          viewBox={`0 0 ${W} 60`}
          fill="none"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="chainGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8C96A" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#A8832A" />
            </linearGradient>
          </defs>
          <path
            d={`M${W / 2} 2 C${W / 2 - 8} 16, ${W / 2 - 30} 24, ${W / 2 - 50} 38 C${W / 2 - 66} 50, ${W / 2 - 76} 56, ${W / 2 - 80} 60`}
            stroke="url(#chainGrad2)" strokeWidth="2.8" strokeLinecap="round" fill="none"
          />
          <path
            d={`M${W / 2} 2 C${W / 2 + 8} 16, ${W / 2 + 30} 24, ${W / 2 + 50} 38 C${W / 2 + 66} 50, ${W / 2 + 76} 56, ${W / 2 + 80} 60`}
            stroke="url(#chainGrad2)" strokeWidth="2.8" strokeLinecap="round" fill="none"
          />
          {/* Left links */}
          {[[W/2-12,14],[W/2-26,26],[W/2-44,40],[W/2-60,54]].map(([cx,cy],i)=>(
            <ellipse key={`l${i}`} cx={cx} cy={cy} rx="5" ry="2.8" stroke="#C9A84C" strokeWidth="1.5" fill="none" transform={`rotate(-35 ${cx} ${cy})`} />
          ))}
          {/* Right links */}
          {[[W/2+12,14],[W/2+26,26],[W/2+44,40],[W/2+60,54]].map(([cx,cy],i)=>(
            <ellipse key={`r${i}`} cx={cx} cy={cy} rx="5" ry="2.8" stroke="#C9A84C" strokeWidth="1.5" fill="none" transform={`rotate(35 ${cx} ${cy})`} />
          ))}
        </svg>

        {/* Locket ring (connection between chain and body) */}
        <div
          style={{
            width: 26,
            height: 18,
            borderRadius: '50%',
            border: '4px solid #C9A84C',
            background: 'linear-gradient(180deg, #E8C96A, #A8832A)',
            marginBottom: -4,
            zIndex: 12,
            position: 'relative',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />

        {/* Locket body — perspective wrapper */}
        <div
          style={{
            position: 'relative',
            width: W,
            perspective: 1400,
            animation: isOpen ? 'none' : 'locketPulse 2.2s ease-in-out infinite',
          }}
        >
          <style>{`
            @keyframes locketPulse {
              0%,100% { filter: drop-shadow(0 0 14px rgba(201,168,76,0.35)); }
              50%      { filter: drop-shadow(0 0 32px rgba(201,168,76,0.7)); }
            }
          `}</style>

          {/* Inner content area — full oval, always rendered */}
          <div
            style={{
              width: W,
              height: H,
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at 45% 35%, #FFFBF0 0%, #FDF6E3 60%, #F7EDD0 100%)',
              border: '6px solid',
              borderColor: '#C9A84C',
              boxShadow: 'inset 0 0 40px rgba(201,168,76,0.18), 0 10px 30px rgba(100,60,10,0.28)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 36px',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Inner glow ring */}
            <div
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.35)',
                pointerEvents: 'none',
              }}
            />

            {/* ── Reveal content (staggered) ── */}

            {/* 1. Emoji */}
            <FadeStep show={contentStep >= 1} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: '2.5rem', lineHeight: 1 }}>🍼</div>
            </FadeStep>

            {/* 2. Divider + Names */}
            <FadeStep show={contentStep >= 2}>
              <GoldDivider />
              <p
                className="font-playfair"
                style={{
                  color: '#3B1F0A',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Dev &amp; Priti
              </p>
            </FadeStep>

            {/* 3. "are expecting!" */}
            <FadeStep show={contentStep >= 3} style={{ marginBottom: 4 }}>
              <p
                className="font-playfair"
                style={{
                  color: '#C9A84C',
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                }}
              >
                are expecting!
              </p>
            </FadeStep>

            {/* 4. Second divider */}
            <FadeStep show={contentStep >= 4}>
              <GoldDivider />
            </FadeStep>

            {/* 5. Baby date */}
            <FadeStep show={contentStep >= 5} style={{ marginBottom: 12 }}>
              <p
                className="font-lato"
                style={{ color: '#8B6020', fontSize: '0.85rem', marginBottom: 3 }}
              >
                Baby arrives
              </p>
              <p
                className="font-playfair"
                style={{ color: '#3B1F0A', fontSize: '1.2rem', fontWeight: 600 }}
              >
                February 2027
              </p>
            </FadeStep>

            {/* 6. Days badge */}
            <FadeStep show={contentStep >= 6}>
              <div
                style={{
                  display: 'inline-block',
                  background: '#C9A84C',
                  borderRadius: 999,
                  padding: '8px 22px',
                  boxShadow: '0 3px 10px rgba(201,168,76,0.45)',
                }}
              >
                <span
                  className="font-lato"
                  style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}
                >
                  ✨ {daysAway} days to go!
                </span>
              </div>
            </FadeStep>

            {/* Closed-state heart (only visible when shut) */}
            {contentStep === 0 && (
              <div style={{ opacity: 0.35 }}>
                <svg width="70" height="65" viewBox="0 0 70 65">
                  <path
                    d="M35 58 C35 58, 5 38, 5 20 C5 10, 13 3, 22 3 C28 3, 33 6, 35 10 C37 6, 42 3, 48 3 C57 3, 65 10, 65 20 C65 38, 35 58, 35 58Z"
                    fill="#C9A84C"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Lid — top half that rotates open */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: W,
              height: HALF_H,
              background: 'linear-gradient(145deg, #F2DC7A 0%, #E8C96A 35%, #C9A84C 70%, #A07830 100%)',
              borderRadius: `${W / 2}px ${W / 2}px 0 0 / ${HALF_H}px ${HALF_H}px 0 0`,
              transformOrigin: 'center bottom',
              transform: isOpen ? `rotateX(130deg)` : 'rotateX(0deg)',
              transition: 'transform 0.8s ease-in-out',
              zIndex: 10,
              boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.3), 0 -3px 10px rgba(201,168,76,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Inner engraving ring */}
            <div
              style={{
                position: 'absolute',
                inset: 10,
                borderRadius: `${W / 2 - 10}px ${W / 2 - 10}px 0 0 / ${HALF_H - 10}px ${HALF_H - 10}px 0 0`,
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            />
            {/* Heart on lid */}
            <svg width="68" height="62" viewBox="0 0 68 62" style={{ opacity: 0.5, marginTop: 20 }}>
              <path
                d="M34 56 C34 56, 4 36, 4 18 C4 8, 12 2, 21 2 C27 2, 31 5, 34 9 C37 5, 41 2, 47 2 C56 2, 64 8, 64 18 C64 36, 34 56, 34 56Z"
                fill="#FFF8EC"
              />
            </svg>
            {/* Clasp at bottom of lid */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 22,
                height: 9,
                background: '#A07830',
                borderRadius: '4px 4px 0 0',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)',
              }}
            />
          </div>

          {/* Tap hint */}
          {!isOpen && (
            <div
              className="font-lato animate-pulse"
              style={{
                position: 'absolute',
                bottom: -38,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                color: '#A8832A',
                fontSize: 13,
                letterSpacing: '0.08em',
              }}
            >
              tap to open ✨
            </div>
          )}
        </div>
      </div>

      {/* ── Love note — outside the locket, below it ── */}
      {showMessage && (
        <div
          className="animate-fade-in-up"
          style={{ marginTop: 52, textAlign: 'center', maxWidth: 320 }}
        >
          <p
            className="font-playfair"
            style={{
              color: '#3B1F0A',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              lineHeight: 1.65,
              marginBottom: 8,
            }}
          >
            "We can't wait for you to meet them."
          </p>
          <p
            className="font-lato"
            style={{ color: '#C9A84C', fontSize: 13, letterSpacing: '0.06em' }}
          >
            With all our love — Dev &amp; Priti
          </p>
        </div>
      )}

      {/* ── Photo reveal ── */}
      {showPhoto && (
        <div className="animate-fade-in-up" style={{ width: '100%' }}>
          <PhotoReveal />
        </div>
      )}
    </div>
  )
}
