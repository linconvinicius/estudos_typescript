import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '@infra/database/prisma.service';
import { PrismaUserRepository } from '@infra/repositories/prisma-user-repository';
import { CreateUser } from '@application/use-cases/create-user';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUserRepository,
    {
      provide: CreateUser,
      useFactory: (repo: PrismaUserRepository) => new CreateUser(repo),
      inject: [PrismaUserRepository],
    },
    UserService,
  ],
})
export class UserModule {}
