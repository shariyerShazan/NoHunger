import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div>
    <Navbar />
    <div className="pt-[64px]">
      <Outlet />
    </div>
    <Footer />
  </div>
  )
}

export default MainLayout
