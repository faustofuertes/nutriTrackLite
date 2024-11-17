import { Food } from "./food";

export interface Meals {
    id?: string;
    date: string | null | undefined;
    breakfast?: Food[];
    lunch?: Food[];
    snack?: Food[];
    dinner?: Food[];
}