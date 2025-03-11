import {
  BadgeDollarSign,
  Route,
  ShieldCheck,
  Truck,
  Undo2,
  UserRoundCheck,
  Users,
  Ticket,
  MapPin,
  BookOpen,
  Trophy,
  Layers,
  Gift,
  CreditCard,
} from "lucide-react";

const faq = [
  {
    icon: BadgeDollarSign,
    question: "Apakah program ini berbayar?",
    answer: "Tidak, semua program ini gratis dan terbuka untuk umum.",
  },
  {
    icon: UserRoundCheck,
    question: "Bagaimana cara mendaftar Pejuang Itikaf?",
    answer: "Anda bisa mendaftar melalui formulir online di website ini. Klik tombol 'Daftar Sekarang' pada halaman event Itikaf untuk mengisi formulir pendaftaran.",
  },
  {
    icon: Users,
    question: "Apakah anak-anak bisa ikut Pejuang Itikaf?",
    answer: "Bisa, namun harus didampingi oleh orang tua atau wali.",
  },
  {
    icon: Ticket,
    question: "Bagaimana cara mendapatkan kupon sahur gratis?",
    answer: "Setelah scan QR saat absensi masuk, sistem akan otomatis mencetak kupon sahur yang bisa ditukarkan di lokasi sahur gratis.",
  },
  {
    icon: MapPin,
    question: "Apakah Pejuang Quran harus dilakukan di masjid tertentu?",
    answer: "Ya, kegiatan ini hanya bisa dilakukan di masjid-masjid rekanan yang sudah terdaftar dalam sistem.",
  },
  {
    icon: BookOpen,
    question: "Apakah peserta harus membawa Al-Qur'an sendiri?",
    answer: "Disarankan untuk membawa Al-Qur'an sendiri, tetapi beberapa masjid juga menyediakan mushaf untuk digunakan.",
  },
  {
    icon: Trophy,
    question: "Bagaimana cara menentukan pemenang Sholat Champion?",
    answer: "Pemenang ditentukan berdasarkan jumlah kehadiran dan kecepatan dalam menghadiri sholat berjamaah di masjid.",
  },
  {
    icon: Layers,
    question: "Bisakah saya mengikuti lebih dari satu program?",
    answer: "Tentu, Anda bisa mengikuti lebih dari satu program selama jadwalnya tidak bertabrakan.",
  },
  {
    icon: Gift,
    question: "Apakah ada hadiah bagi pemenang?",
    answer: "Ya, setiap program memiliki sistem penghargaan dan hadiah bagi peserta terbaik.",
  },
  {
    icon: CreditCard,
    question: "Bagaimana jika saya kehilangan kartu QR?",
    answer: "Anda bisa menghubungi panitia di masjid penyelenggara untuk mencetak ulang kartu QR Anda.",
  },
];

const FAQ = () => {
  return (
    <div
      id="faq"
      className="min-h-screen flex items-center justify-center px-6 py-12 xs:py-11"
    >
      <div className="max-w-screen-lg">
        <h2 className="text-3xl xs:text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight text-center">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 xs:text-lg text-center text-muted-foreground">
          Punya pertanyaan? Lihat jawaban di bawah ini atau hubungi tim dukungan kami.
        </p>

        <div className="mt-12 grid md:grid-cols-2 bg-background rounded-xl overflow-hidden outline outline-[1px] outline-border outline-offset-[-1px]">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div key={question} className="border p-6 -mt-px -ml-px">
              <div className="h-8 w-8 xs:h-10 xs:w-10 flex items-center justify-center rounded-full bg-accent">
                <Icon className="h-4 w-4 xs:h-6 xs:w-6" />
              </div>
              <div className="mt-3 mb-2 flex items-start gap-2 text-lg xs:text-[1.35rem] font-semibold tracking-tight">
                <span>{question}</span>
              </div>
              <p className="text-sm xs:text-base">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
