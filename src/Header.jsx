// Wren registry — top navigation bar
const { GiftCard: _gc } = window.WrenDesignSystem_0f565f;

function Header({ route, onNavigate, reservedCount, onLogout, isAdmin }) {
  const isMobile = useIsMobile();
  const link = (id, label) => (
    <button
      onClick={() => onNavigate(id)}
      style={{
        border: 'none', background: 'transparent', cursor: 'pointer',
        fontFamily: 'var(--font-text)', fontSize: 'var(--text-sm)',
        fontWeight: route === id ? 700 : 500,
        color: route === id ? 'var(--text-strong)' : 'var(--text-muted)',
        padding: '6px 2px', position: 'relative',
      }}
    >
      {label}
      {route === id && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, background: 'var(--brand)', borderRadius: 2 }} />}
    </button>
  );
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '12px 16px' : '14px 28px', background: 'rgba(248,244,237,0.82)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-subtle)',
    }}>
      <button onClick={() => onNavigate('home')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="assets/wren-mark.svg" height={isMobile ? 28 : 32} alt="Home" />
      </button>
      <nav style={{ display: 'flex', gap: isMobile ? 14 : 24, alignItems: 'center' }}>
        {isAdmin ? (
          link('admin', 'Registry items')
        ) : (
          <React.Fragment>
            {link('home', 'Home')}
            {link('registry', 'Registry')}
            {link('rsvp', 'RSVP')}
          </React.Fragment>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              fontFamily: 'var(--font-text)', fontSize: 'var(--text-sm)',
              fontWeight: 500, color: 'var(--text-muted)', padding: '6px 2px',
            }}
          >
            Log out
          </button>
        )}
      </nav>
    </header>
  );
}

Object.assign(window, { Header });
