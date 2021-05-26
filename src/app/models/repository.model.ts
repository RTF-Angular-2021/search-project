import { User } from "./user.model";

export interface Repository {
    id: number,
    name: string,
    private: boolean,
    owner: User,
    html_url: string,
    description: string,
    created_at: string,
    stargazers_count: number,
    language: string,
    forks_count: number
}