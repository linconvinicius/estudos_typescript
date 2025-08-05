export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
  ) {}

  changeEmail(newEmail: string) {
    if (!newEmail.includes('@')) throw new Error('Invalid email');
    this.email = newEmail;
  }
}
