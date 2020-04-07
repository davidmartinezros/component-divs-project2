import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Node } from '../node.class';

import { LoadComponent } from '../load/load.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  @Input() tree: Observable<Array<Node>>;

  _dragNode:{ node: Node, index:number };
  
  _dropLocation: { component: any, node: Node, index: number };

  constructor() {
    //console.log("AppComponent.data:" + this.tree);
  }

  ngOnInit() {

  }

  allowDrag() {
    return true;
  }

  setDragNode($event) {
    //console.log('setDragNode:' + $event.dragNode);
    this._dragNode = $event.dragNode;
  }

  getDragNode():{ node: Node, index:number } {
    return this._dragNode || { node:null, index: null };
  }

  isDragging() {
    return this.getDragNode().node;
  }

  setDropLocation($event) {
    //console.log('setDropLocation:' + $event.dropLocation);
    this._dropLocation = $event.dropLocation;
  }

  getDropLocation(): { component: any, node: Node, index: number } {
    return this._dropLocation || {component: null, node: null, index: null};
  }

  isDraggingOver(component) {
    return this.getDropLocation().component === component;
  }

  doDragAndDrop($event) {
    //console.log('doDragAndDrop');
    
    //console.log(this._dragNode);

    //console.log(this._dropLocation);

    // fer swap entre _dragnode i dropLocation
    let node_tmp: Node = new Node();

    node_tmp.id = this._dropLocation.node.id;
    node_tmp.title = this._dropLocation.node.title;
    node_tmp.firstNode = this._dropLocation.node.firstNode;
    node_tmp.lastNode = this._dropLocation.node.lastNode;
    node_tmp.nodeIndex = this._dropLocation.node.nodeIndex;
    node_tmp.style = this._dropLocation.node.style;
    node_tmp.styleTitle = this._dropLocation.node.styleTitle;
    node_tmp.styleContent = this._dropLocation.node.styleContent;
    node_tmp.content = this._dropLocation.node.content;

    this._dropLocation.node.id = this._dragNode.node.id;
    this._dropLocation.node.title = this._dragNode.node.title;
    this._dropLocation.node.firstNode = this._dragNode.node.firstNode;
    this._dropLocation.node.lastNode = this._dragNode.node.lastNode;
    this._dropLocation.node.nodeIndex = this._dragNode.node.nodeIndex;
    this._dropLocation.node.style = this._dragNode.node.style;
    this._dropLocation.node.styleTitle = this._dropLocation.node.styleTitle;
    this._dropLocation.node.styleContent = this._dropLocation.node.styleContent;
    this._dropLocation.node.content = this._dragNode.node.content;

    this._dragNode.node.id = node_tmp.id;
    this._dragNode.node.title = node_tmp.title;
    this._dragNode.node.firstNode = node_tmp.firstNode;
    this._dragNode.node.lastNode = node_tmp.lastNode;
    this._dragNode.node.nodeIndex = node_tmp.nodeIndex;
    this._dragNode.node.style = node_tmp.style;
    this._dragNode.node.styleTitle = node_tmp.styleTitle;
    this._dragNode.node.styleContent = node_tmp.styleContent;
    this._dragNode.node.content = node_tmp.content;
  }

}
