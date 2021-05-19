//названия соответствуют тому response что приходит, поэтому не по стайл гайду
export class RepositoryModel {
    public total_count: number;
    public items: [
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