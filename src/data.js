// Wren registry — sample data. Exposed as window.WREN.
window.WREN = {
  parents: { mother: 'Maya', partner: 'Theo' },
  event: {
    title: 'A baby shower for our girl',
    date: 'Saturday, August 16',
    time: '2:00 – 5:00 PM',
    place: 'The garden at 14 Linden Way',
    city: 'Portland, OR',
  },
  categories: [
    { id: 'all', label: 'All gifts', icon: 'sparkles' },
    { id: 'nursery', label: 'Nursery', icon: 'moon' },
    { id: 'feeding', label: 'Feeding', icon: 'milk' },
    { id: 'travel', label: 'On the go', icon: 'baby' },
    { id: 'play', label: 'Play & books', icon: 'puzzle' },
    { id: 'fund', label: 'Group gifts', icon: 'users' },
  ],
  gifts: [
    { id: 1, title: 'Muslin swaddle set', store: 'West Elm Kids', price: 48, category: 'nursery', status: 'available', mostWanted: true, tint: 'var(--sage-100)', icon: 'baby', qty: 1 },
    { id: 2, title: 'Walnut crib', store: 'Crate & Kids', price: 399, category: 'nursery', status: 'available', tint: 'var(--terracotta-100)', icon: 'bed', qty: 1 },
    { id: 3, title: 'Blackout cloud nightlight', store: 'Hatch', price: 59, category: 'nursery', status: 'reserved', tint: 'var(--ink-100)', icon: 'moon', qty: 1 },
    { id: 4, title: 'Bottle starter kit', store: "Dr. Brown's", price: 36, category: 'feeding', status: 'available', tint: 'var(--honey-100)', icon: 'milk', qty: 1 },
    { id: 5, title: 'High chair, oat', store: 'Lalo', price: 175, category: 'feeding', status: 'available', mostWanted: true, tint: 'var(--sage-100)', icon: 'utensils', qty: 1 },
    { id: 6, title: 'Convertible car seat', store: 'Nuna', price: 350, category: 'travel', status: 'available', tint: 'var(--terracotta-100)', icon: 'car', qty: 1 },
    { id: 7, title: 'Compact stroller', store: 'Bugaboo', price: 269, category: 'travel', status: 'fulfilled', tint: 'var(--ink-100)', icon: 'baby', qty: 1 },
    { id: 8, title: 'Soft cloth book bundle', store: 'Lovevery', price: 28, category: 'play', status: 'available', tint: 'var(--honey-100)', icon: 'book-open', qty: 1 },
    { id: 9, title: 'Wooden play gym', store: 'Lalo', price: 92, category: 'play', status: 'available', tint: 'var(--sage-100)', icon: 'puzzle', qty: 1 },
    { id: 10, title: 'The nursery glider', store: 'Group gift', category: 'fund', status: 'available', group: true, pledged: 180, goal: 420, tint: 'var(--terracotta-100)', icon: 'armchair', qty: 1 },
    { id: 11, title: 'First-year diaper fund', store: 'Group gift', category: 'fund', status: 'available', group: true, pledged: 240, goal: 300, tint: 'var(--honey-100)', icon: 'heart-handshake', qty: 1 },
    { id: 12, title: 'Lambskin play mat', store: 'Binibamba', price: 120, category: 'nursery', status: 'available', tint: 'var(--sage-100)', icon: 'square', qty: 1 },
  ],
};
