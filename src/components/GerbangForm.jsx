import { useState } from "react";
import axios from "axios";

const GerbangForm = () => {
  const [namaGerbang, setNamaGerbang] = useState("");
  const [tipeGerbang, setTipeGerbang] = useState("Masuk"); // Default ke "Masuk"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/gerbang", {
        NamaGerbang: namaGerbang,
        TipeGerbang: tipeGerbang,
      });
      alert("Gerbang berhasil ditambahkan!");
      setNamaGerbang("");
      setTipeGerbang("Masuk");
    } catch (error) {
      console.error("Error menambahkan gerbang:", error);
      alert("Gagal menambahkan gerbang");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tambah Gerbang</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Gerbang</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={namaGerbang}
            onChange={(e) => setNamaGerbang(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Tipe Gerbang</label>
          <select
            className="w-full p-2 border rounded"
            value={tipeGerbang}
            onChange={(e) => setTipeGerbang(e.target.value)}
          >
            <option value="Masuk">Masuk</option>
            <option value="Keluar">Keluar</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Tambah Gerbang
        </button>
      </form>
    </div>
  );
};

export default GerbangForm;
