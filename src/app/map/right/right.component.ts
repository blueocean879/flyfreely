import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { MapService } from '../map.service';
import { IActionMapping, TreeComponent, ITreeOptions, TREE_ACTIONS } from 'angular-tree-component';


@Component({
  selector: 'app-map-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class MapRightComponent implements OnInit {

  isMarker: boolean = true;	
  
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

  @ViewChild('markerTree') markerTree: TreeComponent;
  @ViewChild('layerTree') layerTree: TreeComponent;

	constructor(
      private mapService: MapService) {
    }

	ngOnInit() {
	}

  
	ngOnChanges(changes: SimpleChanges) {
	}

	setAllLayersChecked() {
    const nodes = this.layerTree.treeModel.nodes;
    nodes.forEach(node => {
      this.layerTree.treeModel.getNodeById(node.id).setIsSelected(true);
    })
  }

  setAllMarkersChecked() {
    const nodes = this.markerTree.treeModel.nodes;
    nodes.forEach(node => {
      this.markerTree.treeModel.getNodeById(node.id).setIsSelected(true);
    })
  }


  setLayerItemSelected(new_item: any){
    this.layerTree.treeModel.nodes.push(new_item)
    this.layerTree.treeModel.update();
    this.layerTree.treeModel.getNodeById(new_item.id).setIsSelected(true);
  }


  setMarkerItemSelected(new_item: any){
    this.markerTree.treeModel.nodes.push(new_item)
    this.markerTree.treeModel.update();
    this.markerTree.treeModel.getNodeById(new_item.id).setIsSelected(true);
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
    if (this.isMarker){
      let filter = ['in','id'];
      const nodes = this.markerTree.treeModel.nodes;

      nodes.forEach(node => {
        let selected = this.markerTree.treeModel.getNodeById(node.id).isSelected;
        if(selected){
          filter.push(node.id);
        }
      });
   
      this.mapService.selectMarker(filter)
    }
    else{
      let layer_id = event.node.data.layer_id;
      this.mapService.selectLayer(layer_id);
    }
    
  }

  onDeselect(event){
    if (this.isMarker){
      let filter: any[] = ['all'];
      const nodes = this.markerTree.treeModel.nodes;

      nodes.forEach(node => {
        let selected = this.markerTree.treeModel.getNodeById(node.id).isSelected;
        if(!selected){
          filter.push(['!=','id',node.id]);
        }
      });
     
      this.mapService.unselectMarker(filter)
    }
    else{
      let layer_id = event.node.data.layer_id;
      this.mapService.unselectLayer(layer_id);
    }
  }

  onUpdateTree(event) {
    console.log(event);
  }
}
