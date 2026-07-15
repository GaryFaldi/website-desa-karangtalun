/**
 * Skeleton Component - Loading placeholder
 * 
 * @example
 * <Skeleton width="100%" height="20px" />
 * <Skeleton variant="text" />
 * <Skeleton variant="circular" width="40px" height="40px" />
 * <Skeleton variant="rectangular" width="100%" height="200px" />
 */

import './Skeleton.css'

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  ...props
}) {
  const style = {
    width,
    height,
  }

  return (
    <div
      className={`skeleton skeleton--${variant} ${className}`}
      style={style}
      {...props}
    />
  )
}

// Pre-built skeleton patterns
Skeleton.Card = function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton variant="rectangular" width="100%" height="180px" />
      <div className="skeleton-card__body">
        <Skeleton variant="text" width="60%" height="24px" />
        <Skeleton variant="text" width="40%" height="16px" />
        <Skeleton variant="text" width="80%" height="16px" />
      </div>
    </div>
  )
}

Skeleton.List = function SkeletonList({ count = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-list__item">
          <Skeleton variant="circular" width="48px" height="48px" />
          <div className="skeleton-list__content">
            <Skeleton variant="text" width="60%" height="20px" />
            <Skeleton variant="text" width="40%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  )
}
