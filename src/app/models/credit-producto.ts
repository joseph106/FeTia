import {Producto} from "./producto";

export interface CreditProducto {
  id: number;
  incrementedPrice: number;
  producto: Producto;
  maxDuesNo: number;
}
