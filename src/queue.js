'use strict';

const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.currentSize = 0;
        this.heap = new MaxHeap();
        this.myHeap = {};
	}

	push(data, priority) {
        if (this.currentSize < this.maxSize) {

            this.heap.push(data, priority);

            this.currentSize ++;
        }else {
          throw 'Quene full';
        }
	}

	shift() {
        let shiftNodeData;
        if( this.currentSize ){
            shiftNodeData = this.heap.pop();
            this.currentSize --;
        }else{
            throw 'Nothing to extract';
        }
        return shiftNodeData;
    }

	size() {
        return this.currentSize;
	}

	isEmpty() {
        if( !this.currentSize ){
            return true;
        }
        return false;
	}
}

module.exports = PriorityQueue;
