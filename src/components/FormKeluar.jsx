import { useState } from "react";
import axios from "axios";

const FormKeluar = () => {
  const [platNomor, setPlatNomor] = useState("");
  const [waktuKeluar, setWaktuKeluar] = useState("");
  const [transaksi, setTransaksi] = useState(null);
  const tarifPerJam = 5000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ambil data kendaraan berdasarkan plat nomor
      const res = await axios.get(
        `http://localhost:5000/transaksi/${platNomor}`
      );
      const data = res.data;

      if (!data) {
        alert("Kendaraan tidak ditemukan!");
        return;
      }

      // Hitung durasi parkir dalam jam
      const waktuMasuk = new Date(data.WaktuMasuk);
      const waktuKeluarDate = new Date(waktuKeluar);
      const durasiJam = Math.ceil(
        (waktuKeluarDate - waktuMasuk) / (1000 * 60 * 60)
      );

      const totalBayar = durasiJam * tarifPerJam;
      const marginKeuntungan = 0.2 * totalBayar;
      const keuntungan = totalBayar - marginKeuntungan;

      // Simpan transaksi keluar ke backend
      await axios.put(`http://localhost:5000/transaksi/${platNomor}`, {
        WaktuKeluar: waktuKeluar,
        DurasiParkir: durasiJam,
        TotalBayar: totalBayar,
        MarginKeuntungan: marginKeuntungan,
        Keuntungan: keuntungan,
      });

      // Set hasil transaksi
      setTransaksi({
        PlatNomor: data.PlatNomor,
        JenisKendaraan: data.JenisKendaraan,
        TipeKendaraan: data.TipeKendaraan,
        DurasiParkir: durasiJam,
        TotalBayar: totalBayar,
      });

      setPlatNomor("");
      setWaktuKeluar("");
    } catch (error) {
      console.error("Error saat keluar kendaraan:", error);
      alert("Terjadi kesalahan saat memproses transaksi keluar.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Form Keluar Kendaraan</h2>
      <form onSubmit={handleSubmit}>
        {/* Plat Nomor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Plat Nomor
          </label>
          <input
            type="text"
            value={platNomor}
            onChange={(e) => setPlatNomor(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Contoh: B 1234 XYZ"
            required
          />
        </div>

        {/* Waktu Keluar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Waktu Keluar
          </label>
          <input
            type="datetime-local"
            value={waktuKeluar}
            onChange={(e) => setWaktuKeluar(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Selesaikan Transaksi
        </button>
      </form>

      {/* Hasil Transaksi */}
      {transaksi && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold mb-2">Detail Transaksi</h3>
          <p>
            <strong>Plat Nomor:</strong> {transaksi.PlatNomor}
          </p>
          <p>
            <strong>Jenis Kendaraan:</strong> {transaksi.JenisKendaraan}
          </p>
          <p>
            <strong>Tipe Kendaraan:</strong> {transaksi.TipeKendaraan}
          </p>
          <p>
            <strong>Durasi Parkir:</strong> {transaksi.DurasiParkir} Jam
          </p>
          <p>
            <strong>Total Bayar:</strong> Rp{" "}
            {transaksi.TotalBayar.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormKeluar;
