import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/global.css'

// ViteReactSSG({ routes }) — cara yang benar menggunakan vite-react-ssg
// - menerima routes array (data router format), BUKAN JSX <App />
// - otomatis mount ke #root saat dev mode (npm run dev)
// - otomatis generate HTML statis per-route saat build (npm run build)
export const createRoot = ViteReactSSG({ routes })
