// Wren registry — registry grid with category filters
const { useState: _useState } = React;

function RegistryView({ gifts, onReserve }) {
  const { Tag, GiftCard, Badge } = window.WrenDesignSystem_0f565f;
  const { categories } = window.WREN;
  const [cat, setCat] = React.useState('all');
  const isMobile = useIsMobile();

  const visible = cat === 'all' ? gifts : gifts.filter((g) => g.category === cat);
  const available = gifts.filter((g) => g.remaining > 0).length;

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: isMobile ? '28px 20px 56px' : '40px 28px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <span className="wren-eyebrow">The registry</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 32 : 42, letterSpacing: '-0.02em', margin: '10px 0 0', color: 'var(--text-strong)' }}>
            Everything on our list
          </h1>
        </div>
        <Badge tone="sage" dot>{available} gifts still available</Badge>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '24px 0 28px' }}>
        {categories.map((c) => (
          <Tag key={c.id} selected={cat === c.id} onClick={() => setCat(c.id)} leadingIcon={<Ico name={c.icon} size={15} />}>
            {c.label}
          </Tag>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(232px, 1fr))', gap: isMobile ? 14 : 20 }}>
        {visible.map((g) => (
          <div key={g.id}>
            <GiftCard
              title={g.title}
              store={g.store}
              image={g.image}
              status={g.mine ? 'reserved' : g.remaining <= 0 ? 'fulfilled' : g.status}
              mostWanted={g.mostWanted}
              thumbTint={g.tint}
              thumbIcon={<Ico name={g.icon} size={44} strokeWidth={1.3} color="var(--terracotta-600)" />}
              onReserve={g.mine || g.remaining > 0 ? () => onReserve(g) : undefined}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 6, minHeight: 18 }}>
              {g.qty > 1 && (
                <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{g.remaining} of {g.qty} remaining</span>
              )}
              {g.url && (
                <a href={g.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--terracotta-600)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  View item <Ico name="external-link" size={12} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RegistryView });
