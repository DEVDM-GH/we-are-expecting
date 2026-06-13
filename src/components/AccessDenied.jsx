import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function AccessDenied({ email }) {
  const handleSignOut = () => signOut(auth)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #FDF0D5 0%, #F5E4B8 40%, #EDD898 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '48px 40px',
          maxWidth: 400,
          width: '90%',
          background: 'rgba(253,246,227,0.88)',
          backdropFilter: 'blur(12px)',
          borderRadius: 24,
          border: '1px solid rgba(201,168,76,0.35)',
          boxShadow: '0 20px 60px rgba(140,90,20,0.15)',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <h2
          className="font-playfair"
          style={{ color: '#3B1F0A', fontSize: 22, fontStyle: 'italic', marginBottom: 12 }}
        >
          This is a private moment
        </h2>
        <p
          className="font-lato"
          style={{ color: '#8B6020', fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}
        >
          Sorry, <strong>{email}</strong> hasn't been added to the guest list yet.
        </p>
        <p
          className="font-lato"
          style={{ color: '#A8832A', fontSize: 12, marginBottom: 32 }}
        >
          If you think this is a mistake, reach out to Dev or Priti.
        </p>
        <button
          onClick={handleSignOut}
          className="font-lato"
          style={{
            padding: '12px 32px',
            borderRadius: 50,
            border: '1.5px solid #C9A84C',
            background: 'transparent',
            color: '#A8832A',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.05em',
          }}
        >
          Try a different account
        </button>
      </div>
    </div>
  )
}
