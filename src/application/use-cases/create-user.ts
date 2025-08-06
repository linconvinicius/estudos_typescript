import { User } from '@domain/entities/user';
import { UserRepository } from '@application/repositories/user-repository';
import { randomUUID } from 'crypto';

export class CreateUser {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const user = new User(randomUUID(), name, email);
    await this.userRepo.save(user);
    return user;
  };
};

export class GetUserById {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  };
};

