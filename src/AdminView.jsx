// Wren registry — admin reservations panel
function AdminView() {
  const { Button } = window.WrenDesignSystem_0f565f;
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/admin/reservations', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          setError('Failed to load reservations.');
        } else {
          const json = await res.json();
          setData(json);
        }
      })
      .catch(() => {
        setError('Failed to load reservations.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    window.location.reload();
  };

  const withReservations = data ? data.filter((item) => item.reservations.length > 0) : [];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 28px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 32,
          flexWrap: 'wrap',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            margin: 0,
            color: 'var(--text-strong)',
          }}
        >
          Admin: All Reservations
        </h1>
        <Button variant="ghost" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      {loading && (
        <p style={{ color: 'var(--text-muted)', fontSize: 15, textAlign: 'center' }}>Loading…</p>
      )}

      {!loading && error && (
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{error}</p>
      )}

      {!loading && !error && data && (
        <div>
          {withReservations.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>No reservations yet.</p>
          )}
          {withReservations.map((item) => {
            const gift = window.WREN.gifts.find((g) => Number(g.id) === Number(item.item_id));
            const title = gift ? gift.title : `Item ${item.item_id}`;
            const store = gift ? gift.store : null;
            const qty = gift ? gift.qty : '?';
            return (
              <div
                key={item.item_id}
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 20,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    marginBottom: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: 'var(--text-strong)',
                        display: 'block',
                      }}
                    >
                      {title}
                    </span>
                    {store && (
                      <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{store}</span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: 'var(--text-muted)',
                      background: 'var(--surface-alt)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-pill)',
                      padding: '3px 10px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.reservations.length} / {qty} reserved
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {item.reservations.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '8px 12px',
                        background: 'var(--surface-sunken)',
                        borderRadius: 'var(--radius-md)',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{r.email}</span>
                      <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                        {new Date(r.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AdminView });
