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

	removeChild(node) {
		if (this.left.priority === node.priority) {
			this.left = null;
		} else if (this.right.priority === node.priority) {
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

	}
}

module.exports = Node;
