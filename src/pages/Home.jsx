import React, { useEffect } from 'react'
import BannerOne from '../components/BannerOne'
import BannerTwo from '../components/BannerTwo'
import Extrasection from '../components/extrasection'
import TopQuantitySection from '../components/TopQuantitySection'
import RecentDonatedSection from '../components/RecentDonatedSection'
import TestimonialsSection from '../components/TestimonialsSection'

function Home() {
    useEffect(()=>{
      document.title = "Home | NoHunger"
    }, [])
    
  return (
    <div>
      <BannerOne />
      <BannerTwo />
      <Extrasection />
      <TopQuantitySection />
      <RecentDonatedSection />
      <TestimonialsSection />
    </div>
  )
}

export default Home
