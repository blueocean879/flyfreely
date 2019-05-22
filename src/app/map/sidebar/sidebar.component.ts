import { Component, OnInit, ViewChild, Input, Output, EventEmitter,AfterViewInit } from '@angular/core';
import { ITreeOptions, TreeComponent, IActionMapping, TREE_ACTIONS } from 'angular-tree-component';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class MapSidebarComponent implements OnInit, AfterViewInit {
  
  @Input() items: any[] = [];
  @Output() onSelectItem = new EventEmitter();
  @Output() onHideSidebar = new EventEmitter();

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        this.onSelectItem.next(node.data);

        $event.shiftKey
          ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);

      }
    }
  };
  
  isOpen: boolean = true;
  options: ITreeOptions = {
    actionMapping: this.actionMapping,
    useCheckbox: true
  };

  @ViewChild(TreeComponent) tree: TreeComponent;

  constructor(private mapService:MapService) {}

  ngOnInit() {
  //  console.log(this.items);
  }

  ngAfterViewInit(){

  }

  setAllLayersChecked() {
    const nodes = this.tree.treeModel.nodes;
    nodes.forEach(node => {
      this.tree.treeModel.getNodeById(node.id).setIsSelected(true);
    })
  }

  setLayerItemSelected(new_item: any){
    this.tree.treeModel.nodes.push(new_item)
    this.tree.treeModel.update();
    this.tree.treeModel.getNodeById(new_item.id).setIsSelected(true);
  }

  getLayerItemsCount(){
    const nodes = this.tree.treeModel.nodes;
    return nodes.length;
  }

  togglePane() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.onHideSidebar.next();
    }
  }

  activateTree(event) {
  
  }

  focusTree(event) {
    
  }

  blurTree(event) {
    
  }

  clickTree(event) {
    
  }

  onSelect(event){
    let layer_id = event.node.data.layer_id;
    this.mapService.selectLayer(layer_id);
  }

  onDeselect(event){
    let layer_id = event.node.data.layer_id;
    this.mapService.unselectLayer(layer_id);
  }

  onUpdateTree(event) {
    console.log(event);
  }
}
