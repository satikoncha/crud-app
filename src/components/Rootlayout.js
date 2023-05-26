import React from 'react'
import { Outlet } from 'react-router-dom'

const Rootlayout = () => {
  return (
    <div className='md:container mx-auto'>
        <Outlet />
    </div>
  )
}

export default Rootlayout
