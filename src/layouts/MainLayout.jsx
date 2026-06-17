import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const MainLayout = () => (
  <div className="app-shell">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default MainLayout
