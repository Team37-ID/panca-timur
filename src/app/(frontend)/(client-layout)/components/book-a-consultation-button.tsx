'use client'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const BookAConsultationButton = () => {
  const handleBookaConsultation = () => {
    const pesan = `Halo, saya ingin menanyakan ...`
    const url = `https://wa.me/6281394056196?text=${encodeURIComponent(pesan)}`
    window.open(url, '_blank')
  }
  return (
    <Button
      onClick={handleBookaConsultation}
      className="w-full lg:w-[243px]"
      aria-label="Chat ke WhatsApp Panca Timur Raya untuk Booking Konsultasi"
    >
      <Phone />
      Book a Consultation
    </Button>
  )
}
