import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTeamDTO } from "../../dtos/CreateTeamDTO";
import { ListTeamAgents } from "./ListTeamAgents";


@Controller()
export class ListTeamAgentsController {
    constructor(private listTeamAgents:ListTeamAgents ) {}

    @Get("/team/agents/:id")
    async handle(@Param("id") id:string) {

        const response = await this.listTeamAgents.execute(id);

        console.log(response)

        return response
    }
}