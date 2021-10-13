import { Product} from "./domain/product.type"
import { Drinker, Gender, GenderView } from "./domain/drinker.type"
import { BacData, BacRepresentation } from "./domain/bac-data.type"
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

  public async calculateBAC(): Promise<void> {
    const data: BacData = {
      products: this.selected,
      drinker: this.drinker
    }

    const representation: BacRepresentation = await fetch(`http://localhost:3000/api/v1/bac`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    this.result = representation.text
  }
}
