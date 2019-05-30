import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapService } from '../map.service';
import {environment} from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-map-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class MapBottomComponent implements OnInit {

		@Input() last_month_missions: number = 18;
		@Input() two_month_missions: number = 12;

		@Input() personal: number = 4;
		@Input() rpas: number = 6;
		@Input() missions: number = 46;
		@Input() flight_hours: number = 39.8;
		

		@Input() active_missions: number = 0;


		@Input() maintanance_requests: number = 0;
		@Input() new_incidents: number = 0;
		@Input() active_area_approvals: number = 1;
		@Input() pending_area_apporovals: number = 0;
	 	constructor(
      private mapService: MapService) {
    }

		ngOnInit() {
		}
}
