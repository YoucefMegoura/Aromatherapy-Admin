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
  ) {
  }


}
