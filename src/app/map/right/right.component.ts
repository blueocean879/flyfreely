import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MapService } from '../map.service';
import { IActionMapping, TreeComponent, ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';


@Component({
  selector: 'app-map-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class MapRightComponent implements OnInit {

	isMarker: boolean = true;	
	items: any[]=[];

	@Input() markers: any[] = [];
	@Input() layers: any[] = [];

	@Output() onSelectMarker = new EventEmitter();
	@Output() onSelectLayer = new EventEmitter();
	actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
				if (this.isMarker) this.onSelectMarker.next(node.data);
				else this.onSelectLayer.next(node.data);

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

	constructor(
      private mapService: MapService) {
    }

	ngOnInit() {
	}

	switchMarkerLayer() {
		if (this.isMarker) this.items = this.markers;
		else this.items = this.layers;
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
