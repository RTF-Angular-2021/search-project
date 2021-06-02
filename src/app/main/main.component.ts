import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { GithubSearchService } from 'src/app/services/github-search.service';
import { ISearchChange } from '../interfaces/IearchChange';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less']
})
export class MainComponent implements OnDestroy, OnInit {

    public users$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public historyArray$: BehaviorSubject<string[]> = new BehaviorSubject<string[]
    >([]);
    public searchValue$: BehaviorSubject<string> = new BehaviorSubject<string>("")
    public tableData$: Observable<any> = new Observable();

    private destroyed$: Subject<void> = new Subject();


    constructor(private githubService: GithubSearchService) {
        const items = localStorage.getItem("keyHistory");
        if (items) {
            this.historyArray$.next(JSON.parse(items));
        }
    }

    ngOnInit(): void {


        this.tableData$ = this.users$.pipe(
            map((users: any[]) => {
                const filterList: string[] = ["id", "login", "html_url", "name"];
                if (!users.length) {
                    return {};
                }
                const newElement: Record<string, any> = {};

                const filter = Object.keys(users[0]).filter(element => filterList.includes(element));

                console.log(filter);

                return ({ headers: filter, rows: users });
            }
            )
        )

    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    updateValue(value: string): void {
        this.searchValue$.next(value);
    }

    setLocalStorage(items: string[]): void {
        localStorage.setItem('keyHistory', JSON.stringify(items));
    }

    clearLocalStorage(): void {
        localStorage.clear();
        this.historyArray$.next([]);
    }

    searchResult(result: any | null): void {
        if (!result) {
            return;
        }
        this.users$.next(result.items)

    }


    // Старая реализация фильтрации. 
    // filterSort(elements: any[], type: string = "id", invert: boolean = false): any[] {
    //     return elements.sort(
    //         (a: Record<string, any>, b: Record<string, any>) => {
    //             switch (invert) {
    //                 case false:
    //                     return a[type] > b[type] ? 1 : a[type] < b[type] ? -1 : 0

    //                 default:
    //                     return a[type] < b[type] ? 1 : a[type] > b[type] ? -1 : 0
    //             }

    //         }
    //     );
    // }

    search({ value, type }: ISearchChange): void {
        this.historyArray$.value.push(value);
        this.setLocalStorage(this.historyArray$.value);
        this.githubService
            .getData$(value, type)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((result) => {
                console.log(result);
                this.searchResult(result)
            });

    }




}
