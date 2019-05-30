import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { MapService } from '../map.service';
import {environment} from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

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

@Component({
  selector: 'app-map-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class MapLeftComponent implements OnInit {
	
	@Output() onMapZoomOut = new EventEmitter();
	@Output() onMapZoomIn = new EventEmitter();

	constructor(
		@Inject(DOCUMENT) private document: any,
      private mapService: MapService) {
    }

	ngOnInit() {
	}

	clickMapPlus() {
		this.onMapZoomIn.next();
	}

	clickMapMinus() {
		this.onMapZoomOut.next();
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
			if (!this.isFullScreen())
			  this.toggleFullScreen();
		}
  
}
