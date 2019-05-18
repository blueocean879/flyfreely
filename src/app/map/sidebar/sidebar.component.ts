import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';


@Component({
  selector: 'app-map-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class MapSidebarComponent implements OnInit {
  @Input() items: any[] = [];
  @Output() onSelectItem = new EventEmitter();

  isOpen: boolean = true;
  options: ITreeOptions = {
    useCheckbox: true
  };
  constructor() { }

  ngOnInit() {
    console.log(this.items);
  }


  togglePane() {
    this.isOpen = !this.isOpen;
  }

  activateTree(event) {
    console.log("activate:",event);
    this.onSelectItem.next(event.node.data);
  }

  focusTree(event) {
    console.log("focus:",event);

  }

  blurTree(event) {
    console.log("blur:",event);
  }
}
