// Wren registry — Home / landing screen
function Home({ onNavigate }) {
  const { Button, Card, Badge, Avatar } = window.WrenDesignSystem_0f565f;
  const { event, parents } = window.WREN;
  return (
    <div>
      {/* Hero */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 28px 40px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
        <div>
          <span className="wren-eyebrow">Maya &amp; Theo · Baby shower</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '14px 0 0', color: 'var(--text-strong)' }}>
            We can&rsquo;t wait<br />to meet her.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-body)', maxWidth: 460, margin: '20px 0 0' }}>
            A little one is on the way, and we&rsquo;re slowly feathering the nest. If you&rsquo;d like to help us get ready, everything we&rsquo;re hoping for is right here.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
            <Button size="lg" leadingIcon={<Ico name="gift" size={18} color="#fff" />} onClick={() => onNavigate('registry')}>View the registry</Button>
            <Button size="lg" variant="secondary" onClick={() => onNavigate('rsvp')}>RSVP</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
            <div style={{ display: 'flex' }}>
              <Avatar name="Maya Olsen" size={36} ring style={{ marginRight: -10 }} />
              <Avatar name="Theo Park" size={36} ring />
            </div>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>From Maya &amp; Theo, with love</span>
          </div>
        </div>

        {/* Event card */}
        <Card elevation="lg" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ background: 'var(--ink-700)', padding: '28px 28px 24px', color: 'var(--paper)' }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--honey-300)' }}>You&rsquo;re invited</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--paper)', margin: '10px 0 0', lineHeight: 1.15 }}>{event.title}</h2>
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['calendar', event.date, event.time], ['map-pin', event.place, event.city]].map(([icon, a, b]) => (
              <div key={icon} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ display: 'inline-flex', width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--brand-soft)', color: 'var(--terracotta-700)', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Ico name={icon} size={19} />
                </span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 15 }}>{a}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>{b}</div>
                </div>
              </div>
            ))}
            <Button full variant="soft" trailingIcon={<Ico name="arrow-right" size={17} />} onClick={() => onNavigate('rsvp')}>Let them know you&rsquo;re coming</Button>
          </div>
        </Card>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--surface-alt)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginTop: 32 }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 28px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
          {[
            ['hand-heart', 'Pick something', 'Browse the registry and choose a gift that feels right — any size.'],
            ['check-check', 'Reserve it', 'Mark it reserved so nobody doubles up. We won&rsquo;t peek at who chose what.'],
            ['package', 'We&rsquo;ll handle the rest', 'Ship it or bring it to the shower. Group gifts let you chip in together.'],
          ].map(([icon, h, p], i) => (
            <div key={i}>
              <span style={{ display: 'inline-flex', width: 46, height: 46, borderRadius: 'var(--radius-lg)', background: 'var(--card)', border: '1px solid var(--border-subtle)', color: 'var(--terracotta-500)', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-xs)' }}>
                <Ico name={icon} size={22} />
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, margin: '14px 0 6px', color: 'var(--text-strong)' }}>{h}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }} dangerouslySetInnerHTML={{ __html: p }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { Home });
