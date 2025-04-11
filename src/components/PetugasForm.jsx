import { useState, useEffect } from "react";

const PetugasForm = () => {
  const [namaPetugas, setNamaPetugas] = useState("");
  const [shift, setShift] = useState("pagi");
  const [petugasList, setPetugasList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPetugas = {
      NamaPetugas: namaPetugas,
      Shift: shift,
    };

    const res = await fetch("http://localhost:5000/petugas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPetugas),
    });

    if (res.ok) {
      setNamaPetugas("");
      setShift("pagi");
      fetchPetugas(); // Refresh data setelah tambah petugas
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Tambah Petugas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Petugas
          </label>
          <input
            type="text"
            value={namaPetugas}
            onChange={(e) => setNamaPetugas(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Shift
          </label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="pagi">Pagi</option>
            <option value="siang">Siang</option>
            <option value="malam">Malam</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Tambah Petugas
        </button>
      </form>
    </div>
  );
};

export default PetugasForm;
