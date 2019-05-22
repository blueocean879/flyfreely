import { Component, OnInit, SimpleChanges, Input, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { MapSubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { MapSidebarComponent } from './sidebar/sidebar.component';

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

  @ViewChild('sidebar') sidebarEL: MapSidebarComponent;
  @ViewChild('subsidebar') subSidebarEL: MapSubSidebarComponent;
  
  constructor(private mapService: MapService){}

  ngOnInit() {
    this.sideBarItems = this.mapService.getSidebarMenuItems();
  }

  onSelectTreeItem(item) {
    this.mapService.allowLayerEditing(item);
  }

  onHideSubSidebar() {
    this.selectedTreeItem = null;
  }

  onHideSidebar() {
    if (this.subSidebarEL) this.subSidebarEL.isOpen = false;
  }

  onMapStyleLoaded() {
    if (this.sidebarEL) this.sidebarEL.setAllLayersChecked();
  }

  getFeaturesUpdated(event){
    let features = event.features;
    let last_feature = features[features.length - 1];
    
    this.mapService.draw_control.deleteAll();
    this.mapService.addCustomLayer(last_feature);

    let itemsCount;
    if(this.sidebarEL) 
      itemsCount = this.sideBarItems.length;

    let new_item = {
      id: itemsCount + 1,
      name: 'Custom ' + last_feature.geometry.type,
      text: 'Custom ' + last_feature.geometry.type,
      layer_id: last_feature.id,
      type : last_feature.geometry.type,
      coordinates : last_feature.geometry.coordinates
    };

    let isLayerFound = this.mapService.nodes.find(node => node.layer_id == last_feature.id);
    if(!isLayerFound){
      if (this.sidebarEL) this.sidebarEL.setLayerItemSelected(new_item);
    }
    
  }

  getFeatureSelected(event){
    let  centroid = this.mapService.getCentroid(event);
    if(centroid != null){
      this.selectedTreeItem = {
        centerPt : JSON.stringify(centroid.geometry.coordinates)
      };
    }
    else{
      this.selectedTreeItem = {
        centerPt : ""
      };
    }

    if (this.subSidebarEL) this.subSidebarEL.isOpen = true;
  }

}
