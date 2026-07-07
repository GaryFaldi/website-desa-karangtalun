import { Outlet, ScrollRestoration } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Navigation />
      <main id="main-content" className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
