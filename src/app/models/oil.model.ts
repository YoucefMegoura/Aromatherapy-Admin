import {Organoleptic} from "./organoleptic.model";
import {Domain} from "./domain.model";

export class Oil {
  constructor(
    private name: string,
    private sciName: string,
    private otherNames: string,
    private distilledOrgan: string,
    private extractionProcess: string,
    private organoleptics: Organoleptic,
    private domains: Domain[]
  ) {
  }
}
