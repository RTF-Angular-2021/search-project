import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {TuiRootModule} from '@taiga-ui/core';
 
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { HistoryRequestComponent } from '../components/history-request/history-request.component';
//import { UserComponent } from '../components/user/user.component';
//import { PipesModule } from '../pipes/pipes.module';




@NgModule({
    declarations: [
        SearchBarComponent,
        HistoryRequestComponent,
        MainComponent,
    ],
    imports: [CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiButtonModule,
        TuiDataListWrapperModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiTableModule,
        TuiRootModule,
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule {

}
