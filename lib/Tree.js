import mergeSort from "./sort.js";
import Node from "./Node.js";

export default class Tree {
  constructor(array) {
    const sortedArray = mergeSort(array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end || !array.length) return null;

    const mid = parseInt((start + end) / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insert(node, value) {
    if (node === null) {
      return new Node(value);
    }
    if (value < node.data) {
      node.left = this.insert(node.left, value);
    }
    if (value > node.data) {
      node.right = this.insert(node.right, value);
    }

    return node;
  }

  delete(root, value) {
    if (root === null) return root;

    if (value > root.data) root.right = this.delete(root.right);
    else if (value < root.data) root.left = this.delete(root.left);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      let curr = root.right;
      while (curr.left) {
        curr = curr.left;
      }

      root.data = curr.data;
      root.right = this.delete(root.right, root.value);
    }
  }

  find(root, value) {
    if (root === null) return null;

    if (value > root.data) return this.find(root.right, value);
    else if (value < root.data) return this.find(root.left, value);
    else if (value === root.data) return root;
  }

  levelOrder(callback = null) {
    const queue = [];
    queue.push(this.root);
    const itemsList = [];

    while (queue.length) {
      const currentNode = queue.shift();

      if (callback === null) {
        itemsList.push(currentNode.data);
      } else {
        callback(currentNode.data);
      }

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }

    return itemsList.length ? itemsList : null;
  }

  inOrder(callback = null) {
    if (this.root === null) return;

    const listNodes = [];
    this.#fillListInOrder(this.root, listNodes);

    if (callback) {
      listNodes.map(callback);
    } else {
      return listNodes;
    }
  }

  preOrder(callback = null, root = this.root) {
    if (this.root === null) return;

    const listNodes = [];
    this.#fillListPreOrder(this.root, listNodes);

    if (callback) {
      listNodes.map(callback);
    } else {
      return listNodes;
    }
  }

  postOrder(callback = null, root = this.root) {
    if (this.root === null) return;

    const listNodes = [];
    this.#fillListPostOrder(this.root, listNodes);

    if (callback) {
      listNodes.map(callback);
    } else {
      return listNodes;
    }
  }

  #fillListInOrder(root = this.root, listNodes) {
    if (root === null) return;

    this.#fillListInOrder(root.left, listNodes);
    listNodes.push(root.data);
    this.#fillListInOrder(root.right, listNodes);
  }

  #fillListPreOrder(root = this.root, listNodes) {
    if (root === null) return;

    listNodes.push(root.data);
    this.#fillListInOrder(root.left, listNodes);
    this.#fillListInOrder(root.right, listNodes);
  }

  #fillListPostOrder(root = this.root, listNodes) {
    if (root === null) return;

    this.#fillListInOrder(root.left, listNodes);
    this.#fillListInOrder(root.right, listNodes);
    listNodes.push(root.data);
  }

  height(root = this.root) {
    if (root === null) return 0;
    else {
      const leftHeight = this.height(root.left);
      const rightHeight = this.height(root.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(node, root = this.root) {
    if (root === null || node === null) {
      return -1;
    }

    let dist = -1;

    if (
      root.data === node.data ||
      // Otherwise, check if x is
      // present in the left subtree
      (dist = this.depth(node, root.left)) >= 0 ||
      // Otherwise, check if x is
      // present in the right subtree
      (dist = this.depth(node, root.right)) >= 0
    )
      // Return depth of the node
      return dist + 1;

    return dist;
  }

  isBalanced() {
    const rightSubtreeHeight = this.height(this.root.right);
    const leftSubtreeHeight = this.height(this.root.left);

    return !(Math.abs(rightSubtreeHeight - leftSubtreeHeight) > 1);
  }

  rebalance() {
    const sortedArray = mergeSort(this.levelOrder());

    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
