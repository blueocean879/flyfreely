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

interface CustomFeature{
	feature : any;
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

    @Input() allowDrawing:boolean = true;
    @Input() customFeatures: CustomFeature[];
    @Output() OnFeaturesUpdated: EventEmitter<any> = new EventEmitter();
		@Output() onMapStyleLoaded: any = new EventEmitter();
		@Output() OnFeatureSelected: EventEmitter<any> = new EventEmitter();

	 	constructor(
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

		this.map.addControl(new MapboxGeocoder({
			accessToken: MAPBOX_KEY,
			marker: false,
			mapboxgl: mapboxgl
		}));

		if(this.allowDrawing){
			this.drawingTool();
		}

		this.map.on('load',() => {
			let markers = this.mapService.getMarkers();
			let markerCollections = {
				"type": "FeatureCollection",
				"features": []
			};

			markers.forEach(marker => {
			   markerCollections.features.push(marker.geojson);
			});

			this.map.addLayer({
				"id": "places",
				"interactive": true,
				"type": "circle",
				"source": {
					"type": "geojson",
					"data": markerCollections
				},
				"paint":{
					'circle-color': '#ff0000',
					'circle-radius': 10
				}
			});

			this.map.on('click', 'places', e => {
				this.map.flyTo({center: e.features[0].geometry.coordinates});
				
				new mapboxgl.Popup()
				.setLngLat(e.features[0].geometry.coordinates)
				.setHTML(e.features[0].properties.name)
				.addTo(this.map);


			});
			 
			// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
			this.map.on('mouseenter', 'places', e => {
				this.map.getCanvas().style.cursor = 'pointer';
			});
			 
			// Change it back to a pointer when it leaves.
			this.map.on('mouseleave', 'places', e => {
				this.map.getCanvas().style.cursor = '';
			});

			this.map.on('click', e => {
				let nodes = this.mapService.layers;
				let layers = nodes.map(node => node.layer_id);
		      	var features = this.map.queryRenderedFeatures(e.point, {
		        	layers: layers
		      	});

		      	if (!features.length) {
		        	return;
		      	}

	      		new mapboxgl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(features[0].properties.name)
				.addTo(this.map);

	      		this.OnFeatureSelected.next(features[0]);
	    	});
		});
		
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
			this.mapService.draw_control = this.draw_control;

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
					this.draw_control.changeMode('simple_select');
				}
			})

	  }  

	  	updateArea(e){
	  		if (!e.features.length) {
        	return;
      	}

	  	if(e.type == "draw.update"){
	      let feature = e.features[0];
	      let source = this.map.getSource(feature.id);
	      source.setData(feature);

	      this.mapService.updateLayersItem(feature);
	  	}

    }
    
    setDefaultMap() {
    	this.map.flyTo({center: [DEFAULT_LNG, DEFAULT_LAT], zoom: DEFAULT_ZOOM_LEVEL});
    }

    zoomOut(){
    	this.map.zoomOut();	
    }

    zoomIn(){
    	this.map.zoomIn();
    }


}
