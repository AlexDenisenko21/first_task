const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
	}

	pop() {

	}

	detachRoot() {

	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {

	}

	isEmpty() {

	}

	clear() {

	}

	insertNode(node) {
		this.shiftNodeUp(node);

		if (!this.root) {
			this.root = node;
		}
	}

	shiftNodeUp(node) {

	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;
