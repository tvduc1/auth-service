import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }

  @Get('/current')
  getCurrentUser(): string {
    return 'This action returns all users';
  }
}
