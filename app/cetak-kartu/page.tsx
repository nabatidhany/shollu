"use client";
import React, { useState } from "react";

const CetakKartuPage = () => {
  const [jumlah, setJumlah] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjE4NDksImV4cCI6MTc4MzA5MTAzNiwiaWF0IjoxNzUxNTU1MDM2LCJpc3MiOiJteS1hcGkiLCJzdWIiOjE4NDl9.6HVE6-cO5gn0dSAUVrR4qer6RKXmC8fw2SK7IisUoMM");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("https://app.shollu.com/api/partners/generate-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ jumlah }),
      });
      if (!response.ok) {
        throw new Error("Gagal generate kartu");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "kartu.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Cetak Kartu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* <div>
          <label htmlFor="token" className="block mb-1 font-medium">Token</label>
          <input
            id="token"
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-2"
            placeholder="Masukkan Bearer Token"
            required
          />
        </div> */}
        <div>
          <label htmlFor="jumlah" className="block mb-1 font-medium">Jumlah Kartu</label>
          <input
            id="jumlah"
            type="number"
            min={1}
            value={jumlah}
            onChange={e => setJumlah(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Cetak Kartu"}
        </button>
      </form>
    </div>
  );
};

export default CetakKartuPage; 