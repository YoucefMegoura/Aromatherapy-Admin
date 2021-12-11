import {Organoleptic} from "./organoleptic.model";
import {Domain} from "./domain.model";

export class Oil {
  constructor(
    private id: string,
    private name: string,
    private sciName: string | undefined,
    private otherNames: string[]  | undefined,
    private distilledOrgan: string | undefined,
    private extractionProcess: string | undefined,
    private allergies: string[] | undefined,
    private organoleptics: Organoleptic,
    private domains: Domain[],
    private createdAt: Date | undefined,
    private updatedAt: Date | undefined
  ) {
  }
}
