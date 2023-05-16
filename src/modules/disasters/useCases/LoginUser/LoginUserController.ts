

import { Controller, Body, Post } from "@nestjs/common";
import { LoginUser } from "./LoginUser";
import { LoginDTO } from "../../dtos/LoginDTO";


@Controller()
export class LoginUserController {
    constructor(private readonly loginUser:LoginUser) {}

    @Post("/login")
    async handle(@Body() body:LoginDTO) {
        return await this.loginUser.execute(body.cpf);
    }
}