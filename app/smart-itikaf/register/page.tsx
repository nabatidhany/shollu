"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Link from "next/link";

const masjidList = [
  { id: 1, name: "Masjid Al-Ikhlas" },
  { id: 2, name: "Masjid An-Nur" },
  { id: 3, name: "Masjid Al-Falah" },
  { id: 4, name: "Masjid At-Taqwa" }
];

const formSchema = z.object({
  fullName: z.string().min(3, "Nama lengkap harus minimal 3 karakter"),
  whatsapp: z.string().regex(/^\+?\d{10,15}$/, "Nomor WhatsApp tidak valid"),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Tanggal lahir tidak valid"),
  gender: z.enum(["male", "female"], { required_error: "Pilih jenis kelamin" }),
  masjid: z.number().min(1, "Pilih masjid Anda"),
  hideName: z.enum(["yes", "no"], { required_error: "Pilih opsi" })
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [masjidList, setMasjidList] = useState<{ id: number; name: string }[]>([]);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      whatsapp: "",
      birthDate: "",
      gender: undefined,
      masjid: 0,
      hideName: "no",
    },
  });

  useEffect(() => {
    const fetchMasjid = async () => {
      try {
        const response = await fetch("https://api.shollu.com/api/register-masjid/2");
        const data = await response.json();
        if (response.ok) {
          setMasjidList(data.data);
        } else {
          console.error("Gagal mengambil daftar masjid:", data);
        }
      } catch (error) {
        console.error("Kesalahan jaringan:", error);
      }
    };

    fetchMasjid();
  }, []);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const response:any = await fetch("https://api.shollu.com/api/register-itikaf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: values.fullName,
          contact: values.whatsapp,
          gender: values.gender,
          dob: values.birthDate,
          masjid_id: values.masjid,
          isHideName: values.hideName === "yes",
        })
      });
      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        form.reset();
      } else {
        setErrorMessage(data?.error || "Terjadi kesalahan saat pendaftaran");
        console.error("Pendaftaran gagal", response);
      }
    } catch (error: any) {
      alert("Terjadi kesalahan"+error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    form.reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold mb-6">Registrasi Smart I'tikaf</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="whatsapp" render={({ field }) => (
            <FormItem>
              <FormLabel>No WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: 081234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="birthDate" render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Lahir</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="gender" render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="masjid" render={({ field }) => (
            <FormItem>
              <FormLabel>Pilih Masjid</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih masjid Anda" />
                  </SelectTrigger>
                  <SelectContent>
                    {masjidList.map((masjid) => (
                      <SelectItem key={masjid.id} value={masjid.id.toString()}>{masjid.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="hideName" render={({ field }) => (
            <FormItem>
              <FormLabel>Sembunyikan Nama</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                  <div className="flex gap-4">
                    <Label className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" /> <span>Ya</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <RadioGroupItem value="no" /> <span>Tidak</span>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
              <p className="text-sm text-gray-500 mt-1">Jika memilih "Ya", nama Anda akan disensor dalam rekapan absen.</p>
            </FormItem>
          )} />

          {/* <Button type="submit" className="w-full">Daftar</Button> */}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Mendaftar..." : "Daftar"}</Button>
        </form>
        <Link href={'/smart-itikaf'}>
          <Button variant="secondary" className="w-full mt-4">Kembali</Button>
        </Link>
      </Form>
      {/* Modal Dialog Sukses */}
      <Dialog open={isSuccess} onOpenChange={resetForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pendaftaran Berhasil!</DialogTitle>
          </DialogHeader>
          <p className="text-center">Silakan ambil kartu Anda pada hari acara atau H-3 acara ke panitia.</p>
          <DialogFooter>
            <Button onClick={resetForm}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal Dialog Error */}
      <Dialog open={!!errorMessage} onOpenChange={() => setErrorMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pendaftaran Gagal</DialogTitle>
          </DialogHeader>
          <p className="text-center text-red-600">{errorMessage}</p>
          <DialogFooter>
            <Button onClick={() => setErrorMessage(null)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}