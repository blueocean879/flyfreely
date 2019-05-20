import { Component, OnInit, ViewChild, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { ITreeOptions, TreeComponent } from 'angular-tree-component';
import { MapService } from '../map.service';


@Component({
  selector: 'app-map-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class MapSidebarComponent implements OnInit, AfterViewInit {
  @Input() items: any[] = [];
  @Output() onSelectItem = new EventEmitter();

  isOpen: boolean = true;
  options: ITreeOptions = {
    useCheckbox: true
  };

  @ViewChild(TreeComponent) tree: TreeComponent;

  constructor(private mapService:MapService) {}

  ngOnInit() {
  //  console.log(this.items);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      const nodes = this.tree.treeModel.nodes;
      nodes.forEach(node => {
        this.tree.treeModel.getNodeById(node.id).setIsSelected(true)
      })
    },1000);
  }

  togglePane() {
    this.isOpen = !this.isOpen;
  }

  activateTree(event) {
    this.onSelectItem.next(event.node.data);
  }

  focusTree(event) {
  }

  blurTree(event) {
  }

  onSelect(event){
    let layer_id = event.node.data.layer_id;
    this.mapService.selectLayer(layer_id);
  }

  onDeselect(event){
    let layer_id = event.node.data.layer_id;
    this.mapService.unselectLayer(layer_id);
  }
}
