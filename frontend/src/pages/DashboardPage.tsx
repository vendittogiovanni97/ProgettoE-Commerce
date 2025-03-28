import React from "react";
import StatCard from "../components/Dashboard/StatCard";

const DashboardPage: React.FC = () => {
  return (
    <div className="container flex-grow p-[50px] h-[60vh] bg-transparent flex justify-center items-center">
      <div className="w-[170%] h-[160%] max-w-8xl bg-white rounded-2xl p-8 shadow-lg mt-[27%]">
        {/* Sezione Titolo */}
        <div className="mb-8">
          <h1 className="text-[var(--primary-color)] text-3xl font-bold">
            Dashboard
          </h1>
          {/* Linea sotto il titolo */}
          <div className="bg-[var(--accent-color)] mt-2 h-[2px] w-39 "></div>
        </div>

        {/* Griglia per le Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-9">
          <StatCard title="Prodotti Totali" value="1,380" />
          <StatCard title="Ordini Pendenti" value="45" variant="accent" />
          <StatCard title="Valore Inventario" value="€ 182,500" />
          <StatCard title="Visite Oggi" value="890" />
        </div>
        <p className="mb-6">
          Benvenuto nel tuo coloratissimo pannello di controllo!
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
