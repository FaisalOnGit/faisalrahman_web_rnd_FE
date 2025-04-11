import { useState, useEffect } from "react";

const FormMasuk = () => {
  const [kendaraanID, setKendaraanID] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("mobil");
  const [tipeKendaraan, setTipeKendaraan] = useState("");
  const [petugasID, setPetugasID] = useState("");
  const [gerbangID, setGerbangID] = useState("");
  const [tarifPerjam, setTarifPerjam] = useState(5000);
  const [petugasList, setPetugasList] = useState([]);
  const [gerbangList, setGerbangList] = useState([]);
  const [kendaraanList, setKendaraanList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/petugas")
      .then((res) => res.json())
      .then((data) => setPetugasList(data))
      .catch((err) => console.error("Error fetching petugas:", err));

    fetch("http://localhost:5000/gerbang")
      .then((res) => res.json())
      .then((data) => setGerbangList(data))
      .catch((err) => console.error("Error fetching gerbang:", err));

    fetch("http://localhost:5000/kendaraan") // Fetch daftar kendaraan dari API
      .then((res) => res.json())
      .then((data) => setKendaraanList(data))
      .catch((err) => console.error("Error fetching kendaraan:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaksiData = {
      KendaraanID: kendaraanID, // Ganti PlatNomor dengan KendaraanID
      JenisKendaraan: jenisKendaraan,
      TipeKendaraan: tipeKendaraan,
      PetugasID: petugasID,
      GerbangID: gerbangID,
      TarifPerjam: tarifPerjam,
    };

    try {
      const response = await fetch("http://localhost:5000/transaksi/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaksiData),
      });

      if (!response.ok) throw new Error("Gagal mencatat transaksi parkir");

      alert("Transaksi parkir berhasil disimpan!");
      setKendaraanID("");
      setTipeKendaraan("");
      setPetugasID("");
      setGerbangID("");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan transaksi parkir.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Form Masuk Parkir</h2>

      <div className="mb-4">
        <label className="block font-semibold">Kendaraan</label>
        <select
          value={kendaraanID}
          onChange={(e) => setKendaraanID(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih Kendaraan</option>
          {kendaraanList.map((kendaraan) => (
            <option key={kendaraan.KendaraanID} value={kendaraan.KendaraanID}>
              {kendaraan.PlatNomor} - {kendaraan.TipeKendaraan}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Jenis Kendaraan</label>
        <select
          value={jenisKendaraan}
          onChange={(e) => setJenisKendaraan(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="mobil">Mobil</option>
          <option value="motor">Motor</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Tipe Kendaraan</label>
        <select
          value={tipeKendaraan}
          onChange={(e) => setTipeKendaraan(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          {jenisKendaraan === "mobil" ? (
            <>
              <option value="Truk">Truk</option>
              <option value="Bus">Bus</option>
              <option value="Minibus">Minibus</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Pickup">Pickup</option>
            </>
          ) : (
            <>
              <option value="Moge/Sport">Moge/Sport</option>
              <option value="Bebek/Matic">Bebek/Matic</option>
            </>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Petugas</label>
        <select
          value={petugasID}
          onChange={(e) => setPetugasID(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Petugas</option>
          {petugasList.map((petugas) => (
            <option key={petugas.PetugasID} value={petugas.PetugasID}>
              {petugas.NamaPetugas}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Gerbang</label>
        <select
          value={gerbangID}
          onChange={(e) => setGerbangID(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Pilih Gerbang</option>
          {gerbangList.map((gerbang) => (
            <option key={gerbang.GerbangID} value={gerbang.GerbangID}>
              {gerbang.NamaGerbang} ({gerbang.TipeGerbang})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Tarif Per Jam (Rp)</label>
        <input
          type="number"
          value={tarifPerjam}
          onChange={(e) => setTarifPerjam(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Simpan Transaksi Masuk
      </button>
    </form>
  );
};

export default FormMasuk;
