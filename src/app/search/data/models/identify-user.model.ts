//названия соответствуют тому response что приходит, поэтому не по стайл гайду
export class UserModel {
    public total_count: number;
    public items: [
        {
            login: string,
            id: number,
            avatar_url: string,
            html_url: string,
            repos_url: string,
            following_url: string,
        }
    ]
}


