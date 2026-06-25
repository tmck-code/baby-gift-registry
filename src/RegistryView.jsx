// Wren registry — registry grid with category filters
const { useState: _useState } = React;

function RegistryView({ gifts, onReserve }) {
  const { Tag, GiftCard, Badge } = window.WrenDesignSystem_0f565f;
  const { categories } = window.WREN;
  const [cat, setCat] = React.useState('all');

  const visible = cat === 'all' ? gifts : gifts.filter((g) => g.category === cat);
  const available = gifts.filter((g) => g.remaining > 0).length;

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 28px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <span className="wren-eyebrow">The registry</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, letterSpacing: '-0.02em', margin: '10px 0 0', color: 'var(--text-strong)' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(232px, 1fr))', gap: 20 }}>
        {visible.map((g) => (
          <div key={g.id}>
            <GiftCard
              title={g.title}
              store={g.store}
              price={g.price}
              status={g.remaining <= 0 ? 'fulfilled' : g.status}
              mostWanted={g.mostWanted}
              group={g.group}
              pledged={g.pledged}
              goal={g.goal}
              thumbTint={g.tint}
              thumbIcon={<Ico name={g.icon} size={44} strokeWidth={1.3} color="var(--terracotta-600)" />}
              onReserve={g.remaining > 0 ? () => onReserve(g) : undefined}
            />
            {!g.group && g.qty > 1 && (
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center', marginTop: 4 }}>{g.remaining} of {g.qty} remaining</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { RegistryView });
