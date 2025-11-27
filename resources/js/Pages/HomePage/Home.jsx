import BackToTop from '@/HomeComponents/BackToTop'
import Choose from '@/HomeComponents/Choose'
import Footer from '@/HomeComponents/Footer'
import Hero from '@/HomeComponents/Hero'
import NavBar from '@/HomeComponents/NavBar'
import PropertyCard from '@/HomeComponents/PropertyCard'
import Testimonials from '@/HomeComponents/Testimonials'
import React from 'react'

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <PropertyCard/>
      <Choose/>
      <Testimonials/>
      <BackToTop/>
      <Footer/>
    </div>
  )
}

export default Home
