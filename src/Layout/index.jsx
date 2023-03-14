import React from 'react'
import { Outlet } from 'react-router-dom';
import TopNavbar from '../components/TopNavbar';


function Layout() {
  return (
    <div>
      <TopNavbar />
      <Outlet />
    </div>
  )
}

export default Layout