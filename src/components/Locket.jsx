import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const BABY_DATE = new Date('2027-02-01')
const daysAway = Math.ceil((BABY_DATE - new Date()) / (1000 * 60 * 60 * 24))

function fireConfetti() {
  const colors = ['#C9A84C', '#F4B8C1', '#8FAF8A', '#F5ECD7', '#ffffff', '#E8C96A']
  const end = Date.now() + 3200

  const burst = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 58,
      origin: { x: 0 },
      colors,
      scalar: 1.1,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 58,
      origin: { x: 1 },
      colors,
      scalar: 1.1,
    })
    if (Date.now() < end) requestAnimationFrame(burst)
  }
  burst()
}

export default function Locket() {
  const [isOpen, setIsOpen] = useState(false)
  const [showInner, setShowInner] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    fireConfetti()
    setTimeout(() => setShowInner(true), 650)
    setTimeout(() => setShowMessage(true), 1400)
  }

  return (
    <div
      className={`flex flex-col items-center px-4 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Pre-open tagline */}
      {!isOpen && (
        <p className="font-playfair text-amber-700 text-lg sm:text-xl italic text-center mb-8 animate-fade-in">
          Something precious is waiting inside… 💛
        </p>
      )}

      {/* Chain + Locket */}
      <div className="flex flex-col items-center">
        {/* Chain SVG */}
        <svg
          width="80"
          height="44"
          viewBox="0 0 80 44"
          fill="none"
          className="mb-0 drop-shadow-sm"
        >
          <path
            d="M40 0 C38 8, 28 12, 22 22 C16 32, 10 38, 8 44"
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M40 0 C42 8, 52 12, 58 22 C64 32, 70 38, 72 44"
            stroke="#C9A84C"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Chain links */}
          {[8, 18, 28].map((y) => (
            <ellipse
              key={y}
              cx={40 - y * 0.38}
              cy={y + 2}
              rx="4"
              ry="2.5"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="none"
              transform={`rotate(-25 ${40 - y * 0.38} ${y + 2})`}
            />
          ))}
          {[8, 18, 28].map((y) => (
            <ellipse
              key={`r${y}`}
              cx={40 + y * 0.38}
              cy={y + 2}
              rx="4"
              ry="2.5"
              stroke="#C9A84C"
              strokeWidth="1.5"
              fill="none"
              transform={`rotate(25 ${40 + y * 0.38} ${y + 2})`}
            />
          ))}
        </svg>

        {/* Locket body */}
        <div
          onClick={handleOpen}
          className={`relative select-none ${isOpen ? '' : 'cursor-pointer animate-pulse-glow'}`}
          style={{ width: 190, height: 230 }}
          role="button"
          aria-label="Open the locket"
        >
          {/* Outer glow ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -6,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(201,168,76,0.18) 0%, transparent 70%)',
            }}
          />

          {/* Bottom half — always visible */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b-full"
            style={{
              height: '50%',
              background: 'linear-gradient(160deg, #C9A84C 0%, #A07828 60%, #8B6410 100%)',
              boxShadow: '0 8px 24px rgba(139,100,16,0.45)',
            }}
          />

          {/* Inner content — revealed when open */}
          {showInner && (
            <div
              className="absolute inset-2 rounded-full flex flex-col items-center justify-center text-center px-4 animate-fade-in"
              style={{
                background: 'radial-gradient(ellipse at 40% 35%, #FFF8EC 0%, #F5ECD7 100%)',
                boxShadow: 'inset 0 2px 10px rgba(201,168,76,0.25)',
                zIndex: 5,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 5 }}>🍼</div>
              <p
                className="font-playfair"
                style={{
                  color: '#7B4F1A',
                  fontSize: 14,
                  fontWeight: 700,
                  lineHeight: 1.45,
                  marginBottom: 6,
                }}
              >
                Dev &amp; Priti<br />are expecting!
              </p>
              <p
                className="font-lato"
                style={{ color: '#A8832A', fontSize: 11, lineHeight: 1.4, marginBottom: 8 }}
              >
                Baby arrives<br />February 2027
              </p>
              <div
                className="rounded-full px-3 py-1"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #A8832A)' }}
              >
                <span className="font-lato font-bold" style={{ color: '#FFF8EC', fontSize: 10 }}>
                  {daysAway} days away! 🎉
                </span>
              </div>
            </div>
          )}

          {/* Top half — hinges open */}
          <div
            className="absolute top-0 left-0 right-0 rounded-t-full"
            style={{
              height: '50%',
              background: 'linear-gradient(145deg, #E8C96A 0%, #C9A84C 55%, #A8832A 100%)',
              transformOrigin: 'bottom center',
              transform: isOpen ? 'rotateX(-165deg)' : 'rotateX(0deg)',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 10,
              boxShadow: '0 -3px 12px rgba(201,168,76,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: 600,
            }}
          >
            {/* Heart on locket front */}
            <svg width="52" height="52" viewBox="0 0 52 52" style={{ opacity: 0.55 }}>
              <path
                d="M26 42 C26 42, 5 28, 5 16 C5 9.5, 10 4, 17 4 C21.5 4, 24.5 6.5, 26 9 C27.5 6.5, 30.5 4, 35 4 C42 4, 47 9.5, 47 16 C47 28, 26 42, 26 42Z"
                fill="#FFF8EC"
              />
            </svg>
          </div>

          {/* Locket clasp */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: '50%',
              width: 12,
              height: 10,
              background: '#A8832A',
              borderRadius: 3,
              zIndex: 11,
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          />

          {/* Tap hint */}
          {!isOpen && (
            <div
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-lato text-amber-500 text-xs animate-pulse"
            >
              tap to open ✨
            </div>
          )}
        </div>
      </div>

      {/* Love message — fades in after reveal */}
      {showMessage && (
        <div className="mt-16 text-center max-w-xs animate-fade-in-up">
          <p className="font-playfair text-amber-800 text-lg sm:text-xl italic leading-relaxed">
            "We can't wait for you to meet them."
          </p>
          <p className="font-lato text-amber-600 mt-3 text-sm tracking-wide">
            With all our love ❤️ — Dev &amp; Priti
          </p>
        </div>
      )}
    </div>
  )
}
