// Wren registry — top navigation bar
const { GiftCard: _gc } = window.WrenDesignSystem_0f565f;

function Header({ route, onNavigate, reservedCount, onLogout }) {
  const { IconButton } = window.WrenDesignSystem_0f565f;
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
      padding: '14px 28px', background: 'rgba(248,244,237,0.82)',
      backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-subtle)',
    }}>
      <button onClick={() => onNavigate('home')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="assets/wren-logo.svg" height="32" alt="Wren" />
      </button>
      <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {link('home', 'Home')}
        {link('registry', 'Registry')}
        {link('rsvp', 'RSVP')}
        <div style={{ position: 'relative' }}>
          <IconButton label="Reserved gifts" variant="soft" round onClick={() => onNavigate('registry')}>
            <Ico name="gift" size={18} />
          </IconButton>
          {reservedCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: 'var(--brand)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>{reservedCount}</span>
          )}
        </div>
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
