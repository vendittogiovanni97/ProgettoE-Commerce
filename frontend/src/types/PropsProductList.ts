export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  disponibility: boolean;
  timestamp: string;
}

export const tableHeaders = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Nome" },
  { key: "price", label: "Prezzo" },
  { key: "quantity", label: "Quantità" },
  { key: "category", label: "Categoria" },
  { key: "disponibility", label: "Disponibilità" },
  { key: "timestamp", label: "Data" },
  { key: "actions", label: "Azioni" },
];
