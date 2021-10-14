import { Product, Drinker, Gender, GenderView, BacRequestDto, BacRepresentation } from './alkkis.types'
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
    this.products = await fetch(`http://localhost:3000/api/v1/search?name=${this.searchText}`)
    .then(res => res.json())
  }

  public async calculateBAC(): Promise<void> {
    const data: BacRequestDto = {
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
