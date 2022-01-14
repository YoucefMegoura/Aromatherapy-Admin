import {Ingredient} from "./ingredient.model";

export class Recipe {
  public name: string;
  public reference: string;
  public ingredients: Ingredient[];
  public description: string;
  public notes: string;
  public usage: string;


  constructor(name: string, reference: string, ingredients: Ingredient[], description: string, notes: string, usage: string) {
    this.name = name;
    this.reference = reference;
    this.ingredients = ingredients;
    this.description = description;
    this.notes = notes;
    this.usage = usage;
  }
}
