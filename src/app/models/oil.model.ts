import {Organoleptic} from "./organoleptic.model";
import {Domain} from "./domain.model";

export class Oil {
  constructor(
    private _id: string,
    private _name: string,
    private _sciName: string | undefined,
    private _otherNames: string[] | undefined,
    private _distilledOrgan: string | undefined,
    private _extractionProcess: string | undefined,
    private _allergies: string[] | undefined,
    private _organoleptics: Organoleptic,
    private _domains: Domain[],
    private _createdAt: Date | undefined,
    private _updatedAt: Date | undefined
  ) {
  }


  public get id(): string {
    return this._id;
  }


  get name(): string {
    return this._name;
  }

  get sciName(): string | undefined {
    return this._sciName;
  }

  get otherNames(): string[] | undefined {
    return this._otherNames;
  }

  get distilledOrgan(): string | undefined {
    return this._distilledOrgan;
  }

  get extractionProcess(): string | undefined {
    return this._extractionProcess;
  }

  get allergies(): string[] | undefined {
    return this._allergies;
  }

  get organoleptics(): Organoleptic {
    return this._organoleptics;
  }

  get domains(): Domain[] {
    return this._domains;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
