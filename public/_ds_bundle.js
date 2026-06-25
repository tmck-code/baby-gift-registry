/* @ds-bundle: {"format":3,"namespace":"WrenDesignSystem_0f565f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ProgressBar","sourcePath":"components/core/ProgressBar.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"GiftCard","sourcePath":"components/registry/GiftCard.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4a9481768f5f","components/core/Badge.jsx":"72345f1bf204","components/core/Button.jsx":"496e8d8fb128","components/core/Card.jsx":"16ac230509e4","components/core/IconButton.jsx":"811026b8ce63","components/core/Input.jsx":"48389fe48bb1","components/core/ProgressBar.jsx":"9d6460a37b80","components/core/Tag.jsx":"ccba28053f0b","components/registry/GiftCard.jsx":"7549de3d7c5b","ui_kits/registry/App.jsx":"3178b5d35a44","ui_kits/registry/Header.jsx":"6fbf08ab8cbd","ui_kits/registry/Home.jsx":"f58e4d8ba73f","ui_kits/registry/RegistryView.jsx":"5b7d4f5d071a","ui_kits/registry/ReserveModal.jsx":"620de1b94e27","ui_kits/registry/RsvpView.jsx":"01a9ae40b27f","ui_kits/registry/data.js":"aaa0caca8b61","ui_kits/registry/shared.jsx":"befedd74ce56"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WrenDesignSystem_0f565f = window.WrenDesignSystem_0f565f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Avatar — round photo or initials. Falls back to initials on a
 * deterministic warm tint when no `src` is given.
 */
function Avatar({
  src,
  name = '',
  size = 40,
  ring = false,
  style,
  ...rest
}) {
  const tints = [['var(--terracotta-100)', 'var(--terracotta-700)'], ['var(--sage-100)', 'var(--sage-500)'], ['var(--honey-100)', 'var(--honey-500)'], ['var(--ink-100)', 'var(--ink-700)']];
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
  const idx = (name.charCodeAt(0) || 0) % tints.length;
  const [bg, fg] = tints[idx];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flex: '0 0 auto',
      borderRadius: '50%',
      overflow: 'hidden',
      background: src ? 'var(--neutral-100)' : bg,
      color: fg,
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-bold)',
      fontSize: size * 0.38,
      letterSpacing: '0.01em',
      boxShadow: ring ? '0 0 0 3px var(--surface-card), 0 0 0 4px var(--border-default)' : 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || '·');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Badge — small status pill. Tones map to semantic colors.
 * Use for gift status: available / reserved / fulfilled.
 */
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: {
      background: 'var(--neutral-100)',
      color: 'var(--text-muted)',
      dot: 'var(--neutral-400)'
    },
    brand: {
      background: 'var(--brand-soft)',
      color: 'var(--terracotta-700)',
      dot: 'var(--brand)'
    },
    sage: {
      background: 'var(--sage-50)',
      color: 'var(--sage-500)',
      dot: 'var(--sage-400)'
    },
    honey: {
      background: 'var(--honey-50)',
      color: 'var(--honey-500)',
      dot: 'var(--honey-400)'
    },
    rose: {
      background: 'var(--rose-50)',
      color: 'var(--rose-400)',
      dot: 'var(--rose-400)'
    },
    ink: {
      background: 'var(--ink-700)',
      color: 'var(--paper)',
      dot: 'var(--honey-300)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sz = size === 'sm' ? {
    padding: '2px 8px',
    fontSize: 'var(--text-2xs)',
    gap: 5
  } : {
    padding: '4px 11px',
    fontSize: 'var(--text-xs)',
    gap: 6
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sz.gap,
      padding: sz.padding,
      background: t.background,
      color: t.color,
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: sz.fontSize,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1.2,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: t.dot,
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Button — the primary action primitive.
 * Variants: primary (terracotta), secondary (ink outline), ghost, soft, sage.
 * Sizes: sm, md, lg. Pass `leadingIcon` / `trailingIcon` as React nodes.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 34,
      fontSize: 'var(--text-sm)',
      gap: 6,
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '0 20px',
      height: 44,
      fontSize: 'var(--text-base)',
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      padding: '0 28px',
      height: 54,
      fontSize: 'var(--text-md)',
      gap: 10,
      radius: 'var(--radius-lg)'
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--brand)',
      color: 'var(--text-on-brand)',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-brand)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    soft: {
      background: 'var(--brand-soft)',
      color: 'var(--text-accent)',
      border: '1px solid transparent'
    },
    sage: {
      background: 'var(--sage-400)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: '0 10px 24px -10px rgba(72,107,80,0.5)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    className: `wren-btn wren-btn--${variant}`,
    style: {
      display: full ? 'flex' : 'inline-flex',
      width: full ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: s.fontSize,
      lineHeight: 1,
      letterSpacing: 'var(--tracking-snug)',
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)',
      ...v,
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto'
    }
  }, leadingIcon), children, trailingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto'
    }
  }, trailingIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Card — warm-white surface container with soft shadow.
 * `as` lets you render a different element (e.g. "a", "article").
 * `interactive` adds hover lift for clickable cards.
 */
function Card({
  children,
  as: Tag = 'div',
  padded = true,
  interactive = false,
  elevation = 'sm',
  style,
  ...rest
}) {
  const shadows = {
    none: 'none',
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `wren-card${interactive ? ' wren-card--interactive' : ''}`,
    style: {
      display: 'block',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: shadows[elevation] ?? shadows.sm,
      padding: padded ? 'var(--space-6)' : 0,
      transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren IconButton — square/circular button holding a single icon.
 * Use for toolbar actions, close buttons, favourite toggles.
 */
function IconButton({
  children,
  variant = 'secondary',
  size = 'md',
  round = false,
  disabled = false,
  label,
  onClick,
  style,
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  };
  const d = dims[size] || dims.md;
  const variants = {
    primary: {
      background: 'var(--brand)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-brand)'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)'
    },
    soft: {
      background: 'var(--brand-soft)',
      color: 'var(--text-accent)',
      border: '1px solid transparent'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    }
  };
  const v = variants[variant] || variants.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onClick: onClick,
    className: `wren-btn wren-iconbtn wren-btn--${variant}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: d,
      height: d,
      flex: '0 0 auto',
      borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)',
      ...v,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Input — labelled text field. Supports `label`, `hint`, `error`,
 * and leading/trailing adornments. Forwards extra props to the <input>.
 */
function Input({
  label,
  hint,
  error,
  leading = null,
  trailing = null,
  id,
  style,
  containerStyle,
  ...rest
}) {
  const inputId = id || (label ? `wren-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--danger)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "wren-input",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 46,
      padding: '0 14px',
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xs)',
      transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)'
    }
  }, leading && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-subtle)'
    }
  }, leading), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      ...style
    }
  }, rest)), trailing && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-subtle)'
    }
  }, trailing)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger)' : 'var(--text-subtle)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren ProgressBar — for group-gifting / cash-fund progress.
 * Pass `value` and `max`; renders a filled track with optional caption.
 */
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'brand',
  height = 10,
  showLabel = false,
  caption,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, max ? value / max * 100 : 0));
  const fills = {
    brand: 'var(--brand)',
    sage: 'var(--sage-400)',
    honey: 'var(--honey-300)',
    ink: 'var(--ink-700)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, rest), (caption || showLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12
    }
  }, caption && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, caption), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-strong)'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    style: {
      height,
      width: '100%',
      background: 'var(--neutral-100)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${pct}%`,
      background: fills[tone] || fills.brand,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--duration-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren Tag — selectable filter chip. Used for registry category filters
 * (Nursery, Feeding, On the go…). Controlled via `selected` + `onClick`.
 */
function Tag({
  children,
  selected = false,
  leadingIcon = null,
  onClick,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "aria-pressed": selected,
    className: "wren-tag",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 16px',
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-sm)',
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      background: selected ? 'var(--ink-700)' : 'var(--surface-card)',
      color: selected ? 'var(--paper)' : 'var(--text-body)',
      border: selected ? '1px solid var(--ink-700)' : '1px solid var(--border-default)',
      boxShadow: selected ? 'var(--shadow-sm)' : 'none',
      transition: 'background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
      ...style
    }
  }, rest), leadingIcon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, leadingIcon), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/registry/GiftCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wren GiftCard — the signature product tile for a registry item.
 * Shows a thumbnail (image or warm placeholder), title, store, price, and a
 * status-aware action. For group gifts pass `pledged`/`goal` to show progress.
 */
function GiftCard({
  title,
  store,
  price,
  image,
  thumbTint = 'var(--terracotta-100)',
  thumbIcon = null,
  status = 'available',
  // available | reserved | fulfilled
  mostWanted = false,
  group = false,
  pledged = 0,
  goal = 0,
  onReserve,
  style,
  ...rest
}) {
  const statusMeta = {
    available: null,
    reserved: {
      tone: 'sage',
      label: 'Reserved',
      dot: true
    },
    fulfilled: {
      tone: 'ink',
      label: 'Fulfilled',
      dot: false
    }
  }[status];
  const reserved = status !== 'available';
  return /*#__PURE__*/React.createElement("article", _extends({
    className: "wren-card wren-card--interactive",
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      background: image ? `center/cover no-repeat url(${image})` : thumbTint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--terracotta-700)'
    }
  }, !image && thumbIcon, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      display: 'flex',
      gap: 6
    }
  }, mostWanted && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand"
  }, "Most wanted")), statusMeta && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: statusMeta.tone,
    dot: statusMeta.dot
  }, statusMeta.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 'var(--space-5)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, store && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, store), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--text-strong)',
      lineHeight: 1.2
    }
  }, title)), group && goal > 0 ? /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: pledged,
    max: goal,
    tone: "brand",
    caption: `$${pledged} of $${goal}`,
    showLabel: true,
    style: {
      marginTop: 'auto'
    }
  }) : price != null && /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "$", price), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: reserved ? 'secondary' : 'primary',
    full: true,
    disabled: status === 'fulfilled',
    onClick: onReserve,
    style: {
      marginTop: 4
    }
  }, status === 'fulfilled' ? 'Already gifted' : status === 'reserved' ? 'Reserved — view' : group ? 'Chip in' : 'Reserve this gift')));
}
Object.assign(__ds_scope, { GiftCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/registry/GiftCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/App.jsx
try { (() => {
// Wren registry — root app. Exposes window.App.
function App() {
  const [route, setRoute] = React.useState('home');
  const [gifts, setGifts] = React.useState(window.WREN.gifts);
  const [active, setActive] = React.useState(null); // gift being reserved
  const [toast, setToast] = React.useState(null);
  const reservedCount = gifts.filter(g => g.status === 'reserved').length;
  const navigate = r => {
    setRoute(r);
    window.scrollTo({
      top: 0
    });
  };
  const confirmReserve = gift => {
    setGifts(prev => prev.map(g => {
      if (g.id !== gift.id) return g;
      if (g.group) return {
        ...g,
        pledged: Math.min(g.goal, g.pledged + 25)
      };
      return {
        ...g,
        status: 'reserved'
      };
    }));
    setActive(null);
    setToast(gift.group ? 'Your contribution is in — thank you!' : 'Reserved. Thank you so much!');
    setTimeout(() => setToast(null), 3200);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Header, {
    route: route,
    onNavigate: navigate,
    reservedCount: reservedCount
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1
    }
  }, route === 'home' && /*#__PURE__*/React.createElement(Home, {
    onNavigate: navigate
  }), route === 'registry' && /*#__PURE__*/React.createElement(RegistryView, {
    gifts: gifts,
    onReserve: setActive
  }), route === 'rsvp' && /*#__PURE__*/React.createElement(RsvpView, {
    onNavigate: navigate
  })), /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-700)',
      color: 'var(--ink-200)',
      padding: '36px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wren-logo-light.svg",
    height: "30",
    alt: "Wren"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5
    }
  }, "Made with care for our girl \xB7 August 2026"))), active && /*#__PURE__*/React.createElement(ReserveModal, {
    gift: active,
    onClose: () => setActive(null),
    onConfirm: confirmReserve
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--ink-800)',
      color: 'var(--paper)',
      padding: '13px 20px',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-xl)',
      fontSize: 14.5,
      fontWeight: 500,
      animation: 'wrenpop 240ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--sage-300)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "check-circle",
    size: 18
  })), toast));
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/Header.jsx
try { (() => {
// Wren registry — top navigation bar. Exposes window.Header.
const {
  GiftCard: _gc
} = window.WrenDesignSystem_0f565f; // ensure bundle present

function Header({
  route,
  onNavigate,
  reservedCount
}) {
  const {
    IconButton
  } = window.WrenDesignSystem_0f565f;
  const link = (id, label) => /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate(id),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontSize: 'var(--text-sm)',
      fontWeight: route === id ? 700 : 500,
      color: route === id ? 'var(--text-strong)' : 'var(--text-muted)',
      padding: '6px 2px',
      position: 'relative'
    }
  }, label, route === id && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -2,
      height: 2,
      background: 'var(--brand)',
      borderRadius: 2
    }
  }));
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 28px',
      background: 'rgba(248,244,237,0.82)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('home'),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wren-logo.svg",
    height: "32",
    alt: "Wren"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }
  }, link('home', 'Home'), link('registry', 'Registry'), link('rsvp', 'RSVP'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Reserved gifts",
    variant: "soft",
    round: true,
    onClick: () => onNavigate('registry')
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "gift",
    size: 18
  })), reservedCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 9,
      background: 'var(--brand)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  }, reservedCount))));
}
Object.assign(window, {
  Header
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/Home.jsx
try { (() => {
// Wren registry — Home / landing screen. Exposes window.Home.
function Home({
  onNavigate
}) {
  const {
    Button,
    Card,
    Badge,
    Avatar
  } = window.WrenDesignSystem_0f565f;
  const {
    event,
    parents
  } = window.WREN;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '64px 28px 40px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "wren-eyebrow"
  }, "Maya & Theo \xB7 Baby shower"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 60,
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
      margin: '14px 0 0',
      color: 'var(--text-strong)'
    }
  }, "We can\u2019t wait", /*#__PURE__*/React.createElement("br", null), "to meet her."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 460,
      margin: '20px 0 0'
    }
  }, "A little one is on the way, and we\u2019re slowly feathering the nest. If you\u2019d like to help us get ready, everything we\u2019re hoping for is right here."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Ico, {
      name: "gift",
      size: 18,
      color: "#fff"
    }),
    onClick: () => onNavigate('registry')
  }, "View the registry"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => onNavigate('rsvp')
  }, "RSVP")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Olsen",
    size: 36,
    ring: true,
    style: {
      marginRight: -10
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Theo Park",
    size: 36,
    ring: true
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "From Maya & Theo, with love"))), /*#__PURE__*/React.createElement(Card, {
    elevation: "lg",
    style: {
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-700)',
      padding: '28px 28px 24px',
      color: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--honey-300)'
    }
  }, "You\u2019re invited"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--paper)',
      margin: '10px 0 0',
      lineHeight: 1.15
    }
  }, event.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, [['calendar', event.date, event.time], ['map-pin', event.place, event.city]].map(([icon, a, b]) => /*#__PURE__*/React.createElement("div", {
    key: icon,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-md)',
      background: 'var(--brand-soft)',
      color: 'var(--terracotta-700)',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: icon,
    size: 19
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontSize: 15
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, b)))), /*#__PURE__*/React.createElement(Button, {
    full: true,
    variant: "soft",
    trailingIcon: /*#__PURE__*/React.createElement(Ico, {
      name: "arrow-right",
      size: 17
    }),
    onClick: () => onNavigate('rsvp')
  }, "Let them know you\u2019re coming")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-alt)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '48px 28px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 28
    }
  }, [['hand-heart', 'Pick something', 'Browse the registry and choose a gift that feels right — any size.'], ['check-check', 'Reserve it', 'Mark it reserved so nobody doubles up. We won&rsquo;t peek at who chose what.'], ['package', 'We&rsquo;ll handle the rest', 'Ship it or bring it to the shower. Group gifts let you chip in together.']].map(([icon, h, p], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--card)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--terracotta-500)',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-xs)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      margin: '14px 0 6px',
      color: 'var(--text-strong)'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: 0
    },
    dangerouslySetInnerHTML: {
      __html: p
    }
  }))))));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/RegistryView.jsx
try { (() => {
// Wren registry — the registry grid with category filters. Exposes window.RegistryView.
const {
  useState: _useState
} = React;
function RegistryView({
  gifts,
  onReserve
}) {
  const {
    Tag,
    GiftCard,
    Badge
  } = window.WrenDesignSystem_0f565f;
  const {
    categories
  } = window.WREN;
  const [cat, setCat] = React.useState('all');
  const visible = cat === 'all' ? gifts : gifts.filter(g => g.category === cat);
  const available = gifts.filter(g => g.status === 'available').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: '0 auto',
      padding: '40px 28px 72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "wren-eyebrow"
  }, "The registry"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 42,
      letterSpacing: '-0.02em',
      margin: '10px 0 0',
      color: 'var(--text-strong)'
    }
  }, "Everything on our list")), /*#__PURE__*/React.createElement(Badge, {
    tone: "sage",
    dot: true
  }, available, " gifts still available")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      margin: '24px 0 28px'
    }
  }, categories.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c.id,
    selected: cat === c.id,
    onClick: () => setCat(c.id),
    leadingIcon: /*#__PURE__*/React.createElement(Ico, {
      name: c.icon,
      size: 15
    })
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(232px, 1fr))',
      gap: 20
    }
  }, visible.map(g => /*#__PURE__*/React.createElement(GiftCard, {
    key: g.id,
    title: g.title,
    store: g.store,
    price: g.price,
    status: g.status,
    mostWanted: g.mostWanted,
    group: g.group,
    pledged: g.pledged,
    goal: g.goal,
    thumbTint: g.tint,
    thumbIcon: /*#__PURE__*/React.createElement(Ico, {
      name: g.icon,
      size: 44,
      strokeWidth: 1.3,
      color: "var(--terracotta-600)"
    }),
    onReserve: () => onReserve(g)
  }))));
}
Object.assign(window, {
  RegistryView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/RegistryView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/ReserveModal.jsx
try { (() => {
// Wren registry — reserve / chip-in modal. Exposes window.ReserveModal.
function ReserveModal({
  gift,
  onClose,
  onConfirm
}) {
  const {
    Button,
    IconButton,
    Input,
    ProgressBar,
    Badge
  } = window.WrenDesignSystem_0f565f;
  const [done, setDone] = React.useState(false);
  const [amount, setAmount] = React.useState(gift && gift.group ? 25 : 0);
  if (!gift) return null;
  const confirm = () => {
    setDone(true);
    setTimeout(() => {
      onConfirm(gift);
    }, 1100);
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      background: 'rgba(33,34,51,0.46)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 440,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-xl)',
      overflow: 'hidden',
      animation: 'wrenpop 240ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 16,
      padding: 22,
      background: 'var(--surface-alt)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 72,
      height: 72,
      borderRadius: 'var(--radius-lg)',
      background: gift.tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto',
      color: 'var(--terracotta-600)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: gift.icon,
    size: 34,
    strokeWidth: 1.3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-subtle)'
    }
  }, gift.store), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 23,
      margin: '4px 0 6px',
      color: 'var(--text-strong)',
      lineHeight: 1.15
    }
  }, gift.title), gift.group ? /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Group gift") : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  }, "$", gift.price)), /*#__PURE__*/React.createElement(IconButton, {
    label: "Close",
    variant: "ghost",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 14,
      right: 14
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, done ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '18px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--sage-100)',
      color: 'var(--sage-500)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "check",
    size: 28,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 22,
      margin: '14px 0 4px',
      color: 'var(--text-strong)'
    }
  }, "Thank you, truly."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 14.5,
      margin: 0
    }
  }, "It means the world to us. We\u2019ll save you a hug at the shower.")) : /*#__PURE__*/React.createElement(React.Fragment, null, gift.group && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-md)',
      padding: 14
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: gift.pledged + amount,
    max: gift.goal,
    tone: "brand",
    showLabel: true,
    caption: `$${gift.pledged} pledged so far`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, [25, 50, 100].map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setAmount(v),
    style: {
      flex: 1,
      height: 40,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 15,
      border: amount === v ? '1px solid var(--brand)' : '1px solid var(--border-default)',
      background: amount === v ? 'var(--brand-soft)' : 'var(--surface-card)',
      color: amount === v ? 'var(--terracotta-700)' : 'var(--text-body)'
    }
  }, "$", v)))), /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "e.g. Maya Olsen",
    defaultValue: ""
  }), /*#__PURE__*/React.createElement(Input, {
    label: "A note for Maya & Theo (optional)",
    placeholder: "Can\u2019t wait to meet her!"
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    leadingIcon: /*#__PURE__*/React.createElement(Ico, {
      name: gift.group ? 'heart-handshake' : 'gift',
      size: 18,
      color: "#fff"
    }),
    onClick: confirm
  }, gift.group ? `Chip in $${amount}` : 'Reserve this gift'), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 12.5,
      color: 'var(--text-subtle)',
      margin: 0
    }
  }, "Maya & Theo won\u2019t see who reserved what.")))));
}
Object.assign(window, {
  ReserveModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/ReserveModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/RsvpView.jsx
try { (() => {
// Wren registry — RSVP screen. Exposes window.RsvpView.
function RsvpView({
  onNavigate
}) {
  const {
    Card,
    Button,
    Input,
    Badge
  } = window.WrenDesignSystem_0f565f;
  const {
    event
  } = window.WREN;
  const [attending, setAttending] = React.useState('yes');
  const [guests, setGuests] = React.useState(1);
  const [sent, setSent] = React.useState(false);
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 560,
        margin: '0 auto',
        padding: '80px 28px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'var(--sage-100)',
        color: 'var(--sage-500)',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Ico, {
      name: "party-popper",
      size: 30
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 40,
        margin: '20px 0 8px',
        color: 'var(--text-strong)'
      }
    }, "See you there!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 17,
        color: 'var(--text-muted)',
        lineHeight: 1.6
      }
    }, "We\u2019ve got you down. ", event.date, ", ", event.place, ". Maya & Theo are so glad you\u2019re coming."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "soft",
      leadingIcon: /*#__PURE__*/React.createElement(Ico, {
        name: "gift",
        size: 17
      }),
      onClick: () => onNavigate('registry')
    }, "Browse the registry")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 560,
      margin: '0 auto',
      padding: '48px 28px 72px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wren-eyebrow"
  }, "RSVP"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 42,
      letterSpacing: '-0.02em',
      margin: '10px 0 6px',
      color: 'var(--text-strong)'
    }
  }, "Will you join us?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--text-muted)',
      margin: '0 0 28px'
    }
  }, event.date, " \xB7 ", event.time, " \xB7 ", event.place), /*#__PURE__*/React.createElement(Card, {
    elevation: "md",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'block',
      marginBottom: 8
    }
  }, "Can you make it?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, [['yes', 'Joyfully yes', 'heart'], ['no', 'Sadly no', 'cloud']].map(([v, label, icon]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setAttending(v),
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 50,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontFamily: 'var(--font-text)',
      fontWeight: 700,
      fontSize: 15,
      border: attending === v ? '1px solid var(--brand)' : '1px solid var(--border-default)',
      background: attending === v ? 'var(--brand-soft)' : 'var(--surface-card)',
      color: attending === v ? 'var(--terracotta-700)' : 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: icon,
    size: 18
  }), label)))), /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    placeholder: "e.g. Maya Olsen"
  }), attending === 'yes' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'block',
      marginBottom: 8
    }
  }, "How many of you?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      padding: '4px 6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setGuests(g => Math.max(1, g - 1)),
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-sunken)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 24,
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-strong)'
    }
  }, guests), /*#__PURE__*/React.createElement("button", {
    onClick: () => setGuests(g => Math.min(6, g + 1)),
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      border: 'none',
      background: 'var(--surface-sunken)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Ico, {
    name: "plus",
    size: 16
  })))), /*#__PURE__*/React.createElement(Input, {
    label: "A note for the parents-to-be (optional)",
    placeholder: "We\u2019re so happy for you both!"
  }), /*#__PURE__*/React.createElement(Button, {
    full: true,
    size: "lg",
    trailingIcon: /*#__PURE__*/React.createElement(Ico, {
      name: "arrow-right",
      size: 18,
      color: "#fff"
    }),
    onClick: () => setSent(true)
  }, "Send RSVP")));
}
Object.assign(window, {
  RsvpView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/RsvpView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/registry/data.js
try { (() => {
// Wren registry — sample data (fake). Exposed as window.WREN.
window.WREN = {
  parents: {
    mother: 'Maya',
    partner: 'Theo'
  },
  event: {
    title: 'A baby shower for our girl',
    date: 'Saturday, August 16',
    time: '2:00 – 5:00 PM',
    place: 'The garden at 14 Linden Way',
    city: 'Portland, OR'
  },
  categories: [{
    id: 'all',
    label: 'All gifts',
    icon: 'sparkles'
  }, {
    id: 'nursery',
    label: 'Nursery',
    icon: 'moon'
  }, {
    id: 'feeding',
    label: 'Feeding',
    icon: 'milk'
  }, {
    id: 'travel',
    label: 'On the go',
    icon: 'baby'
  }, {
    id: 'play',
    label: 'Play & books',
    icon: 'puzzle'
  }, {
    id: 'fund',
    label: 'Group gifts',
    icon: 'users'
  }],
  gifts: [{
    id: 1,
    title: 'Muslin swaddle set',
    store: 'West Elm Kids',
    price: 48,
    category: 'nursery',
    status: 'available',
    mostWanted: true,
    tint: 'var(--sage-100)',
    icon: 'baby'
  }, {
    id: 2,
    title: 'Walnut crib',
    store: 'Crate & Kids',
    price: 399,
    category: 'nursery',
    status: 'available',
    tint: 'var(--terracotta-100)',
    icon: 'bed'
  }, {
    id: 3,
    title: 'Blackout cloud nightlight',
    store: 'Hatch',
    price: 59,
    category: 'nursery',
    status: 'reserved',
    tint: 'var(--ink-100)',
    icon: 'moon'
  }, {
    id: 4,
    title: 'Bottle starter kit',
    store: "Dr. Brown's",
    price: 36,
    category: 'feeding',
    status: 'available',
    tint: 'var(--honey-100)',
    icon: 'milk'
  }, {
    id: 5,
    title: 'High chair, oat',
    store: 'Lalo',
    price: 175,
    category: 'feeding',
    status: 'available',
    mostWanted: true,
    tint: 'var(--sage-100)',
    icon: 'utensils'
  }, {
    id: 6,
    title: 'Convertible car seat',
    store: 'Nuna',
    price: 350,
    category: 'travel',
    status: 'available',
    tint: 'var(--terracotta-100)',
    icon: 'car'
  }, {
    id: 7,
    title: 'Compact stroller',
    store: 'Bugaboo',
    price: 269,
    category: 'travel',
    status: 'fulfilled',
    tint: 'var(--ink-100)',
    icon: 'baby'
  }, {
    id: 8,
    title: 'Soft cloth book bundle',
    store: 'Lovevery',
    price: 28,
    category: 'play',
    status: 'available',
    tint: 'var(--honey-100)',
    icon: 'book-open'
  }, {
    id: 9,
    title: 'Wooden play gym',
    store: 'Lalo',
    price: 92,
    category: 'play',
    status: 'available',
    tint: 'var(--sage-100)',
    icon: 'puzzle'
  }, {
    id: 10,
    title: 'The nursery glider',
    store: 'Group gift',
    category: 'fund',
    status: 'available',
    group: true,
    pledged: 180,
    goal: 420,
    tint: 'var(--terracotta-100)',
    icon: 'armchair'
  }, {
    id: 11,
    title: 'First-year diaper fund',
    store: 'Group gift',
    category: 'fund',
    status: 'available',
    group: true,
    pledged: 240,
    goal: 300,
    tint: 'var(--honey-100)',
    icon: 'heart-handshake'
  }, {
    id: 12,
    title: 'Lambskin play mat',
    store: 'Binibamba',
    price: 120,
    category: 'nursery',
    status: 'available',
    tint: 'var(--sage-100)',
    icon: 'square'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/data.js", error: String((e && e.message) || e) }); }

// ui_kits/registry/shared.jsx
try { (() => {
// Shared helpers for the Wren registry kit. Exposes window.Ico and window.useLucide.
const {
  useRef,
  useEffect
} = React;

// Lucide icon as a React component
function Ico({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = '';
    const el = document.createElement('i');
    el.setAttribute('data-lucide', name);
    ref.current.appendChild(el);
    window.lucide.createIcons({
      attrs: {
        width: size,
        height: size,
        'stroke-width': strokeWidth,
        stroke: color
      }
    });
  }, [name, size, strokeWidth, color]);
  return React.createElement('span', {
    ref,
    style: {
      display: 'inline-flex',
      ...style
    }
  });
}
Object.assign(window, {
  Ico
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/registry/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.GiftCard = __ds_scope.GiftCard;

})();
