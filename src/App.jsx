import { useState } from 'react'
import Storybook from './components/Storybook'
import Locket from './components/Locket'
import Stars from './components/Stars'

export default function App() {
  const [stage, setStage] = useState('storybook')

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center py-10"
      style={{ background: 'linear-gradient(160deg, #FDF6E3 0%, #FAF0D7 55%, #F5E8C0 100%)' }}
    >
      <Stars />
      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        {stage === 'storybook' ? (
          <Storybook onComplete={() => setStage('locket')} />
        ) : (
          <Locket />
        )}
      </div>
    </div>
  )
}
