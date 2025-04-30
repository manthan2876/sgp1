import Navbar from '../Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'

function GuestLayout() {
  return (
      <div className="bg-background-light dark:bg-background-dark">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default GuestLayout
