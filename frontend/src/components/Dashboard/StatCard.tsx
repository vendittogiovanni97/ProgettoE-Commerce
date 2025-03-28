import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  // Aggiungiamo una prop per la variante di colore del bordo
  variant?: "primary" | "accent";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  variant = "primary",
}) => {
  const gradienteAccent = "bg-gradient-to-r from-[#ff4081] to-[#ffbf00]";
  const gradienteDefault = "bg-gradient-to-r from-[#6a11cb] to-[#2575fc]";
  const baseGradient = "absolute top-0 left-0 w-full h-1.5";

  return (
    // Contenitore Card
    <div
      style={{
        boxShadow: "0 4px 15px var(--shadow-color-soft)",
      }}
      className="relative overflow-hidden rounded-2xl shadow-md border-border-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Div per il bordo colorato in alto */}
      <div
        className={`${baseGradient} ${
          variant === "accent" ? gradienteAccent : gradienteDefault
        }`}
      ></div>

      {/* Contenuto della Card */}
      <div className="p-6 pt-8">
        <h3 className="text-[var(--secondary-color)] font-semibold mb-2">
          {title}
        </h3>
        <p className="text-[var(--primary-color)] text-primary text-4xl font-bold">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
