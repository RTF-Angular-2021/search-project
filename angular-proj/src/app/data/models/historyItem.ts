export class HistoryItem {
    public title: string;
    public requestType: string;
    public quantity: number;
    public sortType: string;

    constructor(item: any) {
        this.title = item.title;
        this.requestType = item.requestType;
        this.quantity = item.quantity;
        this.sortType = item.sortType;
    }
}