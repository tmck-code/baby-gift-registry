// Wren registry — root app
function App() {
  const [route, setRoute] = React.useState('home');
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [reservations, setReservations] = React.useState({});
  const [items, setItems] = React.useState([]);
  const [active, setActive] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const gifts = items.map(g => {
    const r = reservations[String(g.id)] || { count: 0, mine: false };
    return { ...g, reservedCount: r.count, mine: r.mine, remaining: g.qty - r.count };
  });
  const reservedCount = Object.values(reservations).filter(r => r.mine).length;

  const navigate = (r) => { setRoute(r); window.scrollTo({ top: 0 }); };

  const fetchReservations = async () => {
    const res = await fetch('/api/reservations', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setReservations(data);
    }
  };

  const fetchItems = async () => {
    const res = await fetch('/api/items', { credentials: 'include' });
    if (res.ok) {
      setItems(await res.json());
    }
  };

  React.useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (res.status === 200) {
          return res.json().then(data => {
            setUser({ email: data.email });
            return Promise.all([fetchReservations(), fetchItems()]);
          }).then(() => {
            setLoading(false);
          });
        } else if (res.status === 401) {
          setLoading(false);
          setShowLogin(true);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setShowLogin(true);
      });
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const confirmReserve = async (gift) => {
    setActive(null);
    const res = await fetch(`/api/reservations/${gift.id}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      await fetchReservations();
      showToast('Reserved. Thank you so much!');
    } else if (res.status === 409) {
      showToast('Someone just reserved this!');
    }
  };

  const unreserve = async (gift) => {
    const res = await fetch(`/api/reservations/${gift.id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) {
      await fetchReservations();
      showToast('Reservation removed.');
    }
  };

  const handleLogin = ({ email }) => {
    setUser({ email });
    fetchReservations();
    fetchItems();
    setShowLogin(false);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    setReservations({});
    setIsAdmin(false);
    setShowLogin(true);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowLogin(false);
    navigate('admin');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        Loading…
      </div>
    );
  }

  if (showLogin) {
    return <LoginModal onLogin={handleLogin} onAdminLogin={handleAdminLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header route={route} onNavigate={navigate} reservedCount={reservedCount} onLogout={handleLogout} isAdmin={isAdmin} />
      <main style={{ flex: 1 }}>
        {route === 'home' && <Home onNavigate={navigate} />}
        {route === 'registry' && <RegistryView gifts={gifts} onReserve={setActive} />}
        {route === 'rsvp' && <RsvpView onNavigate={navigate} />}
        {route === 'admin' && <AdminView />}
      </main>

      <footer style={{ background: 'var(--ink-700)', color: 'var(--ink-200)', padding: '36px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13.5 }}>Beth &amp; Tom · August 2026</span>
        </div>
      </footer>

      {active && <ReserveModal gift={active} onClose={() => setActive(null)} onConfirm={confirmReserve} onUnreserve={unreserve} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 60, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--ink-800)', color: 'var(--paper)', padding: '13px 20px', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-xl)', fontSize: 14.5, fontWeight: 500, animation: 'wrenpop 240ms var(--ease-out)' }}>
          <span style={{ display: 'inline-flex', color: 'var(--sage-300)' }}><Ico name="check-circle" size={18} /></span>
          {toast}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { App });
