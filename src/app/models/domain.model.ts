export enum DomainType {
  wellBeing = 'wellBeing',
  health = 'health',
  beauty = 'beauty'
}

export class Domain {
  constructor(
    private type: DomainType,
    private properties: string | undefined,
    private precautionOfUse: string | undefined,
    private areaOfUse: string | undefined,
    private practicalUse: string | undefined,
    private synergy: string | undefined
  ) {
  }
}
