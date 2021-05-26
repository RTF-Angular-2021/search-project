import { Repository } from "./repository.model";

export interface Repositories {
    total_count: number,
    items: Array<Repository>
}