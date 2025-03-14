import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Medal, CheckCircle, QrCode, TowerControl } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import MasjidList from '@/components/masjid-list'
import DashboardSummarySholatChampions from '@/components/dashboard-sholat-champions'
import CTABanner from '@/components/cta-banner-masjid'
import { Metadata } from 'next'
import FloatingShare from '@/components/FloatingShare'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sholat Champions 2025 - Kompetisi dan Monitoring Sholat Berjamaah",
    description: "Ikuti Sholat Champions 2025, program kompetisi dan monitoring sholat berjamaah bagi anak-anak dan remaja menggunakan sistem QR Code atau Fingerprint. Raih hadiah bagi peserta terbaik!",
    keywords: "sholat champions, kompetisi sholat, sholat berjamaah, masjid, anak-anak, remaja, monitoring sholat, ramadhan",
    authors: [{ name: "Shollu" }],
    openGraph: {
      title: "Sholat Champions 2025 - Kompetisi dan Monitoring Sholat Berjamaah",
      description: "Ikuti Sholat Champions 2025, program kompetisi dan monitoring sholat berjamaah bagi anak-anak dan remaja menggunakan sistem QR Code atau Fingerprint. Raih hadiah bagi peserta terbaik!",
      images: [{
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Shollu",
      }],
      type: "website",
      url: "https://shollu.com/sholat-champions",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sholat Champions 2025 - Kompetisi dan Monitoring Sholat Berjamaah",
      description: "Ikuti Sholat Champions 2025, program kompetisi dan monitoring sholat berjamaah bagi anak-anak dan remaja menggunakan sistem QR Code atau Fingerprint. Raih hadiah bagi peserta terbaik!",
      images: [
        {
          url: "/favicon.png",
          width: 1200,
          height: 630,
          alt: "Shollu",
        },
      ],
    },
  };
}

export default function HomeSholatChampions() {
  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
            {/* Konten Teks */}
            <div className="flex flex-col items-center p-16 pt-20 text-center lg:items-start lg:text-left">
              <p>Event Ramadhan 2025</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Sholat Champions
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Program Kompetisi dan Monitoring Sholat bagi anak-anak dan remaja untuk membiasakan Sholat berjamaah di Masjid. Menggunakan sistem QR Code atau Fingerprint.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button>
                  Daftar Sekarang
                  <ArrowRight className="size-4" />
                </Button>
                <Link href="#rekapan">
                  <Button variant="ghost">Lihat Rekapan</Button>
                </Link>
              </div>
            </div>
            {/* Gambar */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Santri_Nusantara.jpg"
              alt="placeholder hero"
              className="h-full w-full object-cover order-first lg:order-none"
            />
          </div>
        </div>
      </section>
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          <MasjidList event_id={3} />
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummarySholatChampions />
        </div>
      </section>
      <section>
        <div className="container mx-auto max-w-6xl px-8 lg:px-0">
          <section className="py-10">
            <div className="container flex flex-col gap-28">
              <div className="flex flex-col gap-6 md:gap-20">
              <div className="text-center bg-[#0b685c] text-white p-8 rounded-2xl">
                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  Sholat Champions: Menjadi Pejuang Sholat Berjamaah
                </h2>
                <p className="text-white/80">
                  Program Sholat Champions dirancang untuk membentuk kebiasaan sholat berjamaah sejak dini, dengan sistem pemantauan modern berbasis QR Code atau Fingerprint.
                </p>
                
                <h3 className="mt-6 text-2xl font-semibold">Tujuan Program</h3>
                <ul className="mt-2 text-white/80 text-left mx-auto max-w-2xl">
                  <li>✅ Membiasakan anak-anak dan remaja untuk sholat berjamaah di masjid secara rutin.</li>
                  <li>✅ Memberikan apresiasi bagi peserta yang disiplin dan rajin mengikuti sholat berjamaah.</li>
                  <li>✅ Membangun semangat kompetitif dalam ibadah dengan sistem reward.</li>
                </ul>

                <h3 className="mt-6 text-2xl font-semibold">Reward Program</h3>
                <p className="text-white/80">
                  Peserta terbaik dengan kehadiran sholat berjamaah tertinggi akan mendapatkan hadiah spesial sebagai bentuk apresiasi.
                </p>
              </div>

                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  3 Aktivitas Utama Peserta
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <TowerControl className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Sholat Berjamaah</h3>
                    <p className="text-muted-foreground">
                      Peserta wajib hadir sholat berjamaah lima waktu di masjid yang telah ditentukan.
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <QrCode className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Presensi Digital</h3>
                    <p className="text-muted-foreground">
                      Menggunakan sistem QR Code atau Fingerprint untuk mencatat kehadiran peserta secara otomatis.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Medal className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Kompetisi & Hadiah</h3>
                    <p className="text-muted-foreground">
                      Peserta dengan jumlah kehadiran terbanyak akan mendapatkan penghargaan khusus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
      <FloatingShare
        title="Sholat Champions 2025"
        text="Ikuti Sholat Champions 2025! Tantangan bagi anak-anak untuk menjaga sholat berjamaah dan mendapatkan hadiah menarik!"
        url="https://shollu.com/sholat-champions"
      />
    </>
  )
}