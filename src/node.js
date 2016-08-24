'use strict';

class Node {
  constructor(data, priority) {
    this.data = data;
    this.priority = priority;

    this.parent = null;
    this.left = null;
    this.right = null;
  }

  appendChild(node) {
    if (!this.left) {
      this.left = node;
      this.left.parent = this;
    } else if (!this.right) {
      this.right = node;
      this.right.parent = this;
    }
  }

  /* What is priority ? */
  removeChild(node) {
    if (this.left.priority === node.priority) {

      this.left.parent = null;
      this.left = null;

    } else if (this.right.priority === node.priority) {

      this.right.parent = null;
      this.right = null;

    } else {
      throw 'Not a child of this node';
    }
  }

  remove() {
    if (!this.parent) {
      return;
    }

    this.parent.removeChild(this);
  }

  swapWithParent() {
    var oldParent = this.parent;

    if (!oldParent) {
      return;
    }

    var oldChild = this;
    var oldChildLeft = oldChild.left;
    var oldChildRight = oldChild.right;
    var parentOfParent = this.parent.parent;

    // Check wich branch will change
    var anotherChildOfOldParent = null;
    if (oldParent.left === oldChild) {
      anotherChildOfOldParent = oldParent.right;
    } else {
      anotherChildOfOldParent = oldParent.left;
    }

    // update parent of parent (if exists)   (step1)
    if (parentOfParent) {
      if (oldParent === parentOfParent.left) {
        parentOfParent.left = oldChild;
      } else {
        parentOfParent.right = oldChild;
      }
    }

    // update old child
    if (oldParent.left === oldChild) {
      oldChild.left = oldParent;
      oldChild.right = oldParent.right;
    } else {
      oldChild.right = oldParent;
      oldChild.left = oldParent.left;
    }
    oldChild.parent = parentOfParent;

    // update old parent
    oldParent.left = oldChildLeft;
    oldParent.right = oldChildRight;
    oldParent.parent = oldChild;

    // update another child of old parent (if exists)
    if (anotherChildOfOldParent) {
      anotherChildOfOldParent.parent = oldChild;
    }

    // update children of old child
    if (oldChildLeft) {
      oldChildLeft.parent = oldParent;
    }
    if (oldChildRight) {
      oldChildRight.parent = oldParent;
    }
  }
}

module.exports = Node;
