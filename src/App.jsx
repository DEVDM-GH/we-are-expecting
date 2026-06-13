import { useState } from 'react'
import Storybook from './components/Storybook'
import Locket from './components/Locket'
import Stars from './components/Stars'

export default function App() {
  const [stage, setStage] = useState('storybook')

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, #FDF0D5 0%, #F5E4B8 40%, #EDD898 100%)',
      }}
    >
      <Stars />
      <div className="relative z-10 w-full flex items-center justify-center py-12 px-4">
        {stage === 'storybook' ? (
          <Storybook onComplete={() => setStage('locket')} />
        ) : (
          <Locket />
        )}
      </div>
    </div>
  )
}
