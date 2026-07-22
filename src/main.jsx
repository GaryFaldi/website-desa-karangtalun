import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './styles/global.css'

// ViteReactSSG({ routes }) — cara yang benar menggunakan vite-react-ssg
export const createRoot = ViteReactSSG({ routes })
