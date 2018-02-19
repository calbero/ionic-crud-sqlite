export class User {

  private _id: number;
  private _name: string;
  private _email: string;

  constructor(name: string, email: string) {
    this._name = name;
    this._email = email;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get id(): number {
    return this._id;
  }
}
