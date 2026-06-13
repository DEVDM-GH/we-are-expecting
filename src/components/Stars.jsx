import { useMemo } from 'react'

export default function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        dur: (Math.random() * 4 + 2).toFixed(1),
        delay: (Math.random() * 5).toFixed(1),
        color:
          i % 4 === 0
            ? '#F4B8C1'
            : i % 4 === 1
              ? '#8FAF8A'
              : i % 4 === 2
                ? '#C9A84C'
                : '#fff8e7',
      })),
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            boxShadow: `0 0 ${s.size + 2}px 1px ${s.color}`,
          }}
        />
      ))}
    </div>
  )
}
