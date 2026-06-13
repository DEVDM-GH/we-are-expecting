import { useState } from 'react'

const PAGES = [
  {
    text: 'Once upon a time, in a city called Bangalore…',
    emoji: '🌆',
    page: 1,
  },
  {
    text: '…two people found each other, and built a beautiful life together.',
    emoji: '💑',
    page: 2,
  },
  {
    text: 'They laughed, they travelled, they dreamed…',
    emoji: '✨',
    page: 3,
  },
  {
    text: 'And then one day, the universe gave them the most magical gift of all…',
    emoji: '🌟',
    page: 4,
  },
  {
    text: 'But first… open this locket.',
    emoji: '🔒',
    page: 5,
    isLast: true,
  },
]

// flip states: idle | out | in | closing
export default function Storybook({ onComplete }) {
  const [pageIdx, setPageIdx] = useState(0)
  const [flipState, setFlipState] = useState('idle')
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
      setTimeout(() => setFlipState('idle'), 400)
    }, 380)
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
      className={`flex flex-col items-center transition-all duration-800 ${
        flipState === 'closing' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{ transition: 'opacity 0.9s ease, transform 0.9s ease' }}
    >
      {/* Title */}
      <h1 className="font-playfair text-amber-800 text-2xl sm:text-3xl mb-6 italic text-center">
        A Little Story…
      </h1>

      {/* Book */}
      <div
        className="relative w-full rounded-2xl shadow-2xl overflow-visible"
        style={{ maxWidth: 560 }}
      >
        {/* Book shadow */}
        <div
          className="absolute rounded-2xl"
          style={{
            inset: 0,
            top: 6,
            left: 4,
            background: 'rgba(92,61,30,0.25)',
            filter: 'blur(8px)',
            zIndex: 0,
          }}
        />

        {/* Book cover */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: '#5C3D1E', zIndex: 1 }}
        >
          {/* Decorative cover top strip */}
          <div
            className="w-full flex items-center justify-center py-2"
            style={{ background: '#3D2710' }}
          >
            <span className="font-playfair text-amber-300 text-xs tracking-widest uppercase opacity-70">
              ✦ Our Story ✦
            </span>
          </div>

          {/* Pages */}
          <div className="flex" style={{ minHeight: 300 }}>
            {/* Left page — decorative */}
            <div
              className="w-5/12 flex flex-col items-center justify-center p-6"
              style={{ background: '#F5ECD7', borderRight: '1px solid #D4B483' }}
            >
              <div
                className="font-playfair text-amber-300 select-none leading-none"
                style={{ fontSize: 72, opacity: 0.18 }}
              >
                ❧
              </div>
              <div
                className="mt-3 font-lato text-amber-400 text-xs tracking-widest uppercase"
                style={{ opacity: 0.35 }}
              >
                Dev & Priti
              </div>
            </div>

            {/* Spine */}
            <div
              className="flex-shrink-0"
              style={{ width: 10, background: '#3D2710', boxShadow: '0 0 6px rgba(0,0,0,0.35)' }}
            />

            {/* Right page — story content */}
            <div
              className="flex-1 relative overflow-hidden"
              style={{ background: '#F5ECD7', minHeight: 300 }}
            >
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-10 text-center ${pageAnim}`}
              >
                {/* Page top ornament */}
                <div
                  className="absolute top-3 left-0 right-0 flex justify-center"
                  style={{ opacity: 0.2 }}
                >
                  <span className="font-playfair text-amber-600 text-xs tracking-widest">
                    ─── ✦ ───
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl mb-5">{page.emoji}</div>
                <p className="font-playfair text-amber-900 text-base sm:text-lg leading-relaxed">
                  {page.text}
                </p>

                {page.isLast && (
                  <div className="mt-6 animate-pulse text-3xl">🔒</div>
                )}

                {/* Page number */}
                <div className="absolute bottom-3 right-4 font-lato text-amber-400 text-xs">
                  {page.page}
                </div>

                {/* Page bottom ornament */}
                <div
                  className="absolute bottom-3 left-0 right-0 flex justify-center"
                  style={{ opacity: 0.15 }}
                >
                  <span className="font-playfair text-amber-600 text-xs tracking-widest">
                    ─── ❧ ───
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover bottom strip */}
          <div className="w-full py-1" style={{ background: '#3D2710' }} />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center mt-7 gap-4">
        <button
          onClick={handleNext}
          disabled={flipState !== 'idle'}
          className="font-lato px-8 py-3 rounded-full text-sm font-semibold tracking-wide
            transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #A8832A 100%)',
            color: '#FFF8EC',
          }}
        >
          {pageIdx >= PAGES.length - 1 ? 'Open the Locket ✨' : 'Next →'}
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {PAGES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === pageIdx ? 22 : 8,
                height: 8,
                background: i === pageIdx ? '#C9A84C' : '#D4B483',
                opacity: i === pageIdx ? 1 : 0.45,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
