import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { backendFetch } from "../services/api";
import { useCallback, useEffect, useState } from "react";

export interface Users {
  id: string;
  name: string;
  email: string;
  isAdmin: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<Users[]>([]);
  // ✅ METODO 1: Funzione fetch separata (riutilizzabile)
  const fetchUsersWithCallback = useCallback(async () => {
    try {
      const { responseBody } = await backendFetch("/private/users");
      setUsers(responseBody.details.users);
    } catch (error) {
      console.error("Errore fetch con callback:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsersWithCallback();
  }, [fetchUsersWithCallback]);

  /* 🧩 METODO 2: Funzione fetch dentro useEffect (veloce, non riutilizzabile)
  useEffect(() => {
    const fetchUsersDirect = async () => {
      try {
        const { responseBody } = await backendFetch("/private/users");
        console.log("Utenti fetch direct:", responseBody.details.users);
        // Se vuoi puoi anche aggiornare lo state qui:
        // setUsers(responseBody.details.users);
      } catch (error) {
        console.error("Errore fetch direct:", error);
      }
    };

    fetchUsersDirect();
  }, []);
  */

  return (
    <div className="w-full p-6 pt-24">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-[var(--primary-color)] text-3xl font-bold">
          Gestione Utenti
        </h2>
        <button className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          <PlusCircle size={30} />
          <span>Nuovo Utente</span>
        </button>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ruolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isAdmin ? "Attivo" : "Disattivato"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Attivo
                    </span>
                  </td>
                  <td className="p-4 flex justify-center space-x-3">
                    <Edit2
                      className="text-purple-500 hover:text-purple-700 transition duration-300 hover:scale-110"
                      size={20}
                    />
                    <Trash2
                      className="text-red-500 hover:text-red-700 transition duration-300 hover:scale-110"
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Mostrati 2 utenti (implementare paginazione lato client)
        </div>
      </div>
    </div>
  );
}
