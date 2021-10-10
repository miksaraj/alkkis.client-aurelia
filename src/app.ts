import { Product} from "./domain/product.type"
import { Drinker, Gender } from "./domain/drinker.type"
import { BacData } from "./domain/bac-data.type"

export class App {
  public products: Product[] = []
  public drinker: Drinker = {
    gender: Gender.Male,
    weight: 80,
    time: 1
  }
  public result: string

  updateProductList(list: Product[]): void {
    this.products = list
  }

  updateDrinkerParams(data: Drinker): void {
    this.drinker = data
  }

  async calculateBAC(): Promise<void> {
    const data: BacData = {
      products: this.products,
      drinker: this.drinker
    }

    const bac = await fetch(`http://localhost:3000/api/bac`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    console.log(bac)
  }
}
