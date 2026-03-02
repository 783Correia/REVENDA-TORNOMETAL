import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Metrics } from "@/components/Metrics"
import { SocialProof } from "@/components/SocialProof"
import { About } from "@/components/About"
import { Benefits } from "@/components/Benefits"
import { ProductCarousel } from "@/components/ProductCarousel"
import { Testimonials } from "@/components/Testimonials"
import { CTAFinal } from "@/components/CTAFinal"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <SocialProof />
      <About />
      <Benefits />
      <ProductCarousel />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </>
  )
}

