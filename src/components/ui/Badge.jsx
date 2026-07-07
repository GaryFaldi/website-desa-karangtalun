/**
 * Badge Component - Small label/tag for categories
 * 
 * Variants:
 * - primary: Green badge
 * - secondary: Gray badge
 * - info: Blue badge
 * - warning: Yellow badge
 * - danger: Red badge
 * - success: Green badge (lighter)
 * 
 * Sizes:
 * - sm: Small badge
 * - md: Medium (default)
 * - lg: Large badge
 * 
 * @example
 * <Badge variant="primary" size="md">
 *   New
 * </Badge>
 */

import './Badge.css'

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {icon && <span className="badge__icon">{icon}</span>}
      <span className="badge__content">{children}</span>
    </span>
  )
}
