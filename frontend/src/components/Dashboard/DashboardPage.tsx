import React from "react";
import StatCard from "./StatCard";

const DashboardPage: React.FC = () => {
  return (
    // Contenitore principale della pagina/sezione dashboard
    <div className="bg-white p-6 md:p-[10%] rounded-2xl shadow-lg ml-[25%] mt-26 ">
      {/* Sezione Titolo */}
      <div className="mb-8">
        <h1
          style={{ color: "var(--primary-color)" }}
          className="text-3xl font-bold"
        >
          Dashboard
        </h1>
        {/* Linea sotto il titolo */}
        <div className="mt-2 h-1 w-16 bg-accent"></div>
      </div>

      {/* Griglia per le Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Instanziamo le StatCard con i dati statici */}
        <StatCard title="Prodotti Totali" value="1,380" />
        <StatCard title="Ordini Pendenti" value="45" variant="accent" />{" "}
        {/* Usa variante 'accent' */}
        <StatCard title="Valore Inventario" value="€ 182,500" />
        <StatCard title="Visite Oggi" value="890" />
      </div>

      {/* Testo di Benvenuto */}
      <p className="text-dark-text mb-6">
        Benvenuto nel tuo coloratissimo pannello di controllo!
      </p>
    </div>
  );
};

export default DashboardPage;
