import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTeamDTO } from "../../dtos/CreateTeamDTO";
import { ListAgents } from "./ListAgents";


@Controller()
export class ListAgentsController {
    constructor(private listAgents:ListAgents ) {}

    @Get("/agent")
    async handle() {

        const response = await this.listAgents.execute();

        return response
    }
}