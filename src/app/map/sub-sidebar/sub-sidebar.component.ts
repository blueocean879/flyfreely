import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map-sub-sidebar',
  templateUrl: './sub-sidebar.component.html',
  styleUrls: ['./sub-sidebar.component.scss']
})
export class MapSubSidebarComponent implements OnInit {
  
  @Input() selectedItem: any;
  isOpen: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  togglePane() {
    this.isOpen = !this.isOpen;
  }
}
