import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Product {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  status: "Disponibile" | "Poche scorte";
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      sku: "SKU001",
      name: "Unicorn Plushie",
      quantity: 150,
      price: 19.99,
      status: "Disponibile",
    },
    {
      sku: "SKU002",
      name: "Rainbow Keyboard",
      quantity: 75,
      price: 79.0,
      status: "Disponibile",
    },
    {
      sku: "SKU003",
      name: "Gamer Juice (Mango)",
      quantity: 30,
      price: 3.5,
      status: "Poche scorte",
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === "Disponibile" ? "text-green-600" : "text-yellow-600";
  };

  const handleAddProduct = () => {
    // Placeholder for add product functionality
    alert("Add Product functionality to be implemented");
  };

  const handleEditProduct = (sku: string) => {
    // Placeholder for edit product functionality
    alert(`Edit product with SKU: ${sku}`);
  };

  const handleDeleteProduct = (sku: string) => {
    // Placeholder for delete product functionality
    setProducts(products.filter((product) => product.sku !== sku));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <h2 className="text-xl font-bold">Elenco Prodotti</h2>
        <button
          onClick={handleAddProduct}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
        >
          + Aggiungi Prodotto
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-right">Quantità</th>
            <th className="p-3 text-right">Prezzo</th>
            <th className="p-3 text-left">Stato</th>
            <th className="p-3 text-center">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku} className="border-b hover:bg-gray-100">
              <td className="p-3">{product.sku}</td>
              <td className="p-3">{product.name}</td>
              <td className="p-3 text-right">{product.quantity}</td>
              <td className="p-3 text-right">€{product.price.toFixed(2)}</td>
              <td className="p-3">
                <span className={`font-bold ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </td>
              <td className="p-3 flex justify-center space-x-2">
                <button
                  onClick={() => handleEditProduct(product.sku)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.sku)}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
