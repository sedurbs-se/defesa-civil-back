import { Body, Controller, Post } from "@nestjs/common";
import { RegisterAgent } from "./RegisterAgent";
import { CreateAgentDTO } from "../../dtos/CreateAgentDTO";


@Controller()
export class RegisterAgentController {
    constructor(private readonly registerAgent: RegisterAgent) {}

    @Post("/agent")
    async handle(@Body() body:CreateAgentDTO) {
        await this.registerAgent.execute(body);
    }
}