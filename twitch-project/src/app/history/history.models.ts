export class History {
    public title: string;
    public quantity: number;
    constructor(item: any) {
        this.title = item.title;
        this.quantity = item.quantity;
    }
}