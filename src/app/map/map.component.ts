import { Component, OnInit, SimpleChanges, Input, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './map.service';
import { MapSubSidebarComponent } from './sub-sidebar/sub-sidebar.component';
import { MapSidebarComponent } from './sidebar/sidebar.component';
import { MapContentComponent } from './content/content.component';

import { MapRightComponent } from './right/right.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  markers: any[]=[];
  layers: any[]=[];

  selectedTreeItem: any = null;
  @Input() allowEditing: boolean;
  @Input() selectedLayers: string[];

  @ViewChild('mapContent') mapcontentEL: MapContentComponent;
  @ViewChild('sidebar') sidebarEL: MapSidebarComponent;
  @ViewChild('subsidebar') subSidebarEL: MapSubSidebarComponent;

  @ViewChild('rightbar') rightbar : MapRightComponent;
  

  bottom_last_month_missions: number = 18;
  bottom_two_month_missions: number = 12;
  bottom_personal: number = 4;
  bottom_rpas: number = 6;
  bottom_missions: number = 46;
  bottom_flight_hours: number = 39.8;
  bottom_active_missions: number = 0;
  bottom_maintanance_requests: number = 0;
  bottom_new_incidents: number = 0;
  bottom_active_area_approvals: number = 1;
  bottom_pending_area_apporovals: number = 0;

  constructor(private mapService: MapService){}

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.layers = this.mapService.getLayers();
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
    if (this.rightbar) {
      this.rightbar.setAllLayersChecked();
      this.rightbar.setAllMarkersChecked();
    } 
  }

  getFeaturesUpdated(event){
    let features = event.features;
    let last_feature = features[features.length - 1];
    
    this.mapService.draw_control.deleteAll();
    this.mapService.addCustomLayer(last_feature);

    let itemsCount;
    if(this.sidebarEL) 
      itemsCount = this.layers.length;

    let new_item = {
      id: itemsCount + 1,
      name: 'Custom ' + last_feature.geometry.type,
      text: 'Custom ' + last_feature.geometry.type,
      layer_id: last_feature.id,
      type : last_feature.geometry.type,
      coordinates : last_feature.geometry.coordinates
    };

    let isLayerFound = this.mapService.layers.find(node => node.layer_id == last_feature.id);
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

  onMapZoomIn() {
    this.mapcontentEL.zoomIn();
  }

  onMapZoomOut() {
    this.mapcontentEL.zoomOut();
  }

  onSelectMarker(event) {
    console.log("select marker");
  }

  onSelectLayer(event) {
    console.log("select layer");
  }

}
