import React, { useCallback, useEffect, useState } from "react";
import { Edit2, Trash2, PlusCircle } from "lucide-react";
import { backendFetch } from "../services/api";
import { Product, tableHeaders } from "../types/PropsProductList";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const { responseBody } = await backendFetch("/private/products");
      setProducts(responseBody.details.products);
    } catch (error) {
      console.error("Errore fetch con callback:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getStatusColor = (disponibility: boolean) => {
    return disponibility ? "text-green-600" : "text-yellow-600";
  };

  const handleAddProduct = () => {
    alert("Add Product functionality to be implemented");
  };

  const handleEditProduct = (_id: string) => {
    alert(`Edit product with id: ${_id}`);
  };

  const handleDeleteProduct = (_id: string) => {
    setProducts(products.filter((product) => product._id !== _id));
  };

  return (
    <div className="w-full p-6 pt-24">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-[var(--primary-color)] text-3xl font-bold">
          Elenco Prodotti
        </h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <PlusCircle size={30} />
          <span>Aggiungi Prodotto</span>
        </button>

        <div className="p-7 bg-white rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg overflow-hidden">
              <thead className="bg-[#9b59b6] text-white">
                <tr>
                  {(tableHeaders ?? []).map((header) => (
                    <th
                      key={header.key}
                      className="p-4 text-left font-semibold"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-purple-50 transition duration-200"
                  >
                    <td className="p-4">{product._id}</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-right">{product.quantity}</td>
                    <td className="p-4 text-right font-semibold">
                      €{product.price.toFixed(2)}
                    </td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          product.disponibility
                        )}`}
                      >
                        {product.disponibility
                          ? "Disponibile"
                          : "Non disponibile"}
                      </span>
                    </td>
                    <td className="p-4">
                      {new Date(product.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex justify-center space-x-3">
                      <Edit2
                        onClick={() => handleEditProduct(product._id)}
                        className="text-purple-500 hover:text-purple-700 transition duration-300 hover:scale-110"
                        size={20}
                      />

                      <Trash2
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:text-red-700 transition duration-300 hover:scale-110"
                        size={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
