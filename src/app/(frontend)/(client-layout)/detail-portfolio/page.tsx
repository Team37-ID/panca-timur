'use client'

import Image from 'next/image'
import Navbar from '../components/navbar'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Footer from '../components/footer'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

import { useQuery } from '@tanstack/react-query'
import { PayloadSDK } from '@payloadcms/sdk'
import { Config } from '../../../../payload-types'
import { Skeleton } from '@/components/ui/skeleton'

const GalleryAll = dynamic(() => import('./components/gallery-all'), { ssr: false })

type GalleryItem = {
  src: string
  alt: string
}

export default function PortfolioPage() {
  const handleBookaConsultation = () => {
    const pesan = `Halo, saya ingin menanyakan ...`
    const url = `https://wa.me/6281394056196?text=${encodeURIComponent(pesan)}`
    window.open(url, '_blank')
  }

  const [currentTab, setCurrentTab] = useState('all')

  const sdk = new PayloadSDK<Config>({
    baseURL: '/api',
  })

  const query = useQuery({
    queryKey: ['portofolio', currentTab],

    queryFn: async ({ queryKey: [, currentTab] }) => {
      let data
      if (currentTab !== 'all') {
        data = await sdk.find({
          collection: 'portofolio',
          limit: 0,
          where: {
            tag: {
              equals: currentTab,
            },
          },
        })
      } else {
        data = await sdk.find({
          collection: 'portofolio',
          limit: 0,
        })
      }
      const imageData: GalleryItem[] = data.docs.map((data) => {
        if (typeof data.image === 'string') {
          return {
            src: data.image,
            alt: data.image,
          }
        } else {
          return {
            src: data.image.url ?? '',
            alt: data.image.alt,
          }
        }
      })
      return imageData
    },
  })

  useEffect(() => {
    if (query.data) {
      console.log(query.data)
    } else {
      console.log('fail')
    }
  }, [query.isLoading, query.data])
  return (
    <>
      <Navbar />
      <div className="relative w-full h-[122px] md:h-[244px] xl:h-[400px]">
        <Image
          className="object-cover"
          fill
          alt="Image Portfolio"
          src={'/dokumPancaTimurR/hvac1.jpg'}
        />
      </div>
      <div className="flex flex-col lg:flex-row px-[24px] py-[12px] md:px-[44px] md:py-[20px]  xl:px-[68px] xl:py-[58px] ">
        <h1 className="titleh1 text-[#0062B0] w-full">
          Proven Experience in <br className="hidden xl:block" />
          Mechanical Electrical <br className="hidden xl:block" />
          and Plumbing Works
        </h1>
        <div className="lg:max-w-[500px]">
          <p className="alternative my-[20px] lg:mb-[30px]">
            Solusi Mechanical, Electrical, dan Plumbing untuk berbagai kebutuhan proyek. Dirancang
            dengan perencanaan matang, standar keselamatan, dan efisiensi kerja. Mendukung performa
            bangunan yang andal dan berkelanjutan.
          </p>
          <div>
            <Button
              onClick={handleBookaConsultation}
              className="w-full lg:w-[243px]"
              aria-label="Chat ke WhatsApp Panca Timur Raya untuk Booking Konsultasi"
            >
              <Phone />
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>

      <div className="px-[20px] md:px-[44px]">
        <h1 className="titleh1 py-[19px] text-[#10385d]">Portfolio</h1>
        <p className="p text-[#747775]">Selected projects delivered by our experienced team.</p>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <ScrollArea className="w-full  py-4 ">
            <TabsList className="flex w-max flex-nowrap justify-start">
              <TabsTrigger onClick={() => setCurrentTab('all')} value="all">
                All
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setCurrentTab('Mechanical & Plumbing')}
                value="mechanicalplumbing"
              >
                Mechanical & Plumbing
              </TabsTrigger>
              <TabsTrigger onClick={() => setCurrentTab('HVAC')} value="hvac">
                HVAC
              </TabsTrigger>
              <TabsTrigger onClick={() => setCurrentTab('Electrical')} value="electrical">
                Electrical
              </TabsTrigger>
              <ScrollBar orientation="horizontal" />
            </TabsList>
          </ScrollArea>

          {/* TODO : if its needed, use useInfiniteQuery */}

          <TabsContent value="all" className="mt-[8px] md:mt-0">
            <div className="relative min-h-[500px]">
              {!query.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-y-[16px] md:gap-y-[24px] lg:gap-y-[44px]">
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                </div>
              ) : (
                <GalleryAll items={query.data} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="mechanicalplumbing" className="mt-[8px] md:mt-0">
            <div className="relative min-h-[500px]">
              {!query.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-y-[16px] md:gap-y-[24px] lg:gap-y-[44px]">
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                </div>
              ) : (
                <GalleryAll items={query.data} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="hvac" className="mt-[8px] md:mt-0">
            <div className="relative min-h-[500px]">
              {!query.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-y-[16px] md:gap-y-[24px] lg:gap-y-[44px]">
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                </div>
              ) : (
                <GalleryAll items={query.data} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="electrical" className="mt-[8px] md:mt-0">
            <div className="relative min-h-[500px]">
              {!query.data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-y-[16px] md:gap-y-[24px] lg:gap-y-[44px]">
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                  <Skeleton className="relative bg-gray-100 w-[350px] h-[467px] object-cover my-[16px] md:my-[24px] lg:my-[44px]" />
                </div>
              ) : (
                <GalleryAll items={query.data} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </>
  )
}
