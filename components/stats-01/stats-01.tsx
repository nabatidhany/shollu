import React from "react";

const Stats01Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center max-w-2xl mx-auto text-center">
      <div className="max-w-screen-xl mx-auto py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold">Shollu</h2>
        <p className="mt-6 text-lg px-2">Selamat datang di platform resmi untuk tiga program utama kami: Pejuang Qur'an, Smart Itikaf, dan Sholat Champions.
        Mari berkontribusi dalam memperbanyak amal ibadah dan mencatat perjalanan spiritual Anda dengan sistem modern berbasis QR Code.</p>

        <div className="mt-16 sm:mt-24 px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 justify-center text-center">
          <div className="w-full">
            <span className="text-5xl font-semibold">+20</span>
            <p className="mt-6 text-lg">
              Lebih dari 20 masjid telah bergabung dengan program kami
            </p>
          </div>
          <div className="w-full">
            <span className="text-5xl font-bold text-[#0b685c]">+1000</span>
            <p className="mt-6 text-lg">
              Lebih dari 1000 anak telah mendaftar dan aktif dalam program
            </p>
          </div>
          <div className="w-full">
            <span className="text-5xl font-semibold">90%</span>
            <p className="mt-6 text-lg">
              90% peserta program telah meningkatkan kehadiran di masjid
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats01Page;
