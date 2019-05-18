import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  sideBarItems: any[]=[];
  selectedTreeItem: any = null;
  
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.sideBarItems = this.mapService.getSidebarMenuItems();
  }

  onSelectTreeItem(item) {
    console.log(item);
    this.selectedTreeItem = item;
  }

}
