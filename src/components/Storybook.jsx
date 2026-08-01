import { useState, useEffect, useRef, useCallback } from 'react'

const PAGES = [
  { text: 'Once upon a time, in a city called Bangalore…', emoji: '🌆' },
  { text: '…two people found each other, and built a beautiful life together.', emoji: '👫' },
  { text: 'They laughed, they travelled, they dreamed…', emoji: '✨' },
  { text: 'And then one day, the universe gave them the most magical gift of all…', emoji: '🌟' },
  { text: 'But first… open this locket.', emoji: '🔒' },
]

const TYPE_SPEED = 35 // ms per character
const EMOJI_DELAY = 320 // ms before typing starts
const FLIP_MS = 800
const FLIP_CLEANUP_MS = FLIP_MS + 120 // extra buffer: double-rAF starts transition ~100ms late
const PARCHMENT = '#F5ECD7'

export default function Storybook({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState('reading') // reading | flipping | closing
  const [leaving, setLeaving] = useState(null) // page index shown on flip front
  const [flipAngle, setFlipAngle] = useState(false)

  // typewriter
  const [emojiIn, setEmojiIn] = useState(false)
  const [typed, setTyped] = useState('')
  const [typedDone, setTypedDone] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const typeTimeout = useRef(null)
  const typeInterval = useRef(null)
  const cursorTimeout = useRef(null)

  const clearTimers = () => {
    clearTimeout(typeTimeout.current)
    clearInterval(typeInterval.current)
    clearTimeout(cursorTimeout.current)
  }

  // Drive the typewriter whenever a new page lands (current changes & not flipping)
  useEffect(() => {
    clearTimers()
    setTyped('')
    setTypedDone(false)
    setShowCursor(true)
    setEmojiIn(false)

    if (phase === 'flipping') return // wait until the flip completes

    const text = PAGES[current].text
    const raf = requestAnimationFrame(() => setEmojiIn(true))

    typeTimeout.current = setTimeout(() => {
      let i = 0
      typeInterval.current = setInterval(() => {
        i += 1
        setTyped(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(typeInterval.current)
          setTypedDone(true)
          cursorTimeout.current = setTimeout(() => setShowCursor(false), 1000)
        }
      }, TYPE_SPEED)
    }, EMOJI_DELAY)

    return () => {
      cancelAnimationFrame(raf)
      clearTimers()
    }
  }, [current, phase])

  const skipTyping = useCallback(() => {
    clearTimers()
    setTyped(PAGES[current].text)
    setEmojiIn(true)
    setTypedDone(true)
    setShowCursor(true)
    cursorTimeout.current = setTimeout(() => setShowCursor(false), 1000)
  }, [current])

  const startClosing = useCallback(() => {
    setPhase('closing')
    setTimeout(onComplete, 1500)
  }, [onComplete])

  const advance = useCallback(() => {
    if (phase !== 'reading') return
    if (!typedDone) {
      skipTyping()
      return
    }
    if (current >= PAGES.length - 1) {
      startClosing()
      return
    }
    setLeaving(current)
    setPhase('flipping')
    setFlipAngle(false)
    setCurrent((c) => c + 1)
    // Double rAF: first ensures the element mounts and paints at 0deg,
    // second triggers the CSS transition from 0deg → 180deg
    requestAnimationFrame(() => requestAnimationFrame(() => setFlipAngle(true)))
    setTimeout(() => {
      setPhase('reading')
      setLeaving(null)
      setFlipAngle(false)
    }, FLIP_CLEANUP_MS)
  }, [phase, typedDone, current, skipTyping, startClosing])

  // Lightweight swipe-left to advance (mobile)
  const touchX = useRef(null)
  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -40) advance()
    touchX.current = null
  }

  const isLast = current === PAGES.length - 1

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{
        opacity: phase === 'closing' ? 0 : 1,
        transform: phase === 'closing' ? 'scale(0.9)' : 'scale(1)',
        transition: 'opacity 0.6s ease 0.7s, transform 0.6s ease 0.7s',
      }}
    >
      <style>{`
        @keyframes sbBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes sbCurl { 0%{opacity:0;transform:scaleX(0)} 20%{opacity:0.4} 60%{opacity:0.4} 100%{opacity:0;transform:scaleX(1)} }
        @keyframes sbLock { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        @keyframes sbTabBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
      `}</style>

      {/* Series title */}
      <div className="flex items-center gap-3 mb-7">
        <div style={{ height: 1, width: 40, background: '#C9A84C', opacity: 0.6 }} />
        <p className="font-lato text-xs tracking-[0.22em] uppercase" style={{ color: '#A8832A' }}>
          A Little Story
        </p>
        <div style={{ height: 1, width: 40, background: '#C9A84C', opacity: 0.6 }} />
      </div>

      {/* Book */}
      <div
        className="relative w-full"
        style={{ maxWidth: 440, cursor: phase === 'reading' ? 'pointer' : 'default' }}
        onClick={advance}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="button"
        aria-label={typedDone ? 'Turn the page' : 'Skip animation'}
      >
        {/* Drop shadow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            top: 12,
            left: 8,
            borderRadius: 20,
            background: 'rgba(100,60,10,0.22)',
            filter: 'blur(16px)',
            zIndex: 0,
          }}
        />

        {/* Cover */}
        <div
          style={{
            position: 'relative',
            borderRadius: 18,
            padding: 6,
            background: 'linear-gradient(145deg, #7A4A1A 0%, #5C3410 50%, #3D2008 100%)',
            boxShadow: '0 2px 0 #A0621A inset, 0 -2px 0 #2A1204 inset, 4px 0 8px rgba(0,0,0,0.3)',
            zIndex: 1,
          }}
        >
          {/* Spine */}
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
              zIndex: 9,
            }}
          />

          {/* Page */}
          <div
            style={{
              borderRadius: 13,
              overflow: 'hidden',
              background: PARCHMENT,
              position: 'relative',
            }}
          >
            {/* Header band */}
            <div
              style={{
                width: '100%',
                padding: '11px 0 8px',
                textAlign: 'center',
                borderBottom: '1px solid #C9A84C',
                position: 'relative',
                zIndex: 2,
                background: PARCHMENT,
              }}
            >
              <span className="font-playfair" style={{ fontSize: 13, letterSpacing: '0.18em', fontWeight: 600 }}>
                <span style={{ color: '#C9A84C' }}>✦</span>
                <span style={{ color: '#3B1F0A', textShadow: '0px 1px 2px rgba(0,0,0,0.15)', margin: '0 10px' }}>
                  Dev &amp; Priti
                </span>
                <span style={{ color: '#C9A84C' }}>✦</span>
              </span>
            </div>

            {/* Content box (this is what flips) */}
            <div style={{ position: 'relative', minHeight: 280 }}>
              {/* Underlying current page */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  padding: '30px 34px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    marginBottom: 22,
                    lineHeight: 1,
                    transform: emojiIn ? 'scale(1)' : 'scale(0)',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    animation: isLast && typedDone ? 'sbLock 2s ease-in-out infinite' : 'none',
                  }}
                >
                  {PAGES[current].emoji}
                </div>
                <p
                  className="font-playfair"
                  style={{
                    color: '#5C3410',
                    fontSize: 'clamp(17px, 4vw, 22px)',
                    lineHeight: 1.65,
                    fontStyle: 'italic',
                    minHeight: '3.3em',
                  }}
                >
                  {typed}
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1.05em',
                      background: '#C9A84C',
                      marginLeft: 3,
                      verticalAlign: 'text-bottom',
                      opacity: showCursor ? 1 : 0,
                      animation: 'sbBlink 1s step-end infinite',
                    }}
                  />
                </p>
              </div>

              {/* Flip overlay (leaving page turns left over the spine) */}
              {phase === 'flipping' && leaving != null && (
                <div style={{ position: 'absolute', inset: 0, perspective: 900, zIndex: 6, pointerEvents: 'none' }}>
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'left center',
                      transition: `transform ${FLIP_MS}ms ease`,
                      transform: flipAngle ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front: the page being turned away (full text) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: PARCHMENT,
                        padding: '30px 34px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: 56, marginBottom: 22, lineHeight: 1 }}>{PAGES[leaving].emoji}</div>
                      <p
                        className="font-playfair"
                        style={{ color: '#5C3410', fontSize: 'clamp(17px, 4vw, 22px)', lineHeight: 1.65, fontStyle: 'italic' }}
                      >
                        {PAGES[leaving].text}
                      </p>
                      {/* Fold shadow: right edge darkens as the page lifts */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(270deg, rgba(60,30,0,0.3) 0%, rgba(60,30,0,0) 50%)',
                          animation: `sbCurl ${FLIP_MS}ms ease-in-out forwards`,
                          transformOrigin: 'right center',
                        }}
                      />
                    </div>
                    {/* Back: blank parchment */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: PARCHMENT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span className="font-playfair" style={{ color: '#C9A84C', fontSize: 40, opacity: 0.18 }}>
                        ❧
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer page number */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                padding: '6px 0 8px',
                textAlign: 'center',
                borderTop: '1px solid rgba(201,168,76,0.3)',
                background: PARCHMENT,
              }}
            >
              <span className="font-lato" style={{ color: '#C9A84C', fontSize: 11, opacity: 0.6 }}>
                — {current + 1} —
              </span>
            </div>

            {/* Closing cover */}
            <div style={{ position: 'absolute', inset: 0, perspective: 1600, zIndex: 12, pointerEvents: 'none' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'left center',
                  transition: `transform ${FLIP_MS}ms ease-in`,
                  transform: phase === 'closing' ? 'rotateY(0deg)' : 'rotateY(-180deg)', // cover sweeps from behind (negative) to flat
                  background: 'linear-gradient(145deg, #7A4A1A 0%, #5C3410 50%, #3D2008 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <span
                  className="font-playfair"
                  style={{ color: '#E8C96A', fontSize: 16, letterSpacing: '0.18em', fontWeight: 600, opacity: 0.85 }}
                >
                  ✦ Dev &amp; Priti ✦
                </span>
              </div>
            </div>
          </div>

          {/* Gold bookmark tab */}
          {phase === 'reading' && (
            <div
              onClick={(e) => {
                e.stopPropagation()
                advance()
              }}
              style={{
                position: 'absolute',
                top: 30,
                right: -6,
                width: 30,
                height: 64,
                background: 'linear-gradient(135deg, #E8C96A 0%, #C9A84C 55%, #A8832A 100%)',
                borderRadius: '4px 4px 4px 4px',
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                zIndex: 11,
                animation: typedDone ? 'sbTabBob 1.6s ease-in-out infinite' : 'none',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 8,
                pointerEvents: 'auto',
              }}
              aria-label="Next page"
            >
              <span style={{ color: '#3D2008', fontSize: 14, fontWeight: 700 }}>›</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mt-7">
        {PAGES.map((_, i) => (
          <div
            key={i}
            style={{
              borderRadius: 999,
              transition: 'all 0.3s ease',
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.35)',
            }}
          />
        ))}
      </div>

      {/* Hint */}
      <p
        className="font-lato"
        style={{
          marginTop: 14,
          fontSize: 11,
          letterSpacing: '0.08em',
          color: '#A8832A',
          opacity: phase === 'reading' ? 0.7 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {isLast && typedDone ? 'tap to open the locket ✨' : typedDone ? 'tap anywhere to turn the page' : 'tap to skip'}
      </p>
    </div>
  )
}
