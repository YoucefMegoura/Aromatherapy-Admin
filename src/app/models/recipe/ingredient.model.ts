export class Ingredient {
  constructor(
    public name: string,
    ) {}


  public toMap(): Object | null {
    if (
      (this.name == null || this.name == "")
    ) {
      return null;
    }
    return {
      name: this.name?.trim() != "" ? this.name?.trim() : null
    }
  }

  public static fromMap(data: any): Ingredient {
    let name: string = data == null || data['name'] == null ? "" : data['name'];
    return new Ingredient(
      name,
    )
  }
}
