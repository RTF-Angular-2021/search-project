export class Repository {
    total_count: number;
    items: [
        {
            id: number,
            name: string,
            full_name: string,
            owner: {
                login: string,
                id: number,
                avatar_url: string

            },
            html_url: string,
            description: string,
            created_at: string
        }
    ]
}