import React, { useEffect } from 'react'
import BannerOne from '../components/BannerOne'
import BannerTwo from '../components/BannerTwo'
import Extrasection from '../components/extrasection'

function Home() {
    useEffect(()=>{
      document.title = "Home | NoHunger"
    }, [])
    
  return (
    <div>
      <BannerOne />
      <BannerTwo />
      <Extrasection />
    </div>
  )
}

export default Home
