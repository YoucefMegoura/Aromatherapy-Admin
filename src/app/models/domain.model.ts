export enum DomainType {
  wellBeing = 'wellBeing',
  health = 'health',
  beauty = 'beauty'
}

export class Domain {
  constructor(
    public id: string | null,
    public type: DomainType,
    public properties: string | null,
    public precautionOfUse: string | null,
    public areaOfUse: string | null,
    public practicalUse: string | null,
    public synergy: string | null,
    public oilId: string
  ) {}


  public toMap(): Object {
    let obj: any = {};
    obj.type = this.type;
    obj.properties = this.properties;
    obj.precautionOfUse = this.precautionOfUse;
    obj.areaOfUse = this.areaOfUse;
    obj.practicalUse = this.practicalUse;
    obj.synergy = this.synergy;
    obj.oilId = this.oilId;
    return obj;
  }

  public static fromMap(data: Domain, documentId: string | null = null): Domain {
    let id: string | null = documentId;
    let type: DomainType = data.type;
    let properties: string | null = data.properties;
    let precautionOfUse: string  | null  = data.precautionOfUse;
    let areaOfUse: string | null = data.areaOfUse;
    let practicalUse: string | null = data.practicalUse;
    let synergy: string | null = data.synergy;
    let oilId: string = data.oilId;
    return new Domain(id, type, properties, precautionOfUse, areaOfUse, practicalUse, synergy, oilId);
  }

}
