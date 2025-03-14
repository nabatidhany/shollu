import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/ui/marquee";
import Link from "next/link";
import React, { ComponentProps } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ahmad Fadilah",
    designation: "Peserta Pejuang Qur'an",
    company: "Masjid Al-Falah",
    testimonial:
      "Program Pejuang Qur'an sangat membantu saya dalam meningkatkan hafalan. Suasananya nyaman dan penuh semangat!",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Siti Aisyah",
    designation: "Peserta Pejuang Itikaf",
    company: "Masjid An-Nur",
    testimonial:
      "Itikaf di masjid rekanan ini benar-benar membawa ketenangan. Sistem QR untuk absensi juga memudahkan sekali!",
    avatar: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    id: 3,
    name: "Rizky Maulana",
    designation: "Peserta Sholat Champion",
    company: "Masjid At-Taqwa",
    testimonial:
      "Kompetisi Sholat Champion membuat saya lebih bersemangat datang lebih awal ke masjid. Benar-benar seru dan bermanfaat!",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 4,
    name: "Fatimah Zahra",
    designation: "Orang Tua Peserta",
    company: "Masjid Al-Hikmah",
    testimonial:
      "Anak saya sangat termotivasi untuk lebih rajin sholat dan menghafal Quran. Terima kasih atas program luar biasa ini!",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    id: 5,
    name: "Ustadz Hidayat",
    designation: "Panitia Pejuang Itikaf",
    company: "Masjid Al-Ikhlas",
    testimonial:
      "Sistem yang digunakan dalam program ini sangat membantu kami dalam mengelola peserta. InsyaAllah tahun depan lebih banyak lagi yang ikut!",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
  },
];


const Testimonials = () => (
  <div id="testimonials" className="flex justify-center items-center py-20">
    <div className="h-full w-full">
      <h2 className="mb-12 text-4xl md:text-5xl font-bold text-center tracking-tight px-6">
        Testimonials
      </h2>
      <div className="relative">
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
        <Marquee pauseOnHover className="[--duration:20s]">
          <TestimonialList />
        </Marquee>
        <Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
          <TestimonialList />
        </Marquee>
      </div>
    </div>
  </div>
);

const TestimonialList = () =>
  testimonials.map((testimonial) => (
    <div
      key={testimonial.id}
      className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        </div>
      </div>
      <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
    </div>
  ));

export default Testimonials;
