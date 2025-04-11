import FormMasuk from "./FormMasuk";
import FormKeluar from "./FormKeluar";
import ReportTransaksi from "./ReportTransaksi";
import GerbangForm from "./GerbangForm";
import PetugasForm from "./PetugasForm";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard Parkir</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormMasuk />
        <FormKeluar />
        <GerbangForm />
        <PetugasForm />
      </div>

      <div className="mt-6">
        <ReportTransaksi />
      </div>
    </div>
  );
};

export default Dashboard;
