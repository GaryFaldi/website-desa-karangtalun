/**
 * EmptyState Component - Display when no data available
 * 
 * @example
 * <EmptyState
 *   icon="🔍"
 *   title="Tidak ada data"
 *   description="Belum ada fasilitas untuk kategori ini."
 *   action={<Button>Tambah Data</Button>}
 * />
 */

import './EmptyState.css'

export default function EmptyState({
  icon = '📭',
  title = 'Tidak ada data',
  description,
  action,
  className = '',
}) {
  return (
    <div className={`empty-state ${className}`}>
      {icon && <div className="empty-state__icon">{icon}</div>}
      {title && <h3 className="empty-state__title">{title}</h3>}
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}
