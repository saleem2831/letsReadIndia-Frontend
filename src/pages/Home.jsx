import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/home/Hero'
import ChoosePath from '../components/home/ChoosePath'
import HowItWorks from '../components/home/HowItWorks'
import Features from '../components/home/Features'
import Testimonials from '../components/home/Testimonials'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      <ChoosePath />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  )
}