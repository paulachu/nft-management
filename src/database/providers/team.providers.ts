/* eslint-disable prettier/prettier */
import { TEAM_REPOSITORY } from "src/common/constants";
import { TeamModel } from "../models/team.model";

export const teamProviders = [
    {
        provide: TEAM_REPOSITORY,
        useValue: TeamModel
    }
]