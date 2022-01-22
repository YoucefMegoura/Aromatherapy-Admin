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


  public toMap(): Object | null {
    if (
      (this.properties == null || this.properties == "") &&
      (this.precautionOfUse == null || this.precautionOfUse == "") &&
      (this.areaOfUse == null || this.areaOfUse == "") &&
      (this.practicalUse == null || this.practicalUse == "") &&
      (this.synergy == null || this.synergy == "")
    ) {
      return null;
    }
    return {
      properties: this.properties?.trim() != "" ? this.properties?.trim() : null,
      precautionOfUse: this.precautionOfUse?.trim() != "" ? this.properties?.trim() : null,
      areaOfUse: this.areaOfUse?.trim() != "" ? this.properties?.trim() : null,
      practicalUse: this.practicalUse?.trim() != "" ? this.properties?.trim() : null,
      synergy: this.synergy?.trim() != "" ? this.properties?.trim() : null,
    }
  }

  public static fromMap(data: any): Domain {
    let properties: string = data['properties'] ?? "";
    let precautionOfUse: string = data['precautionOfUse'] ?? "";
    let areaOfUse: string = data['areaOfUse'] ?? "";
    let practicalUse: string = data['practicalUse'] ?? "";
    let synergy: string = data['synergy'] ?? "";
    return new Domain(
      properties,
      precautionOfUse,
      areaOfUse,
      practicalUse,
      synergy
    )
  }
}
