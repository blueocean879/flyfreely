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
    this.subSidebarEL.isOpen = true;
  }

  onHideSubSidebar() {
    this.selectedTreeItem = null;
  }

  onHideSidebar() {
    this.subSidebarEL.isOpen = false;
  }

}
