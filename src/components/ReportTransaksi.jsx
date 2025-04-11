import { useEffect, useState } from "react";
import axios from "axios";

const ReportTransaksi = () => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const res = await axios.get("http://localhost:5000/transaksi");
        setTransaksi(res.data);
      } catch (error) {
        console.error("Gagal mengambil data transaksi", error);
      }
    };

    fetchTransaksi();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Report Transaksi Parkir</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">No</th>
            <th className="border p-2">Plat Nomor</th>
            <th className="border p-2">Jenis</th>
            <th className="border p-2">Tipe</th>
            <th className="border p-2">Durasi</th>
            <th className="border p-2">Total Biaya</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.length > 0 ? (
            transaksi.map((data, index) => (
              <tr key={data.TransaksiID} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{data.PlatNomor}</td>
                <td className="border p-2">{data.JenisKendaraan}</td>
                <td className="border p-2">{data.TipeKendaraan}</td>
                <td className="border p-2">{data.DurasiParkir} Jam</td>
                <td className="border p-2">
                  Rp {data.TotalBayar.toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center">
                Tidak ada transaksi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTransaksi;
