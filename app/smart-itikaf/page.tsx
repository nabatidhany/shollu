import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, CircleArrowRight, Files, HandHelping, Moon, NotebookPen, Settings, Soup, Users } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import MasjidList from '@/components/masjid-list'
import DashboardSummaryItikaf from '@/components/dashboard-itikaf'
import CTABanner from '@/components/cta-banner-masjid'
import { Metadata } from 'next'
import FloatingShare from '@/components/FloatingShare'
import StatistikEvent from '@/components/statistik-event'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Smart I'tikaf 2025 - Mendekatkan Diri kepada Allah",
    description: "Ikuti Smart I'tikaf 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
    keywords: "i'tikaf, Smart I'tikaf, ramadhan, ibadah, masjid, qiyamul lail, sahur bersama, sholat malam",
    authors: [{ name: "Smart I'tikaf 2025" }],
    openGraph: {
      title: "Smart I'tikaf 2025 - Mendekatkan Diri kepada Allah",
      description: "Ikuti Smart I'tikaf 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
      images: [{
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Shollu",
      }],
      type: "website",
      url: "https://shollu.com/smart-itikaf",
    },
    twitter: {
      card: "summary_large_image",
      title: "Smart I'tikaf 2025 - Mendekatkan Diri kepada Allah",
      description: "Ikuti Smart I'tikaf 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
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


export default function HomeItikafAkbar() {
  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="bg-muted-2 grid items-center gap-8 lg:grid-cols-2">
            {/* Konten Teks */}
            <div className="flex flex-col items-center pt-20 p-16 text-center lg:items-start lg:text-left">
              <p>Event Ramadhan 2025</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Smart I'tikaf
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                Smart I'tikaf adalah sebuah Agregator/Platform yang membantu Pemerintahan dan Panitia I'tikaf dalam mentransformasikan absensi manual ke absensi digital dengan sistem QR Code, sehingga dapat memantau jumlah peserta I'tikaf di kota tertentu.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Link href={`/smart-itikaf/register`}>
                  <Button>
                    Daftar Sekarang
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
                <Link href="#rekapan">
                  <Button variant="ghost">Lihat Rekapan Masjid</Button>
                </Link>
              </div>
            </div>
            {/* Gambar */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Iranian_youth_at_the_Itikaf_%282016%29.jpg"
              alt="placeholder hero"
              className="h-full w-full object-cover order-first lg:order-none"
            />
          </div>
        </div>
      </section>
      <StatistikEvent id_event={2} />
      {/* <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          <MasjidList event_id={2} />
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummaryItikaf />
        </div>
      </section> */}
      <section>
        <div className="container mx-auto max-w-6xl px-8 lg:px-0">
          <section className="py-10">
            <div className="container flex flex-col gap-28">
              <div className="flex flex-col gap-6 md:gap-20">
                <div className="text-center bg-[#0b685c] text-white p-8 rounded-2xl">
                  <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                    Mendekatkan Diri kepada Allah di 10 Malam Terakhir
                  </h2>
                  <p className="text-white/80">
                    I'tikaf adalah salah satu ibadah yang dilakukan di bulan Ramadhan, yaitu berdiam diri di masjid untuk beribadah dan mendekatkan diri kepada Allah di 10 malam terakhir
                  </p>
                  <p className='mt-4'>Fadhilah (Keutamaan) i'tikaf adalah:</p>
                  <ol className='text-white/80'>
                    <li>1. Mencari Lailatul Qadar (malam yang lebih baik dari 1000 bulan)</li>
                    <li>2. Meningkatkan kualitas ibadah dan mendekatkan diri kepada Allah.</li>
                    <li>3. Mencari keberkahan dan ampunan dari Allah.</li>
                    <li>4. Menghindari kesibukan duniawi dan fokus pada ibadah.</li>
                    <li>5. Meningkatkan kesadaran spritual dan menguatkan iman.</li>
                  </ol>
                  <p className='mt-4'>Syarat dan Ketentuan I'tikaf:</p>
                  <ul className='text-white/80'>
                    <li>1. Berada di dalam masjid dengan 2 macam: malam saja dan full day</li>
                    <li>2. Tidak keluar dari masjid kecuali untuk keperluan yang sangat penting.</li>
                    <li>3. Fokus pada ibadah, seperti shalat, membaca Al-Quran, dan berdzikir</li>
                  </ul>
                  <p className="text-white/80 mt-4">
                    Smart I'tikaf bukan sekadar berdiam diri di masjid, tetapi juga momen untuk memperbanyak ibadah, muhasabah diri, dan mendekatkan hati kepada Allah. Bergabung dalam Smart I'tikaf berarti bergabung dalam perjalanan spiritual yang penuh keberkahan.
                  </p>
                  <p className="text-white/100 mt-4">
                    Untuk Informasi Infaq malam Lailatur Qadar untuk Wakaf Mesin dan Operasional Festival Pejuang Sholat dan konfirmasi 0821 2674 3684 No Rekening: BSI 7269942872 an. Rumah Pemimpin Inspirasi
                  </p>
                </div>
                <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
                  Apa yang Akan Anda Dapatkan?
                </h2>
                <div className="grid gap-10 md:grid-cols-3">
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Moon className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Ibadah Pribadi</h3>
                    <p className="text-muted-foreground">
                      Setiap jamaah memiliki kesempatan untuk mendekatkan diri kepada Allah dengan ibadah pribadi yang lebih khusyuk.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Users className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Sholat Tahajjud</h3>
                    <p className="text-muted-foreground">
                      Bangun malam dan laksanakan sholat tahajjud berjamaah untuk memperoleh keberkahan.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Soup className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Sahur Gratis</h3>
                    <p className="text-muted-foreground">
                      Jamaah mendapatkan sahur gratis agar tetap kuat menjalani ibadah puasa.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <NotebookPen className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Kajian Subuh</h3>
                    <p className="text-muted-foreground">
                      Setelah sholat subuh, jamaah dapat mengikuti kajian keislaman yang memperdalam pemahaman agama.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <HandHelping className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Zikir Pagi</h3>
                    <p className="text-muted-foreground">
                      Mengawali hari dengan zikir pagi untuk mendapatkan ketenangan hati dan keberkahan.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Users className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">Program Khusus</h3>
                    <p className="text-muted-foreground">
                      Setiap Masjid dan Mushalla penyelenggara memiliki program tersendiri untuk meningkatkan keimanan jamaah.
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
        title="Smart I'tikaf 2025"
        text="Ikuti Smart I'tikaf 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan."
        url="https://shollu.com/smart-itikaf"
      />
    </>
  )
}
