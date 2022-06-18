import { MovementType } from "../common/enums/movement-type";

export interface MovementCreateDto {
    type: MovementType;
    user_id: number;
    amount: number;
}
