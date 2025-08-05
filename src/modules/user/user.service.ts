import { Injectable } from '@nestjs/common';
import { CreateUser } from '@application/use-cases/create-user';

@Injectable()
export class UserService {
  constructor(private readonly createUser: CreateUser) {}

  async register(name: string, email: string) {
    try {
      const result = await this.createUser.execute(name, email);
      if (result instanceof Error) {
        throw result;
      }
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
