/* eslint-disable prettier/prettier */
import { SELLS_REPOSITORY } from "src/common/constants";
import { SellsModel } from "../models/sells.model";

export const sellsProviders = [
    {
        provide: SELLS_REPOSITORY,
        useValue: SellsModel
    }
]