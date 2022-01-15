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
    public updatedAt: Date | null,
  ) {}


  public toMap(): Map<String, any> {
    let map = new Map<String, any>();
    map.set('id', this.id);
    map.set('name', this.name);
    map.set('reference', this.reference);
    map.set('description', this.description);
    map.set('notes', this.notes);
    map.set('usage', this.usage);
    map.set('createdAt', this.createdAt);
    map.set('updatedAt', this.updatedAt);
    map.set('ingredients', this.ingredients);
    return map;
  }

  public static fromMap(data: Recipe, documentId: string | null = null): Recipe{
    let id: string | null = documentId;
    let name: string = data.name;
    let reference: string = data.reference;
    let ingredients: Ingredient[]  = data.ingredients;
    let description: string | null = data.description;
    let notes: string | null = data.notes;
    let usage: string | null = data.usage;
    let createdAt: Date = data.createdAt ?? new Date();
    let updatedAt: Date = data.updatedAt ?? new Date();
    return new Recipe(id, name, reference, ingredients, description, notes, usage, createdAt, updatedAt);
  }

}
