import { Injectable,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Map, GeoJSONSource, LngLat } from "mapbox-gl";
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { Feature, Point as GeoPoint, LineString } from "geojson";
import * as turf from "@turf/turf";

@Injectable()
export class MapService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
      
    map:Map;
    draw_control: any;
    nodes:Array<any> = [
      {
        id: 1,
        name: 'Class B',
        text: 'Class B',
        layer_id: 'class_b',
      },
      {
        id: 2,
        name: 'Class C',
        text: 'Class C',
        layer_id: 'class_c',
      },
      {
        id: 3,
        name: 'Class D',
        text: 'Class D',
        layer_id: 'class_d',
      },
      {
        id: 4,
        name: 'Class E0',
        text: 'Class E0',
        layer_id: 'class_e0',
      }
    ];

    constructor(private http: HttpClient) {
    }

    getSidebarMenuItems() {
      return this.nodes;
    }

    updateSidebarMenuItem(item){
      let nodeSelected = this.nodes.find(node => node.layer_id == item.id);
      nodeSelected.coordinates = item.geometry.coordinates;
    }
    
    private handleError(error: Response | any) {
      return Observable.throw(error);
    }

    selectLayer(layer_id){
      if(this.map.getLayer(layer_id)){
        this.map.setLayoutProperty(layer_id, 'visibility', 'visible');
      }
    }

    unselectLayer(layer_id){
      if(this.map.getLayer(layer_id)){
        this.map.setLayoutProperty(layer_id, 'visibility', 'none');
      }
    }

    allowLayerEditing(item){
      if(item.id < 5) return; // exclude class_layers 

      this.draw_control.set({
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          id: item.layer_id,
          geometry: { type: item.type, coordinates: item.coordinates }
        }]
      });
    }

    getCentroid(feature){
      let centroid = null;
  
      if(feature.geometry.type == "Polygon"){
        let polygon = turf.polygon(feature.geometry.coordinates);
        centroid = turf.centroid(polygon);
      }

      return centroid;
    }

    addCustomLayer(feature){
      let type = 'fill';
      let drawing_option = {};

      if(feature.geometry.type == "Polygon"){
        type = 'fill';
        drawing_option = {
          'fill-color': '#00ff00',
          'fill-opacity': 0.5
        };
      }
      
      if(feature.geometry.type == "Point"){
        type = "circle";
        drawing_option = {
          'circle-radius': 5,
          'circle-color': '#ffff00'
        };
      }

      if(feature.geometry.type == "LineString"){
        type = "line";
        drawing_option = {
          "line-color": "#00ff00",
          "line-width": 2
        };
      }

      if(!this.map.getLayer(feature.id)){
        this.map.addLayer({
          'id': feature.id,
          'type': type,
          'source': {
            'type': 'geojson',
              'data': {
              'type': 'Feature',
              'geometry': feature.geometry
            }
          },
          'layout': {},
          'paint': drawing_option
        });
      }

    }
}
