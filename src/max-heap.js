'use strict';

const Node = require('./node');

class MaxHeap {
  constructor() {
    this.root = null;
    this.parentNodes = [];
    this.lastInsertedNode;
  }

  push(data, priority) {
    const node = new Node(data, priority);
    this.lastInsertedNode = node;
    this.insertNode(node);
    this.shiftNodeUp(node);
  }

  insertNode(node) {
    if (!this.root) {
      this.root = node;
      this.parentNodes.push(node);
      return;
    }

    // add to tree
    for (let i = 0; i < this.parentNodes.length; i++) {
      const currentItem = this.parentNodes[i];

      if (!currentItem.left || !currentItem.right) {
        currentItem.appendChild(node);
        break;
      }
    }

    // update parentNodes
    if (this.parentNodes[0].left && this.parentNodes[0].right) {
      this.parentNodes.shift();
    }
    this.parentNodes.push(node);
  }

  shiftNodeUp(node) {
    let parent = node.parent;

    if (!parent) {
      this.root = node;
      return;
    }

    if (node.priority > parent.priority) {
      node.swapWithParent();

      // maintants parentNodes in correct state
      const index = this.parentNodes.findIndex((i) => i === node);
      const parentIndex = this.parentNodes.findIndex((i) => i === parent);

      if (index !== -1) {
        this.parentNodes[index] = parent;
      }

      if (parentIndex !== -1) {
        this.parentNodes[parentIndex] = node;
      }

      this.shiftNodeUp(node);
    }
  }


  pop() {
    if (!this.parentNodes.length) {
      return ;
    }

    const rootData = this.root.data;
    const rootLeft = this.root.left;
    const rootRight = this.root.right;

    this.detachRoot();

    return rootData;
  }

  detachRoot() {
    if (this.parentNodes.length === 1) {
      this.root = null;
      return this.parentNodes.shift();
    }

    const rootElem = this.root;
    const rootLeft = this.root.left;
    const rootRight = this.root.right;

    if ( !rootLeft ) {
         this.root = rootRight;
    }else if (!rootRight) {
         this.root = rootLeft;
    }else if (rootLeft.priority > rootRight.priority) {
      this.root = rootLeft;
    } else {
      this.root = rootRight;
    }

    // remove root from parentNodes
    if (this.parentNodes[0] !== this.root) {
      this.parentNodes.shift();
    }

    return rootElem;
  }

  restoreRootFromLastInsertedNode(detached) {

/*
      const rootElem = this.root;

      this.root = this.lastInsertedNode;
      this.root.left = rootElem.left;
*/

  }

  size() {
      return this.parentNodes.length+1;
  }

  isEmpty() {
    return !this.parentNodes.length;
  }

  clear() {
    this.root = null;
    this.parentNodes = [];
  }





  shiftNodeDown(node) {

      let leftChild = node.left;
      let rightChild = node.right;
      let parent = node.parent;
      let changeChild;

      if( !leftChild && !rightChild){
          return ;
      }
      if (node.priority < leftChild.priority){
          leftChild.swapWithParent();
          changeChild = leftChild;

      }else if(node.priority < rightChild.priority){
          rightChild.swapWithParent();
          changeChild = rightChild;
      }


      const index = this.parentNodes.findIndex((i) => i === changeChild);
      const parentIndex = this.parentNodes.findIndex((i) => i === node);

      if (index !== -1) {
        this.parentNodes[index] = node;
      }

      if (parentIndex !== -1) {
        this.parentNodes[parentIndex] = changeChild;
      }



      if (!parent) {
        this.root = changeChild;
      }

      this.shiftNodeDown(node);


/*      let parent = node.parent;

      if (!parent) {
        this.root = node;
        return;
      }

      if (node.priority > parent.priority) {
        node.swapWithParent();

        // maintants parentNodes in correct state
        const index = this.parentNodes.findIndex((i) => i === node);
        const parentIndex = this.parentNodes.findIndex((i) => i === parent);

        if (index !== -1) {
          this.parentNodes[index] = parent;
        }

        if (parentIndex !== -1) {
          this.parentNodes[parentIndex] = node;
        }

        this.shiftNodeUp(node);
      }

*/

  }
}

function getParentIndex(i) {
  return Math.floor((i - 1) / 2);
}

module.exports = MaxHeap;
