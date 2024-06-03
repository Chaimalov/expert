import { Product } from "./product"

export type ServerToClientEvents = {
    products: (products: Product[]) => void;
}

export type ClientToServerEvents = {

}