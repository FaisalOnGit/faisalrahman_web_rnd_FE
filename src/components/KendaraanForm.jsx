import { useState } from "react";
import axios from "axios";

const KendaraanForm = () => {
  const [platNomor, setPlatNomor] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");
  const [tipeKendaraan, setTipeKendaraan] = useState("");

  const tipeKendaraanOptions = {
    Mobil: ["Truk", "Bus", "Minibus", "SUV", "Sedan", "Pickup"],
    Motor: ["Moge/Sport", "Bebek/Matic"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/kendaraan", {
        PlatNomor: platNomor,
        JenisKendaraan: jenisKendaraan,
        TipeKendaraan: tipeKendaraan,
      });

      alert("Kendaraan berhasil ditambahkan!");
      console.log(response.data);

      setPlatNomor("");
      setJenisKendaraan("");
      setTipeKendaraan("");
    } catch (error) {
      console.error("Error menambahkan kendaraan:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tambah Kendaraan</h2>
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

        {/* Jenis Kendaraan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Jenis Kendaraan
          </label>
          <select
            value={jenisKendaraan}
            onChange={(e) => {
              setJenisKendaraan(e.target.value);
              setTipeKendaraan(""); // Reset tipe kendaraan saat jenis diubah
            }}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Pilih Jenis Kendaraan</option>
            <option value="Mobil">Mobil</option>
            <option value="Motor">Motor</option>
          </select>
        </div>

        {/* Tipe Kendaraan */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tipe Kendaraan
          </label>
          <select
            value={tipeKendaraan}
            onChange={(e) => setTipeKendaraan(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
            disabled={!jenisKendaraan} // Disable jika jenis kendaraan belum dipilih
          >
            <option value="">Pilih Tipe Kendaraan</option>
            {jenisKendaraan &&
              tipeKendaraanOptions[jenisKendaraan].map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipe}
                </option>
              ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Tambah Kendaraan
        </button>
      </form>
    </div>
  );
};

export default KendaraanForm;
