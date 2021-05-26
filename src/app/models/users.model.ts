import { User } from "./user.model";

export interface Users {
    total_count: number;
    items: Array<User>;
}
