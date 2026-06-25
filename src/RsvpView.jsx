// Wren registry — RSVP screen
function RsvpView({ onNavigate }) {
  const { Card, Button, Input, Badge } = window.WrenDesignSystem_0f565f;
  const { event } = window.WREN;
  const [attending, setAttending] = React.useState('yes');
  const [guests, setGuests] = React.useState(1);
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '80px 28px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'var(--sage-100)', color: 'var(--sage-500)', alignItems: 'center', justifyContent: 'center' }}>
          <Ico name="party-popper" size={30} />
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: '20px 0 8px', color: 'var(--text-strong)' }}>See you there!</h1>
        <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6 }}>We&rsquo;ve got you down. {event.date}, {event.place}. Maya &amp; Theo are so glad you&rsquo;re coming.</p>
        <div style={{ marginTop: 24 }}>
          <Button variant="soft" leadingIcon={<Ico name="gift" size={17} />} onClick={() => onNavigate('registry')}>Browse the registry</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '48px 28px 72px' }}>
      <span className="wren-eyebrow">RSVP</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, letterSpacing: '-0.02em', margin: '10px 0 6px', color: 'var(--text-strong)' }}>Will you join us?</h1>
      <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: '0 0 28px' }}>{event.date} · {event.time} · {event.place}</p>

      <Card elevation="md" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', display: 'block', marginBottom: 8 }}>Can you make it?</span>
          <div style={{ display: 'flex', gap: 10 }}>
            {[['yes', 'Joyfully yes', 'heart'], ['no', 'Sadly no', 'cloud']].map(([v, label, icon]) => (
              <button key={v} onClick={() => setAttending(v)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 50, borderRadius: 'var(--radius-md)', cursor: 'pointer', fontFamily: 'var(--font-text)', fontWeight: 700, fontSize: 15, border: attending === v ? '1px solid var(--brand)' : '1px solid var(--border-default)', background: attending === v ? 'var(--brand-soft)' : 'var(--surface-card)', color: attending === v ? 'var(--terracotta-700)' : 'var(--text-body)' }}>
                <Ico name={icon} size={18} />{label}
              </button>
            ))}
          </div>
        </div>

        <Input label="Your name" placeholder="e.g. Maya Olsen" />

        {attending === 'yes' && (
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', display: 'block', marginBottom: 8 }}>How many of you?</span>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', padding: '4px 6px' }}>
              <button onClick={() => setGuests((g) => Math.max(1, g - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--surface-sunken)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-strong)' }}><Ico name="minus" size={16} /></button>
              <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)' }}>{guests}</span>
              <button onClick={() => setGuests((g) => Math.min(6, g + 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'var(--surface-sunken)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-strong)' }}><Ico name="plus" size={16} /></button>
            </div>
          </div>
        )}

        <Input label="A note for the parents-to-be (optional)" placeholder="We&rsquo;re so happy for you both!" />

        <Button full size="lg" trailingIcon={<Ico name="arrow-right" size={18} color="#fff" />} onClick={() => setSent(true)}>Send RSVP</Button>
      </Card>
    </div>
  );
}

Object.assign(window, { RsvpView });
