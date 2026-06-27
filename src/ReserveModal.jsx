// Baby registry — reserve modal
function ReserveModal({ gift, onClose, onConfirm, onUnreserve }) {
  const { Button, IconButton, Badge } = window.WrenDesignSystem_0f565f;
  const [done, setDone] = React.useState(false);
  if (!gift) return null;

  const confirm = () => { setDone(true); setTimeout(() => { onConfirm(gift); }, 1100); };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(33,34,51,0.46)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: 440, maxWidth: '100%', background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', animation: 'wrenpop 240ms var(--ease-out)' }}
      >
        <div style={{ position: 'relative', display: 'flex', gap: 16, padding: 22, background: 'var(--surface-alt)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-lg)', background: gift.image ? `center/cover no-repeat url(${gift.image})` : gift.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', color: 'var(--terracotta-600)' }}>
            {!gift.image && <Ico name={gift.icon} size={34} strokeWidth={1.3} />}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>{gift.store}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 23, margin: '4px 0 6px', color: 'var(--text-strong)', lineHeight: 1.15 }}>{gift.title}</h2>
            {gift.qty > 1 && <span style={{ fontSize: 12.5, color: 'var(--text-subtle)', display: 'block' }}>{gift.remaining} of {gift.qty} remaining</span>}
            {gift.url && (
              <a href={gift.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: 'var(--terracotta-600)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                View this item <Ico name="external-link" size={13} />
              </a>
            )}
          </div>
          <IconButton label="Close" variant="ghost" onClick={onClose} style={{ position: 'absolute', top: 14, right: 14 }}><Ico name="x" size={18} /></IconButton>
        </div>

        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {done ? (
            <div style={{ textAlign: 'center', padding: '18px 0 8px' }}>
              <span style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: '50%', background: 'var(--sage-100)', color: 'var(--sage-500)', alignItems: 'center', justifyContent: 'center' }}>
                <Ico name="check" size={28} strokeWidth={2.4} />
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, margin: '14px 0 4px', color: 'var(--text-strong)' }}>Thank you, truly.</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14.5, margin: 0 }}>It means the world to us. We&rsquo;ll save you a hug at the shower.</p>
            </div>
          ) : gift.mine ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: 14.5, marginBottom: 16 }}>You&rsquo;ve already reserved this gift.</p>
              <Button full size="lg" variant="ghost" leadingIcon={<Ico name="x" size={18} />} onClick={() => { onUnreserve(gift); onClose(); }}>
                Unreserve
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <Button full size="lg" leadingIcon={<Ico name="gift" size={18} color="#fff" />} onClick={confirm}>
                Reserve this gift
              </Button>
              <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--text-subtle)', margin: 0 }}>Beth &amp; Tom won&rsquo;t see who reserved what.</p>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReserveModal });
