import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, CheckCircle, FileText, Users, Star, Medal, NotebookPen } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import MasjidList from '@/components/masjid-list'
import DashboardSummaryPejuangQuran from '@/components/dashboard-pejuang-qura'
import CTABanner from '@/components/cta-banner-masjid'

export default function HomePejuangQuran() {
  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
            {/* Konten Teks */}
            <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
              <p>Event Ramadhan 2025</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Pejuang Quran
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                <strong><i>"Mewujudkan Generasi Pecinta Al-Qur'an"</i></strong> Pejuang Quran adalah program untuk anak-anak dalam menghafal dan memahami Al-Qur'an dengan metode yang menyenangkan. Absensi dan pencapaian hafalan dicatat secara digital dengan QR Code.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Button>
                  Daftar Sekarang
                  <ArrowRight className="size-4" />
                </Button>
                <Link href="#rekapan">
                  <Button variant="ghost">Lihat Rekapan Hafalan</Button>
                </Link>
              </div>
            </div>
            {/* Gambar */}
            <img
              src="https://shadcnblocks.com/images/block/placeholder-1.svg"
              alt="placeholder hero"
              className="h-full w-full object-cover order-first lg:order-none"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto max-w-6xl px-8 lg:px-0">
          <section className="py-10">
            <div className="container flex flex-col gap-28">
              <div className="flex flex-col gap-6 md:gap-20">
                <div className="text-center bg-[#0b685c] text-white p-8 rounded-2xl">
                  <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                    Menjadi Hafidz di Usia Muda
                  </h2>
                  <p className="text-white/80">
                    Menghafal Al-Qur'an sejak dini adalah investasi terbesar dalam kehidupan seorang anak. Rasulullah ﷺ bersabda:
                  </p>
                  <blockquote className='quote mt-2 text-xl italic font-semibold text-white dark:text-white ml-4'>
                    "Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengajarkannya." (HR. Bukhari)
                  </blockquote>
                  <p className="text-white/80 mt-4">
                    Bergabung dengan Pejuang Quran berarti membimbing anak-anak kita untuk mencintai dan menjaga Kalamullah dengan cara yang menyenangkan dan penuh semangat.
                  </p>
                </div>
                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  Apa yang Akan Didapatkan?
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <BookOpen className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Program Hafalan Terstruktur
                    </h3>
                    <p className="text-muted-foreground">
                      Hafalan dibimbing dengan metode yang sistematis agar mudah dipahami dan diingat.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <NotebookPen className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Evaluasi Hafalan
                    </h3>
                    <p className="text-muted-foreground">
                      Hafalan dievaluasi secara berkala untuk memastikan perkembangan peserta.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Users className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Lingkungan Hafidz Muda
                    </h3>
                    <p className="text-muted-foreground">
                      Anak-anak akan belajar dalam lingkungan yang mendukung dan penuh semangat.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Star className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Motivasi dan Hadiah
                    </h3>
                    <p className="text-muted-foreground">
                      Setiap pencapaian akan diberikan apresiasi agar peserta semakin bersemangat.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Medal className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Sertifikat Hafalan
                    </h3>
                    <p className="text-muted-foreground">
                      Setiap peserta akan mendapatkan sertifikat sesuai pencapaian hafalan mereka.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          <DashboardSummaryPejuangQuran />
          <hr className='my-8 border-t border-muted-2' />
          <MasjidList />
        </div>
      </section>
      <section>
        <CTABanner />
      </section>
    </>
  )
}
