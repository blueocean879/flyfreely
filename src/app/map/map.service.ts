import { Injectable,ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Map, GeoJSONSource, LngLat } from "mapbox-gl";

@Injectable()
export class MapService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
      
    map:Map;

    constructor(private http: HttpClient) {
    }

    getSidebarMenuItems() {
        const nodes = [
            {
                id: 1,
                name: 'Class B',
                text: 'Class B',
                layer_id: 'class_b',
                isSelected: true
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
              },
            ];

        return nodes;
    }
    
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

    selectLayer(layer_id){
      this.map.setLayoutProperty(layer_id, 'visibility', 'visible');
    }

    unselectLayer(layer_id){
      this.map.setLayoutProperty(layer_id, 'visibility', 'none');
    }
}
