// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { UserService } from './user.service';
// import { Usuario as UserModel } from '@prisma/client';

// @Controller()
// export class AppController {
//   constructor(private readonly userService: UserService) {}

//   @Post('user')
//   async signupUser(
//     @Body() userData: { name?: string; email: string },
//   ): Promise<UserModel> {
//     return this.userService.createUser(userData);
//   }
// }
