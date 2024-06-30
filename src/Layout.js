import  {React, useEffect, useState } from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <main>
        <Outlet/>
    </main>
  )
}

export default Layout