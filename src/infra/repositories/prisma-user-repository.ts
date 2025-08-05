import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma.service';
import { UserRepository } from '@application/repositories/user-repository';
import { User } from '@domain/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: { id: user.id, name: user.name, email: user.email }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user.id, user.name, user.email) : null;
  }
}
