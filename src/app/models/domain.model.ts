export enum DomainType {
  wellBeing = 'wellBeing',
  health = 'health',
  beauty = 'beauty'
}

export class Domain {
  constructor(
    public properties: string | null,
    public precautionOfUse: string | null,
    public areaOfUse: string | null,
    public practicalUse: string | null,
    public synergy: string | null,
  ) {
  }


  public toMap(): Object {
    return {
      properties: this.properties,
      precautionOfUse: this.precautionOfUse,
      areaOfUse: this.areaOfUse,
      practicalUse: this.practicalUse,
      synergy: this.synergy,
    }
  }

  public static fromMap(data: any): Domain {
    let properties: string | null = data['properties'];
    let precautionOfUse: string | null = data['precautionOfUse'];
    let areaOfUse: string | null = data['areaOfUse'];
    let practicalUse: string | null = data['practicalUse'];
    let synergy: string | null = data['synergy'];
    return new Domain(
      properties,
      precautionOfUse,
      areaOfUse,
      practicalUse,
      synergy
    )
  }
}
