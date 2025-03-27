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
  // Determina il gradiente del bordo in base alla variante
  const borderGradient =
    variant === "accent"
      ? "bg-gradient-to-r from-accent to-warning" // Gradiente Arancio/Giallo per 'accent'
      : "bg-gradient-to-r from-primary to-secondary"; // Gradiente Blu/Viola per 'primary' (default)

  return (
    // Contenitore Card
    <div className="relative overflow-hidden bg-element-bg rounded-2xl shadow-md border border-border-light hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* Div per il bordo colorato in alto */}
      <div
        className={`absolute top-0 left-0 w-full h-1.5 ${borderGradient}`}
      ></div>

      {/* Contenuto della Card */}
      <div className="p-6 pt-8">
        {" "}
        {/* Padding aumentato in alto per fare spazio al bordo */}
        <h3 className="text-secondary font-semibold mb-2">{title}</h3>
        <p className="text-primary text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
