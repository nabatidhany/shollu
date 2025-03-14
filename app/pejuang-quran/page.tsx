import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, CheckCircle, FileText, Users, Star, Medal, NotebookPen, Sunrise, HandHeart } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import MasjidList from '@/components/masjid-list'
import DashboardSummaryPejuangQuran from '@/components/dashboard-pejuang-qura'
import CTABanner from '@/components/cta-banner-masjid'
import { Metadata } from 'next'
import FloatingShare from '@/components/FloatingShare'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pejuang Qur'an 2025 - Membiasakan Sholat dan Tilawah di Bulan Ramadhan",
    description: "Pejuang Qur'an adalah program Ramadhan bagi anak-anak dan remaja untuk membiasakan sholat berjamaah, tilawah Al-Qur'an, dan sholat sunnah syuruq. Bergabung sekarang dan raih keberkahan!",
    keywords: "pejuang qur'an, hafalan quran, tilawah, sholat subuh, syuruq, masjid, anak-anak, remaja, ramadhan",
    authors: [{ name: "Shollu" }],
    openGraph: {
      title: "Pejuang Qur'an 2025 - Membiasakan Sholat dan Tilawah di Bulan Ramadhan",
      description: "Pejuang Qur'an adalah program Ramadhan bagi anak-anak dan remaja untuk membiasakan sholat berjamaah, tilawah Al-Qur'an, dan sholat sunnah syuruq. Bergabung sekarang dan raih keberkahan!",
      images: [{
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Shollu",
      }],
      type: "website",
      url: "https://shollu.com/pejuang-quran",
    },
    twitter: {
      card: "summary_large_image",
      title: "Pejuang Qur'an 2025 - Membiasakan Sholat dan Tilawah di Bulan Ramadhan",
      description: "Pejuang Qur'an adalah program Ramadhan bagi anak-anak dan remaja untuk membiasakan sholat berjamaah, tilawah Al-Qur'an, dan sholat sunnah syuruq. Bergabung sekarang dan raih keberkahan!",
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


export default function HomePejuangQuran() {
  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
            {/* Konten Teks */}
            <div className="flex flex-col items-center p-16 pt-20 text-center lg:items-start lg:text-left">
              <p>Event Ramadhan 2025</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Pejuang Qur'an
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Pejuang Qur'an adalah program yang di rancang khusus untuk anak anak dan remaja selama bulan Ramadhan. Program ini dimulai dari waktu Subuh sampai dengan waktu Syuruq
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
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Santri_Nusantara.jpg"
              alt="placeholder hero"
              className="h-full w-full object-cover order-first lg:order-none"
            />
          </div>
        </div>
      </section>
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          <MasjidList event_id={1} />
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummaryPejuangQuran />
        </div>
      </section>
      <section>
        <div className="container mx-auto max-w-6xl px-8 lg:px-0">
          <section className="py-10">
            <div className="container flex flex-col gap-28">
              <div className="flex flex-col gap-6 md:gap-20">
              <div className="text-center bg-[#0b685c] text-white p-8 rounded-2xl">
                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  Pejuang Qur'an: Menjadi Lebih Dekat dengan Al-Qur'an
                </h2>
                <p className="text-white/80">
                  Program Pejuang Qur'an dirancang untuk membiasakan peserta beribadah lebih baik selama Ramadhan, sesuai dengan sunnah Rasulullah ﷺ.
                </p>
                
                <h3 className="mt-6 text-2xl font-semibold">Tujuan Program</h3>
                <ul className="mt-2 text-white/80 text-left mx-auto max-w-2xl">
                  <li>✅ Melatih peserta untuk terbiasa sholat subuh berjamaah. Fadhilah sholat sunnah fajar saja lebih baik dari dunia dan isinya, apalagi sholat subuh itu sendiri.</li>
                  <li>✅ Membiasakan interaksi dengan Al-Qur'an. Satu huruf saja bernilai 10 kebaikan, apalagi di bulan Ramadhan, bisa berlipat-lipat hingga tak terhingga.</li>
                  <li>✅ Melatih peserta untuk i'tikaf hingga waktu syuruq. Pahala sholat sunnah setelahnya setara dengan umrah dan haji sempurna.</li>
                </ul>

                <h3 className="mt-6 text-2xl font-semibold">Target Program</h3>
                <p className="text-white/80">
                  Peserta Pejuang Qur'an didorong untuk membaca Al-Qur'an sebanyak mungkin, dengan target minimal khatam 1 kali selama Ramadhan bagi peserta yang sudah lancar membaca Al-Qur'an.
                </p>

                <h3 className="mt-6 text-2xl font-semibold">Reward Program</h3>
                <p className="text-white/80">
                  Seluruh peserta akan mendapatkan THR dan hadiah khusus bagi yang berhasil mencapai target khatam 1x, 2x, dan seterusnya. Presensi selama program juga menjadi pertimbangan dalam pemberian reward.
                </p>
              </div>

                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  3 Aktivitas Pokok Peserta
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Sunrise className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Sholat Subuh Berjamaah</h3>
                    <p className="text-muted-foreground">
                      Membiasakan peserta untuk sholat subuh berjamaah di masjid, meraih keberkahan pagi, dan membangun disiplin dalam ibadah.
                    </p>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <BookOpen className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Tilawah Al-Qur'an</h3>
                    <p className="text-muted-foreground">
                      Meningkatkan interaksi dengan Al-Qur'an melalui tilawah rutin, membaca dengan tartil, dan menghayati maknanya.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <HandHeart className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Sholat Sunnah Syuruq</h3>
                    <p className="text-muted-foreground">
                      Melatih peserta untuk berdiam di masjid setelah subuh hingga syuruq, meraih pahala yang setara dengan haji dan umrah sempurna.
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
        title="Pejuang Qur'an 2025"
        text="Ikuti Pejuang Qur'an 2025! Program khusus Ramadhan untuk membiasakan tilawah dan sholat berjamaah. Bergabung sekarang!"
        url="https://shollu.com/pejuang-quran"
      />
    </>
  )
}
