import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Metrics } from "@/components/Metrics"
import { About } from "@/components/About"
import { Benefits } from "@/components/Benefits"
import { Products } from "@/components/Products"
import { Categories } from "@/components/Categories"
import { Testimonials } from "@/components/Testimonials"
import { CTAFinal } from "@/components/CTAFinal"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <About />
      <Benefits />
      <Products />
      <Categories />
      <Testimonials />
      <CTAFinal />
      <Footer />
    </>
  )
}
