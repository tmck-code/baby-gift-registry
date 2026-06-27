// Baby registry — static site config. Exposed as window.WREN.
//
// Gifts themselves are no longer defined here — they live in the database and
// are managed through the admin interface (added/edited/removed there). The app
// loads them from GET /api/items. This file only holds the couple, the event
// details, and the category filters.
window.WREN = {
  parents: { mother: 'Beth', partner: 'Tom' },
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
  ],
};
