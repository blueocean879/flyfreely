import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { MapSidebarComponent } from './sidebar/sidebar.component';
import { MapSubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { MapContentComponent } from './content/content.component';
import { MapService } from './map.service';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';
import { MapBottomComponent } from './bottom/bottom.component';
import { MapLeftComponent } from './left/left.component';
import { MapRightComponent } from './right/right.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
        CommonModule,
        HttpClientModule,
		TreeModule.forRoot(),
		NgbModule,
		FormsModule
	],
	exports: [
        MapComponent,
        MapSidebarComponent,
        MapSubSidebarComponent,
        MapContentComponent,
        MapBottomComponent,
        MapLeftComponent,
        MapRightComponent
	],
	declarations: [
        MapComponent,
        MapSidebarComponent,
        MapSubSidebarComponent,
		MapContentComponent,
		MapBottomComponent,
        MapLeftComponent,
        MapRightComponent
	],
	providers:[
        MapService
	]
})
export class MapModule { }


