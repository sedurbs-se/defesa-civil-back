import { Body, Controller, Post } from "@nestjs/common";
import { RegisterTeamForAffectedArea } from "./RegisterTeamForAffectedArea";
import { CreateTeamDTO } from "../../dtos/CreateTeamDTO";


@Controller()
export class RegisterTeamForAffectedAreaController {
    constructor(private registerTeam:RegisterTeamForAffectedArea ) {}

    @Post("/team")
    async handle(@Body() body:CreateTeamDTO) {
        await this.registerTeam.execute(body);
    }
}