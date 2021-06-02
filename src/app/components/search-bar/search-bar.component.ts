import { OnInit } from '@angular/core';
import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

import { FormControl } from '@angular/forms';
import { ISearchChange } from '../../interfaces/IearchChange';

enum Options{
    users = "Поиск по пользователям",
    repos = "Поиск по репозиториям",
}

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
    @Input()
    set value(value: string | null) {
        if (value) {
            this.formControl.patchValue(value);
            this.searchChange.emit({value, type: this.defaultType});
        }
    }

    public defaultType: string = "users";
    public items: string[] = ["Поиск по пользователям", "Поиск по репозиториям"];

    @Output()
    searchChange: EventEmitter<ISearchChange> = new EventEmitter();

    formControl: FormControl = new FormControl(null);
    selectedFormControl: FormControl = new FormControl(this.items[0]);

    ngOnInit(): void {
        console.log(Options["users"]);
    }

    private getTypeBySelect(type: string): string {
        return type === 'Поиск по пользователям' ? 'users' : 'repos';
    }

    public onSubmit(): void {
        const searchString: string = this.formControl.value;
        const typeSearch: string = this.getTypeBySelect(this.selectedFormControl.value);
        console.log(searchString, typeSearch);
        this.searchChange.emit({ value:searchString, type:typeSearch });
    }

}
