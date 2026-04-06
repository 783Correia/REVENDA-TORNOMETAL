"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Metrics } from "@/components/Metrics"
import { SocialProof } from "@/components/SocialProof"
import { About } from "@/components/About"
import { Benefits } from "@/components/Benefits"
import { Products } from "@/components/Products"
import { CTAFinal } from "@/components/CTAFinal"
import { Footer } from "@/components/Footer"
import { FormModal } from "@/components/FormModal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Navbar />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Metrics />
      <SocialProof />
      <About />
      <Benefits />
      <Products />
      <CTAFinal />
      <Footer />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
