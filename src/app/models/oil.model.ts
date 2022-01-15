import {Organoleptics} from "./organoleptic.model";
import {OilDomain} from "./domain.model";

export class Oil {
  constructor(
    public id: string | null | undefined,
    public name: string,
    public sciName: string | null,
    public otherNames: string,
    public distilledOrgan: string | null,
    public extractionProcess: string | null,
    public allergies: string ,
    public organoleptics: Organoleptics,
    public createdAt: Date | null,
    public updatedAt: Date | null
  ) {
  }
}
