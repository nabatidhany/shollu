"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MultiSelect, Option } from '@/components/ui/MultiSelect';

const sholatOptions: Option[] = [
  { value: 1, label: 'Shubuh' },
  { value: 2, label: 'Dzuhur' },
  { value: 3, label: 'Ashar' },
  { value: 4, label: 'Maghrib' },
  { value: 5, label: 'Isya' },
];

const CreateCollection = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [masjidOptions, setMasjidOptions] = useState<Option[]>([]);
  const [pesertaOptions, setPesertaOptions] = useState<Option[]>([]);

  const [selectedMasjids, setSelectedMasjids] = useState<Option[]>([]);
  const [selectedPesertas, setSelectedPesertas] = useState<Option[]>([]);
  const [selectedSholat, setSelectedSholat] = useState<Option[]>([]);

  // Fetch data masjid & peserta dari API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch('https://api.shollu.com/api/v1/data-peserta-masjid');
        const data = await res.json();
        console.log('Data masjid/peserta:', data);
        // const masjid: Option[] = data.masjid.map((item: any) => ({
        //   value: item.id,
        //   label: item.nama,
        // }));
        const masjid: Option[] = [
          { value: 0, label: 'Semua Masjid' },
          ...data.masjid.map((masjid: any) => ({
            value: masjid.id,
            label: masjid.nama,
          })),
        ];


        const peserta: Option[] = data.peserta.map((item: any) => ({
          value: item.id,
          label: `${item.qr_code} - ${item.fullname}`,
        }));

        setMasjidOptions(masjid);
        setPesertaOptions(peserta);
      } catch (error) {
        console.error('Gagal memuat data masjid/peserta:', error);
      }
    };

    fetchOptions();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Nama koleksi wajib diisi'),
    sholat_track: Yup.array().of(Yup.number().min(1).max(5)).required('Pilih minimal satu jadwal sholat'),
    date_start: Yup.date().required('Tanggal mulai wajib diisi'),
    date_end: Yup.date().required('Tanggal akhir wajib diisi'),
    masjid_id: Yup.array().of(Yup.number()).min(1, 'Pilih minimal satu masjid'),
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
      const res = await fetch('https://api.shollu.com/api/v1/collections-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push('/collections');
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
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-1">Nama Koleksi</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Jadwal Sholat</label>
              <MultiSelect
                options={sholatOptions}
                selected={selectedSholat}
                onChange={(newSelected) => {
                  setSelectedSholat(newSelected);
                  setFieldValue(
                    'sholat_track',
                    newSelected.map((item) => item.value)
                  );
                }}
                placeholder="Pilih Jadwal Sholat"
              />
              {touched.sholat_track && errors.sholat_track && (
                <div className="text-red-500 text-sm">{errors.sholat_track}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Tanggal Mulai</label>
              <Field
                type="date"
                name="date_start"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="date_start" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Tanggal Akhir</label>
              <Field
                type="date"
                name="date_end"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="date_end" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Masjid</label>
              <MultiSelect
                options={masjidOptions}
                selected={selectedMasjids}
                onChange={(newSelected) => {
                  setSelectedMasjids(newSelected);
                  setFieldValue(
                    'masjid_id',
                    newSelected.map((item) => item.value)
                  );
                }}
                placeholder="Pilih Masjid"
              />
              {touched.masjid_id && errors.masjid_id && (
                <div className="text-red-500 text-sm">{errors.masjid_id}</div>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Peserta</label>
              <MultiSelect
                options={pesertaOptions}
                selected={selectedPesertas}
                onChange={(newSelected) => {
                  setSelectedPesertas(newSelected);
                  setFieldValue(
                    'peserta_ids',
                    newSelected.map((item) => item.value)
                  );
                }}
                placeholder="Pilih Peserta"
              />
              {touched.peserta_ids && errors.peserta_ids && (
                <div className="text-red-500 text-sm">{errors.peserta_ids}</div>
              )}
            </div>

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
