import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight, CircleArrowRight, Files, HandHelping, Moon, NotebookPen, Settings, Soup, Users } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import MasjidList from '@/components/masjid-list'
import DashboardSummaryItikaf from '@/components/dashboard-itikaf'
import CTABanner from '@/components/cta-banner-masjid'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Itikaf Akbar 2025 - Mendekatkan Diri kepada Allah",
    description: "Ikuti Itikaf Akbar 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
    keywords: "itikaf, itikaf akbar, ramadhan, ibadah, masjid, qiyamul lail, sahur bersama, sholat malam",
    authors: [{ name: "Itikaf Akbar 2025" }],
    openGraph: {
      title: "Itikaf Akbar 2025 - Mendekatkan Diri kepada Allah",
      description: "Ikuti Itikaf Akbar 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
      images: [{
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Shollu",
      }],
      type: "website",
      url: "https://shollu.com/itikaf-akbar",
    },
    twitter: {
      card: "summary_large_image",
      title: "Itikaf Akbar 2025 - Mendekatkan Diri kepada Allah",
      description: "Ikuti Itikaf Akbar 2025 di berbagai masjid rekanan kami. Program eksklusif untuk mendekatkan diri kepada Allah di 10 malam terakhir Ramadhan.",
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
            <div className="flex flex-col items-center p-16 text-center lg:items-start lg:text-left">
              <p>Event Ramadhan 2025</p>
              <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                Itikaf Akbar
              </h1>
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                <strong><i>"Meningkatkan Kedekatan dengan Allah melalui Itikaf"</i></strong> Itikaf Akbar adalah program yang mengajak kaum Muslimin untuk beritikaf di masjid-masjid rekanan kami.
                Absensi peserta dilakukan dengan QR Code, memastikan pencatatan yang akurat dan transparan.
              </p>
              <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
                <Link href={`/itikaf-akbar/register`}>
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
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          <MasjidList event_id={2} />
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummaryItikaf />
        </div>
      </section>
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
                    Itikaf adalah salah satu amalan istimewa di bulan Ramadhan, terutama di 10 malam terakhir. Rasulullah ﷺ bersabda:
                  </p>
                  <blockquote className='quote mt-2 text-lg italic font-semibold text-white dark:text-white ml-4'>
                    Barang siapa yang melakukan itikaf dengan penuh keimanan dan mengharapkan pahala dari Allah, maka diampuni dosa-dosanya yang telah lalu. (HR. Bukhari & Muslim)
                  </blockquote>
                  <p className="text-white/80 mt-4">
                    Itikaf Akbar bukan sekadar berdiam diri di masjid, tetapi juga momen untuk memperbanyak ibadah, muhasabah diri, dan mendekatkan hati kepada Allah. Bergabung dalam Itikaf Akbar berarti bergabung dalam perjalanan spiritual yang penuh keberkahan.
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
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Suasana Khusyuk & Nyaman
                    </h3>
                    <p className="text-muted-foreground">
                      Masjid-masjid yang bekerja sama telah dipersiapkan dengan baik agar jamaah dapat beribadah dengan tenang.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <NotebookPen className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Kajian & Tausiyah
                    </h3>
                    <p className="text-muted-foreground">
                      Setiap malam akan ada kajian inspiratif dari para asatidz untuk menambah ilmu dan keimanan.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Users className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Qiyamul Lail Berjamaah
                    </h3>
                    <p className="text-muted-foreground">
                      Bangun malam menjadi lebih mudah dengan shalat tahajud berjamaah.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <Soup className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Sahur Bersama
                    </h3>
                    <p className="text-muted-foreground">
                      Tersedia sahur gratis untuk para peserta.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                      <HandHelping className="size-5" />
                    </div>
                    <h3 className="mt-2 mb-3 text-lg font-semibold">
                      Doa Bersama di Malam Lailatul Qadar
                    </h3>
                    <p className="text-muted-foreground">
                      Mari bersama-sama memohon ampunan dan keberkahan di malam yang lebih baik dari seribu bulan.
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
    </>
  )
}
