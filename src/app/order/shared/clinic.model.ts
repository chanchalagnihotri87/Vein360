export default class Clinic {
  public isDefault: boolean = false;
  constructor(
    public id: number,
    public clinicCode: string,
    public clinicName: string
  ) {}
}
