"use client"
import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { link } from "fs";

const heroSlides = [
  // {
  //   title: "Pejuang Qur'an",
  //   description: `
  //     Pejuang Qur'an adalah program tilawah Al-Quran yang di rancang khusus untuk anak-anak dan remaja dengan target minimal satu kali khatam. Dengan pencatatan berbasis QR code
  //   `,
  //   image: "https://images.unsplash.com/photo-1683355879158-8f4d2225067c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   cta: "Lihat Detail Event",
  //   link: '/pejuang-quran'
  // },
  {
    title: "Smart I'tikaf",
    description: `
      Smart I'tikaf adalah sebuah Agregator/Platform yang membantu Pemerintahan dan Panitia I'tikaf dalam mentransformasikan absensi manual ke absensi digital dengan sistem QR Code, sehingga dapat memantau jumlah peserta I'tikaf di Kota tertentu
    `,
    image: "https://images.unsplash.com/photo-1582391167702-81c7c41fb383?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cta: ["Lihat Detail Event", "Daftar Sekarang"],
    link: '/smart-itikaf',
    link2: '/smart-itikaf/register'
  },
  // {
  //   title: "Sholat Champions",
  //   description: `
  //     Sholat Champions adalah Program Kompetisi dan Monitoring Sholat bagi anak-anak dan remaja untuk membiasakan Sholat berjamaah di Masjid. Dengan menggunakan sistem QR Code atau Finger print. Peserta terbaik akan mendapatkan hadiah
  //   `,
  //   image: "https://images.unsplash.com/photo-1616261371178-9e9490303aef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   cta: "Lihat Detail Event",
  //   link: '/sholat-champions'
  // }
];

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-screen">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="relative h-full flex items-center justify-center text-center text-white px-4">
                  <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-lg mb-8">{slide.description}</p>
                    <div className="flex flex-col lg:max-w-xs max-w-full mx-auto gap-4 justify-center">
                      <Link href={slide.link}>
                        <Button variant="default" className="bg-[#0b685c] hover:bg-[#165c53]" size="lg">
                          {typeof slide.cta === "string" ? slide.cta : slide.cta[0]}
                        </Button>
                      </Link>
                      {Array.isArray(slide.cta) && (
                        <Link href={slide.link2 || '/'}>
                          <Button variant="secondary" size="lg">
                            {slide.cta[1]}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Hero;
