export class Oil {
  constructor(
    public id: string | null,
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
    public updatedAt: Date | null
  ) {
  }

  public toMap(): Object {
    let obj: any = {};
    obj.name = this.name;
    obj.sciName = this.sciName;
    obj.otherNames = this.otherNames;
    obj.distilledOrgan = this.distilledOrgan;
    obj.extractionProcess = this.extractionProcess;
    obj.allergies = this.allergies;
    obj.color = this.color;
    obj.smell = this.smell;
    obj.aspect = this.aspect;
    obj.createdAt = this.createdAt;
    obj.updatedAt = this.updatedAt;
    return obj;
  }

  public static fromMap(data: Oil, documentId: string | null = null): Oil {
    let id: string | null = documentId;
    let name: string = data.name;
    let sciName: string | null = data.sciName;
    let otherNames: string[] = data.otherNames;
    let distilledOrgan: string | null = data.distilledOrgan;
    let extractionProcess: string | null = data.extractionProcess;
    let allergies: string[] | null = data.allergies;
    let color: string[] | null = data.color;
    let smell: string[] | null = data.smell;
    let aspect: string[] | null = data.aspect;
    let createdAt: Date = data.createdAt ?? new Date();
    let updatedAt: Date = data.updatedAt ?? new Date();
    return new Oil(id, name, sciName, otherNames, distilledOrgan, extractionProcess, allergies, color, smell, aspect, createdAt, updatedAt);
  }
}
