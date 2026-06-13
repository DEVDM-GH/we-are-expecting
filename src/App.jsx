import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ALLOWED_EMAILS } from './allowlist'
import LandingPage from './components/LandingPage'
import AccessDenied from './components/AccessDenied'
import Storybook from './components/Storybook'
import Locket from './components/Locket'
import Stars from './components/Stars'

// auth state: 'loading' | 'unauthenticated' | 'denied' | 'authorized'
export default function App() {
  const [authState, setAuthState] = useState('loading')
  const [deniedEmail, setDeniedEmail] = useState('')
  const [stage, setStage] = useState('storybook')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthState('unauthenticated')
      } else if (ALLOWED_EMAILS.includes(user.email)) {
        setAuthState('authorized')
      } else {
        setAuthState('denied')
        setDeniedEmail(user.email)
      }
    })
    return unsub
  }, [])

  // ── Loading spinner ──
  if (authState === 'loading') {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(ellipse at 50% 40%, #FDF0D5 0%, #F5E4B8 40%, #EDD898 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: 40, animation: 'spin 1.2s linear infinite' }}>✨</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // ── Not logged in → Landing page ──
  if (authState === 'unauthenticated') {
    return (
      <LandingPage
        onDenied={(email) => {
          setDeniedEmail(email)
          setAuthState('denied')
        }}
      />
    )
  }

  // ── Logged in but email not on allowlist ──
  if (authState === 'denied') {
    return <AccessDenied email={deniedEmail} />
  }

  // ── Authorized → main experience ──
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
