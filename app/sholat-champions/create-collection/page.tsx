"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreateCollection = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validasi dengan Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Nama koleksi wajib diisi'),
    sholat_track: Yup.array().of(Yup.number().min(1).max(5)).required('Pilih minimal satu jadwal sholat'),
    date_start: Yup.date().required('Tanggal mulai wajib diisi'),
    date_end: Yup.date().required('Tanggal akhir wajib diisi'),
    masjid_id: Yup.array().of(Yup.number()).required('Pilih masjid').test('not-all', 'Masjid tidak boleh kosong', (value) => {
      return value.length !== 0 || value[0] !== 0; // Memastikan kalau "all" dipilih maka tidak kosong
    }),
    peserta_ids: Yup.array().of(Yup.number()).min(1, 'Pilih minimal satu peserta').required('Peserta wajib diisi'),
  });

  const initialValues = {
    name: '',
    sholat_track: [],
    date_start: '',
    date_end: '',
    masjid_id: [],
    peserta_ids: [],
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/create-collection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push('/collections'); // Setelah berhasil, alihkan ke halaman koleksi
      } else {
        alert('Gagal membuat koleksi');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-24">
      <h1 className="text-2xl font-semibold mb-4">Buat Koleksi Baru</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            {/* Nama Koleksi */}
            <div className="mb-4">
              <label className="block mb-1">Nama Koleksi</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Sholat Track */}
            <div className="mb-4">
              <label className="block mb-1">Jadwal Sholat</label>
              <Field
                as="select"
                name="sholat_track"
                multiple
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {[1, 2, 3, 4, 5].map((sholat) => (
                  <option key={sholat} value={sholat}>
                    Sholat {sholat}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="sholat_track" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Tanggal Mulai */}
            <div className="mb-4">
              <label className="block mb-1">Tanggal Mulai</label>
              <Field
                type="date"
                name="date_start"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="date_start" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Tanggal Akhir */}
            <div className="mb-4">
              <label className="block mb-1">Tanggal Akhir</label>
              <Field
                type="date"
                name="date_end"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="date_end" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Masjid ID */}
            <div className="mb-4">
              <label className="block mb-1">Masjid</label>
              <Field
                as="select"
                name="masjid_id"
                multiple
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value={0}>Semua Masjid</option>
                {/* Daftar masjid bisa diambil dinamis dari API jika perlu */}
                {[1, 2, 3, 4].map((masjidId) => (
                  <option key={masjidId} value={masjidId}>
                    Masjid {masjidId}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="masjid_id" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Peserta ID */}
            <div className="mb-4">
              <label className="block mb-1">Peserta</label>
              <Field
                as="select"
                name="peserta_ids"
                multiple
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {/* Daftar peserta bisa diambil dinamis dari API jika perlu */}
                {[101, 102, 103].map((pesertaId) => (
                  <option key={pesertaId} value={pesertaId}>
                    Peserta {pesertaId}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="peserta_ids" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                className={`w-full p-2 bg-blue-500 text-white rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Membuat Koleksi...' : 'Buat Koleksi'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCollection;
