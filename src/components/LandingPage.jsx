import { useState, useEffect, useMemo } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { ALLOWED_EMAILS } from '../allowlist'

// Floaters placed around the edges, avoiding the center card
const FLOATERS = [
  { id: 1,  emoji: '🍼', size: 38, x: 5,  y: 8,  dur: 4.2, delay: 0.0  },
  { id: 2,  emoji: '⭐', size: 24, x: 88, y: 5,  dur: 3.6, delay: 0.5  },
  { id: 3,  emoji: '💛', size: 30, x: 92, y: 28, dur: 5.0, delay: 1.1  },
  { id: 4,  emoji: '🌸', size: 26, x: 3,  y: 55, dur: 4.7, delay: 0.8  },
  { id: 5,  emoji: '✨', size: 20, x: 94, y: 60, dur: 3.3, delay: 1.8  },
  { id: 6,  emoji: '🍼', size: 28, x: 78, y: 85, dur: 4.9, delay: 0.3  },
  { id: 7,  emoji: '💕', size: 24, x: 12, y: 82, dur: 3.8, delay: 1.4  },
  { id: 8,  emoji: '⭐', size: 18, x: 50, y: 4,  dur: 4.1, delay: 2.0  },
  { id: 9,  emoji: '🌸', size: 34, x: 2,  y: 30, dur: 5.3, delay: 0.6  },
  { id: 10, emoji: '💛', size: 22, x: 88, y: 75, dur: 4.4, delay: 1.6  },
  { id: 11, emoji: '✨', size: 26, x: 20, y: 92, dur: 3.7, delay: 0.2  },
  { id: 12, emoji: '🍃', size: 28, x: 70, y: 3,  dur: 4.8, delay: 1.0  },
  { id: 13, emoji: '💕', size: 20, x: 96, y: 45, dur: 3.5, delay: 2.2  },
  { id: 14, emoji: '🍼', size: 22, x: 55, y: 93, dur: 5.1, delay: 0.9  },
  { id: 15, emoji: '⭐', size: 30, x: 8,  y: 70, dur: 4.0, delay: 1.7  },
  { id: 16, emoji: '🌸', size: 18, x: 82, y: 50, dur: 3.9, delay: 0.4  },
]

const TYPEWRITER_TEXT = 'Something special is waiting for you…'

export default function LandingPage({ onDenied }) {
  const [displayed, setDisplayed] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Typewriter effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i++
      setDisplayed(TYPEWRITER_TEXT.slice(0, i))
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(timer)
        setTimeout(() => setShowButton(true), 400)
      }
    }, 55)
    return () => clearInterval(timer)
  }, [])

  const handleSignIn = async () => {
    if (!auth || !googleProvider) {
      setError('Sign-in is unavailable right now. Please try again later.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const email = result.user.email
      if (!ALLOWED_EMAILS.includes(email)) {
        await auth.signOut()
        onDenied(email)
      }
      // If allowed, App's onAuthStateChanged picks it up automatically
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #FDF0D5 0%, #F5E4B8 40%, #EDD898 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes floatSway {
          0%, 100% { transform: translateX(0px) rotate(-4deg); }
          50%       { transform: translateX(12px) rotate(4deg); }
        }
        .floater-bob  { animation: floatBob  var(--dur) ease-in-out var(--delay) infinite; }
        .floater-sway { animation: floatSway var(--dur) ease-in-out var(--delay) infinite; }
      `}</style>

      {/* Floating background elements */}
      {FLOATERS.map((f) => (
        <div
          key={f.id}
          className={f.id % 2 === 0 ? 'floater-bob' : 'floater-sway'}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: `${f.y}%`,
            fontSize: f.size,
            lineHeight: 1,
            opacity: 0.55,
            pointerEvents: 'none',
            '--dur': `${f.dur}s`,
            '--delay': `${f.delay}s`,
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* Central card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '48px 40px',
          maxWidth: 420,
          width: '90%',
          background: 'rgba(253, 246, 227, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: 24,
          border: '1px solid rgba(201,168,76,0.4)',
          boxShadow: '0 20px 60px rgba(140,90,20,0.18), 0 2px 0 rgba(255,255,255,0.6) inset',
        }}
      >
        {/* Locket icon */}
        <div style={{ fontSize: 52, marginBottom: 20, lineHeight: 1 }}>🔒</div>

        {/* Typewriter heading */}
        <h1
          className="font-playfair"
          style={{
            color: '#3B1F0A',
            fontSize: 'clamp(18px, 5vw, 24px)',
            fontStyle: 'italic',
            lineHeight: 1.5,
            marginBottom: 12,
            minHeight: '3em',
          }}
        >
          {displayed}
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: '1em',
              background: '#C9A84C',
              marginLeft: 3,
              verticalAlign: 'text-bottom',
              animation: 'floatBob 0.8s step-end infinite',
              opacity: displayed.length < TYPEWRITER_TEXT.length ? 1 : 0,
            }}
          />
        </h1>

        <p
          className="font-lato"
          style={{
            color: '#A8832A',
            fontSize: 13,
            letterSpacing: '0.08em',
            marginBottom: 32,
            opacity: showButton ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          You've been personally invited ✨
        </p>

        {/* Google Sign-In button */}
        <div
          style={{
            opacity: showButton ? 1 : 0,
            transform: showButton ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <button
            onClick={handleSignIn}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              width: '100%',
              padding: '14px 24px',
              background: loading ? '#f0e8d0' : '#ffffff',
              border: '1.5px solid #C9A84C',
              borderRadius: 50,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 3px 12px rgba(201,168,76,0.25)',
              transition: 'all 0.2s ease',
              fontFamily: 'Lato, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              color: '#3B1F0A',
              letterSpacing: '0.03em',
            }}
          >
            {/* Google logo SVG */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19.1 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H5.9C9.3 36.8 16.1 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C43 35.4 48 30 48 24c0-1.3-.1-2.6-.4-3.9z"/>
            </svg>
            {loading ? 'Signing in…' : 'Continue with Google'}
          </button>

          {/* Error message */}
          {error && (
            <p
              className="font-lato"
              style={{ color: '#C0392B', fontSize: 12, marginTop: 14 }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
