import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment';

const MAPBOX_KEY = environment.mapbox_key;
const AIRMAP_API_KEY = environment.airmap_api_key;

@Component({
  selector: 'app-map-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class MapContentComponent implements OnInit {
		map: any;
	 	constructor() { }

		ngOnInit() {
			this.mapLoad();
		}

	  mapLoad() {
	    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
	      MAPBOX_KEY
	    );

	    var map = new mapboxgl.Map({
			  container: 'map_canvas',
			  style: 'https://api.airmap.io/maps/v4/tilejson/class_b,class_c,class_d,class_e0?apikey='+AIRMAP_API_KEY+'&token='+AIRMAP_API_KEY+'&theme=satellite', //stylesheet location
			  zoom: 1,
			  center: [-14, 35]
			});

			// optional
			map.addControl(new mapboxgl.NavigationControl());

	  }

}
