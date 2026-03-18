import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Metrics } from "@/components/Metrics"
import { SocialProof } from "@/components/SocialProof"
import { About } from "@/components/About"
import { Benefits } from "@/components/Benefits"
import { Products } from "@/components/Products"
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
      <Products />
      <CTAFinal />
      <Footer />
    </>
  )
}
