import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class MapService {
    private httpOptions = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };
      
    constructor(private http: HttpClient) {
    }

    getSidebarMenuItems() {
        const nodes = [
            {
                id: 1,
                name: 'root1',
                text: 'This is text for root1',
                children: [
                  { id: 2, name: 'child1', text: 'This is text for child1' },
                  { id: 3, name: 'child2', text: 'This is text for child2' }
                ]
              },
              {
                id: 4,
                name: 'root2',
                text: 'This is text for root2',
                children: [
                  { id: 5, name: 'child2.1', text: 'This is text for child2.1' },
                  {
                    id: 6,
                    name: 'child2.2',
                    text: 'This is text for child2.2',
                    children: [
                      { id: 7, name: 'subsub', text: 'This is text for subsub' }
                    ]
                  }
                ]
              }
            ];

        return nodes;
    }
    
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
