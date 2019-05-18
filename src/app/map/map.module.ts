import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapSidebarComponent } from './sidebar/sidebar.component';
import { MapSubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { MapContentComponent } from './content/content.component';
import { MapService } from './map.service';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';

@NgModule({
	imports: [
        CommonModule,
        HttpClientModule,
        TreeModule.forRoot()
	],
	exports: [
        MapComponent,
        MapSidebarComponent,
        MapSubSidebarComponent,
        MapContentComponent
	],
	declarations: [
        MapComponent,
        MapSidebarComponent,
        MapSubSidebarComponent,
        MapContentComponent
	],
	providers:[
        MapService
	]
})
export class MapModule { }


