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
    public healthDomain: Domain,
    public beautyDomain: Domain,
    public wellBeingDomain: Domain,
  ) {
  }

  public toMap(): Object {
    return {
      name: this.name,
      sciName: this.sciName,
      otherNames: this.otherNames,
      distilledOrgan: this.distilledOrgan,
      extractionProcess: this.extractionProcess,
      allergies: this.allergies,
      color: this.color,
      smell: this.smell,
      aspect: this.aspect,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      health: {
        properties: this.healthDomain.properties,
        precautionOfUse: this.healthDomain.precautionOfUse,
        areaOfUse: this.healthDomain.areaOfUse,
        practicalUse: this.healthDomain.practicalUse,
        synergy: this.healthDomain.synergy,
      },
      beauty: {
        properties: this.beautyDomain.properties,
        precautionOfUse: this.beautyDomain.precautionOfUse,
        areaOfUse: this.beautyDomain.areaOfUse,
        practicalUse: this.beautyDomain.practicalUse,
        synergy: this.beautyDomain.synergy,
      },
      wellBeing: {
        properties: this.wellBeingDomain.properties,
        precautionOfUse: this.wellBeingDomain.precautionOfUse,
        areaOfUse: this.wellBeingDomain.areaOfUse,
        practicalUse: this.wellBeingDomain.practicalUse,
        synergy: this.wellBeingDomain.synergy,
      },

    }
  }

  public static fromMap(data: any): Oil {
    let name: string = data['name'];
    let sciName: string | null = data['sciName'];
    let otherNames: string[] = data['otherNames'];
    let distilledOrgan: string | null = data['distilledOrgan'];
    let extractionProcess: string | null = data['extractionProcess'];
    let allergies: string[] | null = data['allergies'];
    let color: string[] | null = data['color'];
    let smell: string[] | null = data['smell'];
    let aspect: string[] | null = data['aspect'];
    let createdAt: Date = data['createdAt'];
    let updatedAt: Date = data['updatedAt'];
    let health: Domain = data['health'];
    let beauty: Domain = data['beauty'];
    let wellBeing: Domain = data['wellBeing'];
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
      Domain.fromMap(health),
      Domain.fromMap(beauty),
      Domain.fromMap(wellBeing)
    );

  }
}
