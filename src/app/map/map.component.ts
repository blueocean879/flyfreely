import { Component, OnInit, SimpleChanges, Input, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { MapSubSidebarComponent } from './sub-sidebar/sub-sidebar.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  sideBarItems: any[]=[];
  selectedTreeItem: any = null;
  @Input() allowEditing: boolean;
  @Input() selectedLayers: string[];

  @ViewChild('subsidebar') subSidebarEL: MapSubSidebarComponent;

  constructor(private mapService: MapService){}

  ngOnInit() {
    this.sideBarItems = this.mapService.getSidebarMenuItems();
  }

  onSelectTreeItem(item) {
    this.selectedTreeItem = item;
    if (this.subSidebarEL) this.subSidebarEL.isOpen = true;
  }

  onHideSubSidebar() {
    this.selectedTreeItem = null;
  }

  onHideSidebar() {
    if (this.subSidebarEL) this.subSidebarEL.isOpen = false;
  }

  getFeaturesUpdated(event){
    let features = event.features;
    let last_feature = features[features.length - 1];
    console.log(last_feature)
    let current_sidebarItems = this.mapService.getSidebarMenuItems();
    let new_item = {
                id: 5,
                name: 'test',
                text: 'test',
                layer_id: 'class_e1'
              };
    current_sidebarItems.push(new_item);
    this.sideBarItems = current_sidebarItems;
  }

}
