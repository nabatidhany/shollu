import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

const masjidList = [
  { name: "Masjid Al-Ikhlas", location: "Jakarta", events: ["Pejuang Quran", "Sholat Champion"] },
  { name: "Masjid An-Nur", location: "Bandung", events: ["Pejuang Itikaf"] },
  { name: "Masjid Al-Falah", location: "Surabaya", events: ["Sholat Champion"] },
  { name: "Masjid At-Taqwa", location: "Yogyakarta", events: ["Pejuang Quran", "Pejuang Itikaf"] },
];

export default function MasjidList() {
  const [search, setSearch] = useState("");

  const filteredMasjid = masjidList.filter(masjid =>
    masjid.name.toLowerCase().includes(search.toLowerCase()) ||
    masjid.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Daftar Masjid Terhubung</h1>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Cari masjid..."
          className="pl-10 w-full border-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredMasjid.map((masjid, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-xl">{masjid.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-1 items-center">
              <MapPin className="top-2.5 text-gray-400" size={20} />
              <p className="text-gray-600">{masjid.location}</p>
            </CardContent>
            <CardContent>
              <Button>Lihat Rekapan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
