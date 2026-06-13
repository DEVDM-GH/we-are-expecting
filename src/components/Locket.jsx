import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import PhotoReveal from './PhotoReveal'

const BABY_DATE = new Date('2027-02-01')
const daysAway = Math.ceil((BABY_DATE - new Date()) / (1000 * 60 * 60 * 24))

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

export default function Locket() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
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
    fireConfetti()
    setTimeout(() => setShowContent(true), 700)
    setTimeout(() => setShowMessage(true), 1600)
    setTimeout(() => setShowPhoto(true), 2600)
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
            maxWidth: 300,
          }}
        >
          Something precious is waiting inside… 💛
        </p>
      )}

      {/* ── Locket ── */}
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
        }}
      >
        {/* Chain */}
        <svg width="100" height="52" viewBox="0 0 100 52" fill="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8C96A" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#A8832A" />
            </linearGradient>
          </defs>
          {/* Left side */}
          <path
            d="M50 2 C46 12, 36 18, 28 28 C20 38, 12 44, 8 52"
            stroke="url(#chainGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right side */}
          <path
            d="M50 2 C54 12, 64 18, 72 28 C80 38, 88 44, 92 52"
            stroke="url(#chainGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left chain links */}
          {[[44, 10], [36, 20], [26, 32], [15, 44]].map(([cx, cy], i) => (
            <ellipse
              key={`l${i}`}
              cx={cx}
              cy={cy}
              rx="4.5"
              ry="2.5"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="none"
              transform={`rotate(-35 ${cx} ${cy})`}
            />
          ))}
          {/* Right chain links */}
          {[[56, 10], [64, 20], [74, 32], [85, 44]].map(([cx, cy], i) => (
            <ellipse
              key={`r${i}`}
              cx={cx}
              cy={cy}
              rx="4.5"
              ry="2.5"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="none"
              transform={`rotate(35 ${cx} ${cy})`}
            />
          ))}
        </svg>

        {/* Locket body */}
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 240,
            animation: isOpen ? 'none' : 'pulseGlow 2s ease-in-out infinite',
          }}
        >
          <style>{`
            @keyframes pulseGlow {
              0%, 100% { filter: drop-shadow(0 0 12px rgba(201,168,76,0.4)); }
              50% { filter: drop-shadow(0 0 28px rgba(201,168,76,0.75)); }
            }
            @keyframes shimmer {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>

          {/* SVG Locket */}
          <svg
            viewBox="0 0 200 240"
            width="200"
            height="240"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <defs>
              <linearGradient id="locketBot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" />
                <stop offset="45%" stopColor="#A8832A" />
                <stop offset="100%" stopColor="#7A5510" />
              </linearGradient>
              <linearGradient id="locketTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0D878" />
                <stop offset="40%" stopColor="#E8C96A" />
                <stop offset="100%" stopColor="#C9A84C" />
              </linearGradient>
              <linearGradient id="locketEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F0D878" />
                <stop offset="100%" stopColor="#8B6414" />
              </linearGradient>
              <radialGradient id="innerGlow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FFF8EC" />
                <stop offset="100%" stopColor="#F5ECD7" />
              </radialGradient>
              <clipPath id="locketShape">
                <ellipse cx="100" cy="130" rx="82" ry="100" />
              </clipPath>
              <clipPath id="topHalfClip">
                <rect x="0" y="0" width="200" height="130" />
              </clipPath>
            </defs>

            {/* Locket ring at top */}
            <ellipse cx="100" cy="18" rx="10" ry="14" fill="none" stroke="url(#locketEdge)" strokeWidth="5" />
            <ellipse cx="100" cy="18" rx="6" ry="10" fill="none" stroke="url(#locketEdge)" strokeWidth="2" />

            {/* Locket body bottom half */}
            <ellipse cx="100" cy="130" rx="82" ry="100" fill="url(#locketBot)" />
            {/* Subtle edge highlight */}
            <ellipse cx="100" cy="130" rx="82" ry="100" fill="none" stroke="url(#locketEdge)" strokeWidth="3" />

            {/* Inner content (shown when open) */}
            {showContent && (
              <g>
                <ellipse cx="100" cy="130" rx="70" ry="88" fill="url(#innerGlow)" />
                <ellipse cx="100" cy="130" rx="70" ry="88" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
              </g>
            )}

            {/* Heart (visible on closed locket front) */}
            {!showContent && (
              <g opacity="0.45" transform="translate(100,125) scale(0.9)">
                <path
                  d="M0 14 C0 14, -24 2, -24 -12 C-24 -22, -16 -28, -8 -28 C-3 -28, 0 -24, 0 -20 C0 -24, 3 -28, 8 -28 C16 -28, 24 -22, 24 -12 C24 2, 0 14, 0 14Z"
                  fill="#FFF8EC"
                />
              </g>
            )}

            {/* Locket top half — hinges open */}
            <g
              style={{
                transformOrigin: '100px 130px',
                transform: isOpen ? 'rotateX(170deg)' : 'rotateX(0deg)',
                transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ellipse cx="100" cy="130" rx="82" ry="100" fill="url(#locketTop)" clipPath="url(#topHalfClip)" />
              {/* Engrave detail lines */}
              <ellipse cx="100" cy="130" rx="68" ry="86" fill="none" stroke="#E8C96A" strokeWidth="1" opacity="0.4" clipPath="url(#topHalfClip)" />
              <ellipse cx="100" cy="130" rx="82" ry="100" fill="none" stroke="url(#locketEdge)" strokeWidth="3" clipPath="url(#topHalfClip)" />
              {/* Heart on top */}
              <g opacity="0.5" transform="translate(100,108) scale(0.85)" clipPath="url(#topHalfClip)">
                <path
                  d="M0 14 C0 14, -24 2, -24 -12 C-24 -22, -16 -28, -8 -28 C-3 -28, 0 -24, 0 -20 C0 -24, 3 -28, 8 -28 C16 -28, 24 -22, 24 -12 C24 2, 0 14, 0 14Z"
                  fill="#FFF8EC"
                />
              </g>
            </g>

            {/* Clasp */}
            <rect x="92" y="126" width="16" height="8" rx="4" fill="#A8832A" stroke="#C9A84C" strokeWidth="1" />
          </svg>

          {/* Text overlay inside open locket */}
          {showContent && (
            <div
              className="animate-fade-in"
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                width: 138,
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 4 }}>🍼</div>
              <p
                className="font-playfair"
                style={{ color: '#5C3410', fontSize: 14, fontWeight: 700, lineHeight: 1.45, marginBottom: 5 }}
              >
                Dev &amp; Priti<br />are expecting!
              </p>
              <p
                className="font-lato"
                style={{ color: '#A8832A', fontSize: 10.5, lineHeight: 1.4, marginBottom: 8 }}
              >
                Baby arrives<br />February 2027
              </p>
              <div
                style={{
                  display: 'inline-block',
                  borderRadius: 20,
                  padding: '3px 10px',
                  background: 'linear-gradient(135deg, #C9A84C, #A8832A)',
                }}
              >
                <span className="font-lato font-bold" style={{ color: '#FFF8EC', fontSize: 10 }}>
                  {daysAway} days! 🎉
                </span>
              </div>
            </div>
          )}

          {/* Tap hint */}
          {!isOpen && (
            <div
              className="font-lato animate-pulse"
              style={{
                position: 'absolute',
                bottom: -32,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                color: '#A8832A',
                fontSize: 12,
                letterSpacing: '0.08em',
              }}
            >
              tap to open ✨
            </div>
          )}
        </div>
      </div>

      {/* Love message */}
      {showMessage && (
        <div
          className="animate-fade-in-up"
          style={{ marginTop: 64, textAlign: 'center', maxWidth: 320 }}
        >
          <div style={{ color: '#C9A84C', fontSize: 22, marginBottom: 10 }}>❤️</div>
          <p
            className="font-playfair"
            style={{
              color: '#5C3410',
              fontSize: 'clamp(16px, 4vw, 20px)',
              fontStyle: 'italic',
              lineHeight: 1.65,
              marginBottom: 10,
            }}
          >
            "We can't wait for you to meet them."
          </p>
          <p
            className="font-lato"
            style={{ color: '#A8832A', fontSize: 13, letterSpacing: '0.06em' }}
          >
            With all our love — Dev &amp; Priti
          </p>
        </div>
      )}

      {/* Photo reveal — fades in after the love note */}
      {showPhoto && (
        <div className="animate-fade-in-up" style={{ width: '100%' }}>
          <PhotoReveal />
        </div>
      )}
    </div>
  )
}
