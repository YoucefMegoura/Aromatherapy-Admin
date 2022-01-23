import {Ingredient} from "./ingredient.model";

export class Recipe {
  constructor(
    public id: string | null,
    public name: string,
    public reference: string,
    public ingredients: Ingredient[],
    public description: string | null,
    public notes: string | null,
    public usage: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
  }

  public toMap(): Object {
    let obj: any = {
      name: this.name.trim(),
      ingredients: this.ingredients,
      reference: this.reference?.trim() != "" ? this.reference?.trim() : null,
      description: this.description?.trim() != "" ? this.description?.trim() : null,
      notes: this.notes?.trim() != "" ? this.notes?.trim() : null,
      usage: this.usage?.trim() != "" ? this.usage?.trim() : null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
    return obj;
  }

  public static fromMap(data: Recipe, documentId: string | null = null): Recipe {
    let id: string | null = documentId;
    let name: string = data['name'] ?? '';
    let reference: string = data['reference'] ?? '';
    let ingredients: Ingredient[] = data['ingredients'] ?? [];
    let description: string = data['description'] ?? '';
    let notes: string = data['notes'] ?? '';
    let usage: string = data['usage'] ?? '';
    let createdAt: Date = data['createdAt'];
    let updatedAt: Date = data['updatedAt'];
    return new Recipe(
      id,
      name,
      reference,
      ingredients,
      description,
      notes,
      usage,
      createdAt,
      updatedAt
    );
  }

}
