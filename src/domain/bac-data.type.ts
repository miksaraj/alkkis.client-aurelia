import { Product } from "@/domain/product.type"
import { Drinker } from "@/domain/drinker.type"

export interface BacData {
    products: Product[];
    drinker: Drinker;
}