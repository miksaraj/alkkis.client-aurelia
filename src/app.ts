import { Product} from "./domain/product.type"
import { Drinker, Gender, GenderView } from "./domain/drinker.type"
import { BacData } from "./domain/bac-data.type"
import "../static/main.css"

export class App {
  public products: Product[] = []
  public selected: Product[] = []
  public drinker: Drinker = {
    gender: Gender.Male,
    weight: 80,
    time: 1
  }
  public result: string
  public searchText: string
  public genders: GenderView[] = [
    {
      value: Gender.Female,
      text: 'Nainen'
    },
    {
      value: Gender.Male,
      text: 'Mies'
    }
  ]

  /**
   * Note: the url differs between backend implementations:
   * NestJS implementation: localhost:3000/v1/alko/search?...
   * Ts.ED implementation: localhost:8083/v1/alko/search?...
   * FoalTS implementation not functional as of yet
   *
   * They will be standardised once I get to it, but for
   * now the callable url depends on used backend version.
   *
   * Target standardised endpoint: localhost:3000/api/v1/search?...
   */
  public async search(): Promise<void> {
    const productsList: Product[] = await fetch(`http://localhost:3000/api/v1/search?name=${this.searchText}`)
    .then(res => res.json())
    productsList.forEach(product => {
      product.alkolink = App.getAlkoLink(product.num)
    })
    this.products = productsList
  }

  private static getAlkoLink(productNumber: number): string {
    return `https://www.alko.fi/tuotteet/${productNumber}/`
  }

  /**
   * Note: the url differs between backend implementations:
   * NestJS implementation: localhost:3000/v1/bac/
   * Ts.ED implementation: localhost:8083/v1/bac/
   * FoalTS implementation: localhost:3001/bac/
   *
   * They will be standardised once I get to it, but for
   * now the callable url depends on used backend version.
   *
   * Target standardised endpoint: localhost:3000/api/v1/bac/
   */
  public async calculateBAC(): Promise<void> {
    const data: BacData = {
      products: this.products,
      drinker: this.drinker
    }

    const bac = await fetch(`http://localhost:3000/api/v1/bac`, {
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
