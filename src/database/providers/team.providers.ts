import { TEAM_REPOSITORY } from "src/common/constants";
import { TeamModel } from "../models/team.model";

export const TeamProviders = [
    {
        provide: TEAM_REPOSITORY,
        useValue: TeamModel
    }
]