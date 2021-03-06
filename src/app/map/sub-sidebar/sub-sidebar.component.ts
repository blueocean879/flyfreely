import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-map-sub-sidebar',
  templateUrl: './sub-sidebar.component.html',
  styleUrls: ['./sub-sidebar.component.scss']
})
export class MapSubSidebarComponent implements OnInit {
  
  @Input() selectedItem: any;
  @Output() onHideSubSideBar = new EventEmitter();
  isOpen: boolean = true;
  
  constructor() { }

  ngOnInit() {
  }

  
	ngOnChanges(changes: SimpleChanges) {
		
	}

  togglePane() {
    this.isOpen = false;
  }
}
