/**
 * Card Component - Reusable card container
 * 
 * Variants:
 * - default: Basic white card with border
 * - elevated: Card with shadow
 * - hoverable: Card with hover effect
 * - clickable: Hoverable + cursor pointer
 * 
 * @example
 * <Card variant="hoverable">
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 */

import './Card.css'

export default function Card({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
  as: Component = 'div',
  ...props 
}) {
  const variantClass = `card--${variant}`
  const clickableClass = onClick ? 'card--clickable' : ''
  
  return (
    <Component 
      className={`card ${variantClass} ${clickableClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  )
}

// Sub-components
Card.Header = function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '', ...props }) {
  return (
    <div className={`card__body ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.Image = function CardImage({ src, alt, className = '', ...props }) {
  return (
    <div className={`card__image ${className}`}>
      <img src={src} alt={alt} loading="lazy" {...props} />
    </div>
  )
}

Card.Title = function CardTitle({ children, className = '', as: Component = 'h3', ...props }) {
  return (
    <Component className={`card__title ${className}`} {...props}>
      {children}
    </Component>
  )
}

Card.Description = function CardDescription({ children, className = '', ...props }) {
  return (
    <p className={`card__description ${className}`} {...props}>
      {children}
    </p>
  )
}
