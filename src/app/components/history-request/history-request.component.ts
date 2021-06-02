import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'app-history-request',
    templateUrl: './history-request.component.html',
    styleUrls: ['./history-request.component.less']
})
export class HistoryRequestComponent implements OnInit {
    @Input()
    public requestsArray: string[] | null = [];

    @Output()
    selectedString: EventEmitter<string> = new EventEmitter();
    @Output()
    clear: EventEmitter<void> = new EventEmitter()

    constructor() { }

    ngOnInit(): void {
    }

}
