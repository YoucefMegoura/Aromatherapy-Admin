export enum DomainType {
  wellBeing,
  health,
  beauty
}

export class Domain {
  constructor (
    private type: DomainType,
    private properties: string,
    private precautionOfUse: string,
    private areaOfUse: string,
    private practicalUse: string,
    private synergy: string
  ) {}
}
