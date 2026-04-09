"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Metrics } from "@/components/Metrics"
import { SocialProof } from "@/components/SocialProof"
import { About } from "@/components/About"
import { Benefits } from "@/components/Benefits"
import { Products } from "@/components/Products"
import { CTAFinal } from "@/components/CTAFinal"
import { Footer } from "@/components/Footer"

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: "LP Revenda",
        content_category: "Revenda B2B",
      })
    }
  }, [])

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
