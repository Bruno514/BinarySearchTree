import Tree from "../lib/Tree.js";

const tree = new Tree([1, 2, 3, 12, 34, 5]);
tree.prettyPrint(tree.root);

tree.prettyPrint(tree.insert(tree.root, 4));

console.log("OK");
tree.delete(tree.root, 2);
tree.prettyPrint(tree.root);
console.log(tree.find(tree.root, 5));
tree.prettyPrint(tree.root);
tree.levelOrder((v) => {
  console.log("node value: ", v);
});

console.log(tree.preOrder());
console.log(tree.postOrder());

console.log(tree.height(tree.root));
console.log(tree.depth(tree.root.right.right));
tree.prettyPrint(tree.root);
console.log("Right subtree: ", tree.height(tree.root.right));
console.log("left subtree: ", tree.height(tree.root.left));
console.log(tree.isBalanced());
tree.prettyPrint(tree.root);
tree.rebalance();
tree.prettyPrint(tree.root);
