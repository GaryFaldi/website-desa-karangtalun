/**
 * Button Component - Reusable button with variants
 * 
 * Variants:
 * - primary: Primary action button (green)
 * - secondary: Secondary action button
 * - outline: Outlined button
 * - ghost: Text-only button
 * - danger: Destructive action (red)
 * 
 * Sizes:
 * - sm: Small button
 * - md: Medium (default)
 * - lg: Large button
 * 
 * @example
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 */

import { Link } from 'react-router-dom'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  href,
  to,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {loading && <span className="btn__spinner" />}
      <span className="btn__content">{children}</span>
    </>
  )

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        {...props}
      >
        {content}
      </a>
    )
  }

  // Internal link
  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        aria-disabled={disabled || loading}
        {...props}
      >
        {content}
      </Link>
    )
  }

  // Button
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
