import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import FormMasuk from "./components/FormMasuk";
import FormKeluar from "./components/FormKeluar";

function App() {
  return (
    <div className="min-h-screen items-center justify-center">
      <Dashboard />
    </div>
  );
}

export default App;
