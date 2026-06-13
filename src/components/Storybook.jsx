import { useState } from 'react'

const PAGES = [
  { text: 'Once upon a time, in a city called Bangalore…', emoji: '🌆', page: 1 },
  {
    text: '…two people found each other, and built a beautiful life together.',
    emoji: '💑',
    page: 2,
  },
  { text: 'They laughed, they travelled, they dreamed…', emoji: '✨', page: 3 },
  {
    text: 'And then one day, the universe gave them the most magical gift of all…',
    emoji: '🌟',
    page: 4,
  },
  { text: 'But first… open this locket. 🔒', emoji: '', page: 5, isLast: true },
]

export default function Storybook({ onComplete }) {
  const [pageIdx, setPageIdx] = useState(0)
  const [flipState, setFlipState] = useState('idle') // idle | out | in | closing
  const [displayIdx, setDisplayIdx] = useState(0)

  const handleNext = () => {
    if (flipState !== 'idle') return
    if (pageIdx >= PAGES.length - 1) {
      setFlipState('closing')
      setTimeout(onComplete, 900)
      return
    }
    const next = pageIdx + 1
    setFlipState('out')
    setTimeout(() => {
      setDisplayIdx(next)
      setPageIdx(next)
      setFlipState('in')
      setTimeout(() => setFlipState('idle'), 420)
    }, 400)
  }

  const page = PAGES[displayIdx]
  const pageAnim =
    flipState === 'out'
      ? 'animate-page-out'
      : flipState === 'in'
        ? 'animate-page-in'
        : ''

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{
        opacity: flipState === 'closing' ? 0 : 1,
        transform: flipState === 'closing' ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      {/* Series title */}
      <div className="flex items-center gap-3 mb-8">
        <div style={{ height: 1, width: 40, background: '#C9A84C', opacity: 0.6 }} />
        <p
          className="font-lato text-xs tracking-[0.22em] uppercase"
          style={{ color: '#A8832A' }}
        >
          A Little Story
        </p>
        <div style={{ height: 1, width: 40, background: '#C9A84C', opacity: 0.6 }} />
      </div>

      {/* Book */}
      <div className="relative w-full" style={{ maxWidth: 460 }}>
        {/* Drop shadow layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            top: 10,
            left: 8,
            borderRadius: 20,
            background: 'rgba(100,60,10,0.22)',
            filter: 'blur(14px)',
            zIndex: 0,
          }}
        />

        {/* Outer book cover */}
        <div
          style={{
            position: 'relative',
            borderRadius: 18,
            padding: 6,
            background: 'linear-gradient(145deg, #7A4A1A 0%, #5C3410 50%, #3D2008 100%)',
            boxShadow:
              '0 2px 0 #A0621A inset, 0 -2px 0 #2A1204 inset, 4px 0 8px rgba(0,0,0,0.3)',
            zIndex: 1,
          }}
        >
          {/* Spine accent */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 6,
              bottom: 6,
              width: 14,
              borderRadius: '12px 0 0 12px',
              background: 'linear-gradient(90deg, #2A1204 0%, #4A2A0A 100%)',
              boxShadow: '2px 0 4px rgba(0,0,0,0.4)',
            }}
          />

          {/* Inner page */}
          <div
            style={{
              borderRadius: 13,
              overflow: 'hidden',
              background: '#F5ECD7',
              minHeight: 340,
              position: 'relative',
            }}
          >
            {/* Top decorative border */}
            <div
              style={{
                width: '100%',
                padding: '10px 0 6px',
                textAlign: 'center',
                borderBottom: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <span
                className="font-playfair"
                style={{ color: '#C9A84C', fontSize: 11, letterSpacing: '0.18em', opacity: 0.7 }}
              >
                ✦ &nbsp; Dev &amp; Priti &nbsp; ✦
              </span>
            </div>

            {/* Page content area */}
            <div
              className={pageAnim}
              style={{
                padding: '32px 36px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 270,
                textAlign: 'center',
              }}
            >
              {page.emoji && (
                <div style={{ fontSize: 56, marginBottom: 22, lineHeight: 1 }}>{page.emoji}</div>
              )}
              <p
                className="font-playfair"
                style={{
                  color: '#5C3410',
                  fontSize: 'clamp(17px, 4vw, 22px)',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                }}
              >
                {page.text}
              </p>
              {page.isLast && (
                <div
                  style={{
                    marginTop: 28,
                    fontSize: 46,
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  🔒
                </div>
              )}
            </div>

            {/* Bottom page footer */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '6px 0 8px',
                textAlign: 'center',
                borderTop: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <span
                className="font-lato"
                style={{ color: '#C9A84C', fontSize: 11, opacity: 0.6 }}
              >
                — {page.page} —
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center mt-8 gap-5">
        <button
          onClick={handleNext}
          disabled={flipState !== 'idle'}
          className="font-lato font-semibold tracking-widest text-xs uppercase
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            padding: '14px 36px',
            borderRadius: 50,
            background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #A8832A 100%)',
            color: '#3D2008',
            boxShadow: '0 4px 18px rgba(201,168,76,0.4), 0 1px 0 rgba(255,255,255,0.3) inset',
          }}
        >
          {pageIdx >= PAGES.length - 1 ? '✨ Open the Locket' : 'Next →'}
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {PAGES.map((_, i) => (
            <div
              key={i}
              style={{
                borderRadius: 999,
                transition: 'all 0.3s ease',
                width: i === pageIdx ? 24 : 8,
                height: 8,
                background: i === pageIdx ? '#C9A84C' : 'rgba(201,168,76,0.35)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
