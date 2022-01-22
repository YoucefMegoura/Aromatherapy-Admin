import {Domain} from "./domain.model";

export class Oil {
  constructor(
    public name: string,
    public sciName: string | null,
    public otherNames: string[],
    public distilledOrgan: string | null,
    public extractionProcess: string | null,
    public allergies: string[] | null,
    public color: string[] | null,
    public smell: string[] | null,
    public aspect: string[] | null,
    public createdAt: Date,
    public updatedAt: Date | null,
    public health: Domain | null,
    public beauty: Domain | null,
    public wellBeing: Domain | null,
  ) {}

  public toMap(): Object {
    let obj: any = {
      name: this.name,
      sciName: this.sciName?.trim() != "" ? this.sciName?.trim() : null,
      otherNames: this.otherNames,
      distilledOrgan: this.distilledOrgan?.trim() != "" ? this.distilledOrgan?.trim() : null,
      extractionProcess: this.extractionProcess?.trim() != "" ? this.extractionProcess?.trim() : null,
      allergies: this.allergies,
      color: this.color,
      smell: this.smell,
      aspect: this.aspect,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
    if (this.health != null)
      obj.health = new Domain(
        this.health.properties,
        this.health.precautionOfUse,
        this.health.areaOfUse,
        this.health.practicalUse,
        this.health.synergy,
      ).toMap();
    if (this.beauty != null)
      obj.beauty = new Domain(
        this.beauty.properties,
        this.beauty.precautionOfUse,
        this.beauty.areaOfUse,
        this.beauty.practicalUse,
        this.beauty.synergy,
      ).toMap();
    if (this.wellBeing != null)
      obj.wellBeing = new Domain(
        this.wellBeing.properties,
        this.wellBeing.precautionOfUse,
        this.wellBeing.areaOfUse,
        this.wellBeing.practicalUse,
        this.wellBeing.synergy,
      ).toMap();

    return obj;
  }

  public static fromMap(data: any): Oil {
    let name: string = data['name'];
    let sciName: string = data['sciName'] ?? '';
    let otherNames: string[] = data['otherNames'] ?? [];
    let distilledOrgan: string = data['distilledOrgan'] ?? '';
    let extractionProcess: string = data['extractionProcess'] ?? '';
    let allergies: string[] = data['allergies'] ?? [];
    let color: string[] = data['color'] ?? [];
    let smell: string[] = data['smell'] ?? [];
    let aspect: string[] = data['aspect'] ?? [];
    let createdAt: Date = data['createdAt'];
    let updatedAt: Date = data['updatedAt'];
    let health: Domain = Domain.fromMap(data['health']);
    let beauty: Domain = Domain.fromMap(data['beauty']);
    let wellBeing: Domain = Domain.fromMap(data['wellBeing']);
    return new Oil(
      name,
      sciName,
      otherNames,
      distilledOrgan,
      extractionProcess,
      allergies,
      color,
      smell,
      aspect,
      createdAt,
      updatedAt,
      health,
      beauty,
      wellBeing
    );

  }
}
