import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapService } from '../map.service';
import {environment} from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

const MAPBOX_KEY = environment.mapbox_key;
const AIRMAP_API_KEY = environment.airmap_api_key;
const DEFAULT_ZOOM_LEVEL = environment.default_zoomlevel;
const DEFAULT_LNG = environment.default_lng;
const DEFAULT_LAT = environment.default_lat;

interface FsDocument extends HTMLDocument {
	mozFullScreenElement?: Element;
	msFullscreenElement?: Element;
	fullscreenElement: Element;
	webkitFullscreenElement?: Element;
	webkitExitFullscreen?:() => void;
	msExitFullscreen?: () => void;
	mozCancelFullScreen?: () => void;
}

interface FsDocumentElement extends HTMLElement {
	msRequestFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullscreen?: () => void;
}

interface CustomFeature{
	type : string;
	geometry : []
}

@Component({
  selector: 'app-map-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MapContentComponent implements OnInit {

		map: any;
		draw_control: any;
    document_element : any;
    is_fullscreen: boolean = false;
    @Input() allowDrawing:boolean = true;
    @Input() customFeatures: CustomFeature[];
    @Output() OnFeaturesUpdated: EventEmitter<any> = new EventEmitter();
		@Output() onMapStyleLoaded: any = new EventEmitter();

	 	constructor(
      @Inject(DOCUMENT) private document: any,
      private mapService: MapService) {
      this.document_element = document.documentElement;
    }

		ngOnInit() {
			this.mapLoad();
		}

	  mapLoad() {
	    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
	      MAPBOX_KEY
	    );

	    this.map = new mapboxgl.Map({
			  container: 'map_canvas',
			  style: 'https://api.airmap.io/maps/v4/tilejson/class_b,class_c,class_d,class_e0?apikey='+AIRMAP_API_KEY+'&token='+AIRMAP_API_KEY+'&theme=satellite', //stylesheet location
			  zoom: DEFAULT_ZOOM_LEVEL,
			  center: [DEFAULT_LNG, DEFAULT_LAT]
			});

			this.mapService.map = this.map;

			this.map.on('style.load', () => {
        this.onMapStyleLoaded.next();
      });

			// optional
			var nav = new mapboxgl.NavigationControl();
			this.map.addControl(nav, 'bottom-right');

			this.map.addControl(new MapboxGeocoder({
				accessToken: MAPBOX_KEY,
				mapboxgl: mapboxgl
			}));

			if(this.allowDrawing){
				this.drawingTool();
			}
			
	  }

	  drawingTool(){
	  	this.draw_control = new MapboxDraw({
					displayControlsDefault: false,
					controls: {
						point:true,
						polygon: true,
						line_string:true,
						trash: true
					}
			});

			this.map.addControl(this.draw_control, 'top-right');

		/*	var ids = this.draw_control.set({
			  type: 'FeatureCollection',
			  features: [{
			    type: 'Feature',
			    properties: {},
			    id: 'example-id',
			    geometry: { type: 'Point', coordinates: [0, 0] }
			  }]
			});*/
			
			this.map.on('draw.create', e => {
				this.updateArea(e);
			});

			this.map.on('draw.delete',  e => {
				this.updateArea(e);
			});

			this.map.on('draw.update',  e => {
				this.updateArea(e);
			});

			this.map.on('draw.selectionchange', e => {
				if(e.features.length == 0){
					let data = this.draw_control.getAll();
					this.OnFeaturesUpdated.next(data);
				}
			})

	  }  

	  updateArea(e){
	  
    }
    
    setDefaultMap() {
    	this.map.flyTo({center: [DEFAULT_LNG, DEFAULT_LAT], zoom: DEFAULT_ZOOM_LEVEL});
    }

    isFullScreen(): boolean {
      const fsDoc = <FsDocument> document;
      return !!(fsDoc.fullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
    }

    toggleFullScreen(): void {
      const fsDoc = <FsDocument> document;
    
      if (!this.isFullScreen()) {
        const fsDocElem = <FsDocumentElement> document.documentElement;
    
        if (fsDocElem.requestFullscreen)
        fsDocElem.requestFullscreen();
        else if (fsDocElem.msRequestFullscreen)
        fsDocElem.msRequestFullscreen();
        else if (fsDocElem.mozRequestFullScreen)
        fsDocElem.mozRequestFullScreen();
        else if (fsDocElem.webkitRequestFullscreen)
        fsDocElem.webkitRequestFullscreen();
      }
      else if (fsDoc.exitFullscreen)
        fsDoc.exitFullscreen();
      else if (fsDoc.msExitFullscreen)
        fsDoc.msExitFullscreen();
      else if (fsDoc.mozCancelFullScreen)
        fsDoc.mozCancelFullScreen();
      else if (fsDoc.webkitExitFullscreen)
        fsDoc.webkitExitFullscreen();
      }
    
      setFullScreen(): void {
      this.is_fullscreen = !this.is_fullscreen;
      if (this.is_fullscreen !== this.isFullScreen())
        this.toggleFullScreen();
      }

}
