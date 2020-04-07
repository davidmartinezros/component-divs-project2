import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { Node } from '../node.class';

import { TREE_EVENTS } from '../constants/events';

@Component({
  selector: 'app-div-node',
  templateUrl: './div-node.component.html',
  styleUrls: ['./div-node.component.css']
})
export class DivNodeComponent implements OnInit {

  @Input() node: Node;
  @Input() parent: Node;
  
  @Input() nodeIndex: number;
  @Input() firstNode: boolean;
  @Input() lastNode: boolean;

  @Output() setDragNode = new EventEmitter();
  @Output() setDropLocation = new EventEmitter();
  @Output() doDragAndDrop = new EventEmitter();
  
  /*
  @Output() onDragStart = new EventEmitter();
  @Output() onDrop = new EventEmitter();
  @Output() onDragEnd = new EventEmitter();
  @Output() onDragOver = new EventEmitter();
  @Output() onDragLeave = new EventEmitter();
  */

  /*
  _dragNode:{ node: Node, index:number };
  
  _dropLocation: { component: any, node: Node, index: number };
  */

  eventNames = Object.keys(TREE_EVENTS);


  constructor() {
  }

  ngOnInit() {
    this.loadNode();
  }

  loadNode() {
    //console.log(this.node.style);
    
    this.node.nodeIndex = this.nodeIndex;
    this.node.firstNode = this.firstNode;
    this.node.lastNode = this.lastNode;

  }

  // TODO: move to draggable directive
  @HostListener('dragstart', ['$event'])
  dragstart($event) {
    //console.log('onDragStart');
    //console.log($event);
    //console.log(this.node);
    setTimeout(() => this.setDragNodeFunc($event, { node: this.node, index: this.nodeIndex }), 30);
  }

  @HostListener('dragend', ['$event'])
  dragend($event) {
    //console.log('onDragEnd');
    this.setDragNodeFunc($event, null);
  }

  @HostListener('dragover', ['$event'])
  dragover($event) {
    //console.log('onDragOver');
    //console.log($event);
    //console.log(this.node);
    $event.preventDefault();
    this.setDropLocationFunc($event, { component: this, node: this.node, index: this.nodeIndex });
    //console.log('fi onDragOver');
  }

  @HostListener('drop', ['$event'])
  drop($event) {
    //console.log('onDrop');
    $event.preventDefault();
    this.mouseAction('drop', $event);
  }

  
  @HostListener('dragleave', ['$event'])
  dragleave($event) {
    //console.log('onDragLeave');
    //if (this.isDraggingOver(this)) {
      this.setDropLocationFunc($event, null);
    //}
  }

  // TODO: move to a different service:
  setDragNodeFunc(event, dragNode:{ node: Node, index:number }) {
    //console.log(dragNode);
    //this._dragNode = dragNode;
    this.setDragNode.emit({event, dragNode});
  }

  /*
  getDragNode():{ node: Node, index:number } {
      return this._dragNode || { node:null, index: null };
  }

  isDragging() {
      return this.getDragNode().node;
  }
  */

  setDropLocationFunc(event, dropLocation: { component: any, node: Node, index: number }) {
    //console.log(dropLocation);
    //this._dropLocation = dropLocation;
    this.setDropLocation.emit({event, dropLocation});
  }
  
  /*
  getDropLocation(): { component: any, node: Node, index: number } {
      return this._dropLocation || {component: null, node: null, index: null};
  }

  isDraggingOver(component) {
      return this.getDropLocation().component === component;
  }
  */
  mouseAction(actionName:string, event) {
    
    this.doDragAndDrop.emit(event);

    // TODO: move to the action itself:
    if (actionName === 'drop') {
      this.cancelDrag();
    }
  }

  cancelDrag() {
    this.setDropLocationFunc(null, null);
    this.setDragNodeFunc(null, null);
  }

}
