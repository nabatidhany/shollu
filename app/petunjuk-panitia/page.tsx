"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PanduanPetugas() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 mt-24">
      <p className="font-bold text-2xl uppercase text-center">Panduan Petugas</p>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">📢 Pengenalan tentang Smart I'tikaf</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 dark:text-gray-300">
          Smart I'tikaf adalah Program Digitalisasi absensi yang memudahkan Panitia I'tikaf dalam mendata peserta dengan sistem QR Code, sehingga dapat memantau jumlah peserta I'tikaf secara real-time 📊. Program ini terselenggara berkat kerjasama Shollu bersama Ikadi Padang & Agam. Program ini Gratis dan sangat memudahkan kerja Panitia I'tikaf 📝📲
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">📝 Alur Kerja Panitia/PJ I'tikaf</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <ul className="list-disc pl-5 space-y-2">
            <li>💡 Petugas mendaftarkan Masjid (Bila belum terdaftar di website) dengan mengirimkan data ke admin: Nama masjid, alamat, Nama PJ, No WA PJ kirim ke admin <strong>082126743684</strong>.</li>
            <li>💡 Petugas mendownload aplikasi Shollu di PlayStore.</li>
            <li>💡 Isikan no WA Panitia/PJ di user name dan Password yang telah diberikan (jika belum menerima password silahkan hubungi pihak shollu).</li>
            <li>💡 Share Broadcast Smart I'tikaf untuk informasi pendaftaran peserta online di <strong>Shollu.com</strong> (peserta akan mendapat kartu QR secara otomatis).</li>
            <li>💡 Petugas men-scan kartu peserta di "Presensi" di hari H I'tikaf dimulai dan hari selanjutnya.</li>
            <li>💡 Seluruh data peserta akan terekap di web <strong>Shollu.com</strong>, bisa dipantau real-time dan bisa di-print jika dibutuhkan.</li>
            <li>💡 Bagi peserta yang tidak memiliki HP (anak-anak atau orang tua), bisa didaftarkan oleh kerabat/teman dengan input format: <strong>08 + (10 angka terakhir NIK)</strong>. Contoh: <strong>080000011001</strong>.</li>
            <li>💡 PJ/Petugas per masjid bisa lebih dari 1 orang, menyesuaikan dengan jumlah peserta supaya lebih efisien.</li>
            <li>💡 Untuk kebijakan terkait kuota sahur dan jam terakhir mendaftar, kami mengikuti peraturan di masing-masing masjid dan musholla.</li>
            <li>💡 Program absensi digital ini menggantikan absensi kertas/manual dan boleh digunakan bahkan di tengah-tengah pelaksanaan I'tikaf.</li>
            <li>💡 Pemantauan jumlah peserta I'tikaf bisa dilihat di <strong>www.shollu.com</strong>.</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">📲 Syukran Jazakumullah</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-700 dark:text-gray-300">
          Semoga ibadah I'tikaf kita tahun ini lebih semarak dan tertata dengan baik dengan absensi Digital Smart I'tikaf ☄️🕌🔥.
        </CardContent>
      </Card>
    </div>
  );
}
