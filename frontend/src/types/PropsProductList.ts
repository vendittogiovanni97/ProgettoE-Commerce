export interface Product {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  status: "Disponibile" | "Poche scorte";
}
