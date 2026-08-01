import { useState } from 'react'
import confetti from 'canvas-confetti'
import couplePhoto from '../assets/couple.png'

function fireSoftConfetti() {
  const colors = ['#C9A84C', '#E8B4B8', '#ffffff']
  confetti({
    particleCount: 70,
    spread: 70,
    startVelocity: 32,
    origin: { x: 0.5, y: 0.55 },
    colors,
    scalar: 0.9,
    gravity: 0.9,
    ticks: 180,
  })
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 55,
      startVelocity: 24,
      origin: { x: 0.5, y: 0.5 },
      colors,
      scalar: 0.8,
      ticks: 160,
    })
  }, 220)
}

export default function PhotoReveal() {
  const [flipped, setFlipped] = useState(false)

  const handleFlip = () => {
    if (flipped) return
    setFlipped(true)
    setTimeout(fireSoftConfetti, 350)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
      }}
    >
      {/* Flip container */}
      <div
        onClick={handleFlip}
        role="button"
        aria-label="Reveal the photo"
        style={{
          width: '100%',
          maxWidth: 280,
          cursor: flipped ? 'default' : 'pointer',
          perspective: 1200,
        }}
        className={flipped ? '' : 'animate-bob'}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            // keep both faces same height via aspect padding wrapper
          }}
        >
          {/* ── FRONT: frosted teaser ── */}
          <div
            style={{
              position: 'relative',
              top: 0,
              left: 0,
              width: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg) rotate(-2deg)',
              background: '#FFFFFF',
              padding: '12px 12px 40px',
              borderRadius: 6,
              boxShadow: '0 14px 32px rgba(60,35,10,0.28)',
            }}
          >
            {/* Frosted photo area */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 3,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #e8e2d4 0%, #d8cfbb 100%)',
              }}
            >
              {/* blurred photo peeking through frost */}
              <img
                src={couplePhoto}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(14px) saturate(1.1)',
                  transform: 'scale(1.1)',
                  opacity: 0.65,
                }}
              />
              {/* frost wash */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(2px)',
                }}
              />
              {/* shimmer sweep */}
              <div
                className="animate-shimmer"
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '60%',
                  background:
                    'linear-gradient(120deg, rgba(255,255,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
                }}
              />
              {/* overlay text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 16,
                }}
              >
                <span
                  className="font-caveat"
                  style={{
                    color: '#5C3410',
                    fontSize: 26,
                    fontWeight: 700,
                    textShadow: '0 1px 3px rgba(255,255,255,0.6)',
                  }}
                >
                  our little secret… 🤫
                </span>
              </div>
            </div>
          </div>

          {/* ── BACK: actual photo ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) rotate(-2deg)',
              background: '#FFFFFF',
              padding: '12px 12px 40px',
              borderRadius: 6,
              boxShadow: '0 14px 32px rgba(60,35,10,0.28)',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 3,
                overflow: 'hidden',
                background: '#000',
              }}
            >
              <img
                src={couplePhoto}
                alt="Dev and Priti holding the pregnancy test"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* polaroid caption */}
            <div style={{ textAlign: 'center', paddingTop: 8 }}>
              <span
                className="font-caveat"
                style={{ color: '#5C3410', fontSize: 22, fontWeight: 600 }}
              >
                Mar 2027 💛
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption / hint below */}
      {!flipped && (
        <p
          className="font-playfair animate-fade-in"
          style={{
            color: '#A8832A',
            fontStyle: 'italic',
            fontSize: 13,
            marginTop: 18,
            textAlign: 'center',
          }}
        >
          tap to reveal the moment we found out 📸
        </p>
      )}
    </div>
  )
}
