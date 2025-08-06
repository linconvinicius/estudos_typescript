import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post()
async create(@Body() createUserDto: CreateUserDto) {
  return await this.userService.register(createUserDto.name, createUserDto.email);
}

@Get()
async findAll() {
  return await this.userService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: string) {
  return await this.userService.findById(id);
}

@Patch(':id')
async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return await this.userService.update(id, updateUserDto);
}

@Delete(':id')
async remove(@Param('id') id: string) {
  return await this.userService.remove(id);
}
}
