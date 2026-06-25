// Wren registry — login modal (guest + admin)
function LoginModal({ onLogin, onAdminLogin }) {
  const { Button, Input } = window.WrenDesignSystem_0f565f;
  const [mode, setMode] = React.useState('guest');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const switchMode = (next) => {
    setMode(next);
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin({ email: data.email });
      } else if (res.status === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onAdminLogin();
      } else if (res.status === 401) {
        setError('Incorrect admin password.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(33,34,51,0.46)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          width: 440,
          maxWidth: '100%',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          animation: 'wrenpop 240ms var(--ease-out)',
        }}
      >
        {mode === 'guest' ? (
          <React.Fragment>
            <div
              style={{
                padding: '28px 28px 20px',
                background: 'var(--surface-alt)',
                borderBottom: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  margin: '0 0 6px',
                  color: 'var(--text-strong)',
                }}
              >
                Welcome to Wren&rsquo;s registry
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14.5, margin: 0 }}>
                Enter your details to view and reserve gifts.
              </p>
            </div>

            <form
              onSubmit={handleGuestSubmit}
              style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                placeholder="Registry password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <p style={{ color: 'var(--brand)', fontSize: 13, margin: 0, textAlign: 'center' }}>
                  {error}
                </p>
              )}
              <Button type="submit" full size="lg" disabled={loading}>
                {loading ? 'Entering…' : 'Enter registry'}
              </Button>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-subtle)', margin: 0 }}>
                Registry owner?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('admin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'var(--brand)',
                    fontSize: 13,
                    fontFamily: 'var(--font-text)',
                    textDecoration: 'underline',
                  }}
                >
                  Sign in as admin
                </button>
              </p>
            </form>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              style={{
                padding: '28px 28px 20px',
                background: 'var(--surface-alt)',
                borderBottom: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  margin: 0,
                  color: 'var(--text-strong)',
                }}
              >
                Admin login
              </h2>
            </div>

            <form
              onSubmit={handleAdminSubmit}
              style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <Input
                type="password"
                label="Admin password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && (
                <p style={{ color: 'var(--brand)', fontSize: 13, margin: 0, textAlign: 'center' }}>
                  {error}
                </p>
              )}
              <Button type="submit" full size="lg" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in as admin'}
              </Button>
              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-subtle)', margin: 0 }}>
                <button
                  type="button"
                  onClick={() => switchMode('guest')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: 'var(--brand)',
                    fontSize: 13,
                    fontFamily: 'var(--font-text)',
                    textDecoration: 'underline',
                  }}
                >
                  Back to guest login
                </button>
              </p>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { LoginModal });
