// Baby registry — admin panel: manage registry items + view reservations
const EMPTY_ITEM = { title: '', qty: 1, store: '', category: 'nursery', image: '', url: '', most_wanted: false };

function ItemFormModal({ item, onClose, onSaved }) {
  const { Button, Input, IconButton } = window.WrenDesignSystem_0f565f;
  const categories = window.WREN.categories.filter((c) => c.id !== 'all');
  const isEdit = item && item.id != null;
  const [form, setForm] = React.useState({
    title: item.title || '',
    qty: item.qty || 1,
    store: item.store || '',
    category: item.category || 'nursery',
    image: item.image || '',
    url: item.url || '',
    most_wanted: !!item.mostWanted,
  });
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const body = { ...form, qty: parseInt(form.qty, 10) || 1 };
    const res = await fetch(
      isEdit ? `/api/admin/items/${item.id}` : '/api/admin/items',
      {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    );
    setSaving(false);
    if (res.ok) {
      onSaved();
    } else {
      setError('Could not save. Check the fields and try again.');
    }
  };

  const fieldLabel = { fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', display: 'block', marginBottom: 6 };
  const selectStyle = { width: '100%', height: 44, padding: '0 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)', background: 'var(--surface-card)', fontFamily: 'var(--font-text)', fontSize: 15, color: 'var(--text-body)' };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(33,34,51,0.46)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} style={{ width: 460, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', animation: 'wrenpop 240ms var(--ease-out)' }}>
        <div style={{ position: 'relative', padding: '22px 24px', background: 'var(--surface-alt)', borderBottom: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, margin: 0, color: 'var(--text-strong)' }}>{isEdit ? 'Edit item' : 'Add an item'}</h2>
          <IconButton label="Close" variant="ghost" onClick={onClose} style={{ position: 'absolute', top: 14, right: 14 }}><Ico name="x" size={18} /></IconButton>
        </div>

        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Name" placeholder="e.g. Muslin swaddles" value={form.title} onChange={set('title')} required />

          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ width: 120 }}>
              <Input type="number" min="1" label="Number of items" value={form.qty} onChange={set('qty')} required />
            </div>
            <div style={{ flex: 1 }}>
              <span style={fieldLabel}>Category</span>
              <select value={form.category} onChange={set('category')} style={selectStyle}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <Input label="Brand / store (optional)" placeholder="e.g. Any brand, or a shop name" value={form.store} onChange={set('store')} />
          <Input label="Thumbnail image URL (optional)" placeholder="https://…/photo.jpg" value={form.image} onChange={set('image')} />
          <Input label="Product link URL (optional)" placeholder="https://…/product" value={form.url} onChange={set('url')} />

          {form.image && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-subtle)' }}>Preview</span>
              <img src={form.image} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }} />
            </div>
          )}

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-body)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.most_wanted} onChange={(e) => setForm((f) => ({ ...f, most_wanted: e.target.checked }))} />
            Mark as “Most wanted”
          </label>

          {error && <p style={{ color: 'var(--brand)', fontSize: 13, margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <Button type="button" variant="secondary" full onClick={onClose}>Cancel</Button>
            <Button type="submit" full disabled={saving}>{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add item'}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function AdminView() {
  const { Button, Badge, IconButton } = window.WrenDesignSystem_0f565f;
  const [items, setItems] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [editing, setEditing] = React.useState(null); // item object, EMPTY_ITEM, or null

  const load = React.useCallback(() => {
    setLoading(true);
    fetch('/api/admin/items', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setItems(await res.json());
        setError(null);
      })
      .catch(() => setError('Failed to load registry items.'))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const remove = async (item) => {
    if (!window.confirm(`Delete “${item.title}”? This also removes its reservations.`)) return;
    const res = await fetch(`/api/admin/items/${item.id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) load();
  };

  const onSaved = () => { setEditing(null); load(); };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: 0, color: 'var(--text-strong)' }}>Admin: Registry items</h1>
        <Button leadingIcon={<Ico name="plus" size={18} color="#fff" />} onClick={() => setEditing(EMPTY_ITEM)}>Add item</Button>
      </div>

      {loading && <p style={{ color: 'var(--text-muted)', fontSize: 15, textAlign: 'center' }}>Loading…</p>}
      {!loading && error && <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{error}</p>}

      {!loading && !error && items && items.length === 0 && (
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>No items yet. Click “Add item” to create one.</p>
      )}

      {!loading && !error && items && items.map((item) => (
        <div key={item.id} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, flex: '0 0 auto', borderRadius: 'var(--radius-md)', background: item.image ? `center/cover no-repeat url(${item.image})` : item.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--terracotta-600)' }}>
              {!item.image && <Ico name={item.icon} size={28} strokeWidth={1.4} />}
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-strong)' }}>{item.title}</span>
                {item.mostWanted && <Badge tone="brand">Most wanted</Badge>}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 2 }}>
                {item.store || 'Any brand'} · {item.category}
                {item.url && <> · <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terracotta-600)', textDecoration: 'none' }}>link ↗</a></>}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', background: 'var(--surface-alt)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-pill)', padding: '3px 10px', whiteSpace: 'nowrap' }}>
                {item.reservedCount} / {item.qty} reserved
              </span>
              <IconButton label="Edit" variant="soft" onClick={() => setEditing(item)}><Ico name="pencil" size={16} /></IconButton>
              <IconButton label="Delete" variant="ghost" onClick={() => remove(item)}><Ico name="trash-2" size={16} /></IconButton>
            </div>
          </div>

          {item.reservations.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
              {item.reservations.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '8px 12px', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, color: 'var(--text-strong)' }}>{r.email}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{new Date(r.created_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {editing && <ItemFormModal item={editing} onClose={() => setEditing(null)} onSaved={onSaved} />}
    </div>
  );
}

Object.assign(window, { AdminView });
