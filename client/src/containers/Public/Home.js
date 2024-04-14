import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Home = () => {

  

  return (
    <>
      <Header />
      <Navigation />
      <div className='flex gap-6 flex-col items-center h-full'>
        <Outlet />
      </div>
    </>
  )
}

export default Home