import {Oil} from "./oil.model";
import {Domain} from "./domain.model";

export class OilDomainDTO {
  constructor(
    public oil: Oil,
    public healthDomain: Domain,
    public beautyDomain: Domain,
    public wellBeingDomain: Domain
  ) {}

  public toMap(): OilDomainDTO {
    let obj: any = {};
    obj.name = this.oil.name;
    obj.sciName = this.oil.sciName;
    obj.otherNames = this.oil.otherNames;
    obj.distilledOrgan = this.oil.distilledOrgan;
    obj.extractionProcess = this.oil.extractionProcess;
    obj.allergies = this.oil.allergies;
    obj.color = this.oil.color;
    obj.smell = this.oil.smell;
    obj.aspect = this.oil.aspect;
    obj.createdAt = this.oil.createdAt;
    obj.updatedAt = this.oil.updatedAt;
    obj.healthAreaOfUse = this.healthDomain.areaOfUse;
    return obj;
  }
}
