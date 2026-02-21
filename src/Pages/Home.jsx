import React from 'react'
import Hero from '../Components/Home/Hero'
import TrustedBrands from '../Components/Home/TrustedBrands'
import Features from '../Components/Home/Features'
import HowItWorks from '../Components/Home/HowItWorks'
import Testimonials from '../Components/Home/Testimonials'
import CallToAction from '../Components/Home/CallToAction'
import Footer from '../Components/Home/Footer'

const Home = () => {
  return (
    <div>
        <Hero/>
        <TrustedBrands/>
        <Features/>
        <HowItWorks/>
        <Testimonials/>
        <CallToAction/>
        <Footer/>
    </div>
  )
}

export default Home