const treeNodeProto = {
  setData: function (data){
    this._data = data;
  },
  setLeft: function(node){
    if (node !== undefined) {
      this._leftNode = node;
    }
  },
  setRight: function(node){
    if (node !== undefined) {
      this._rightNode = node;
    }
  },
  data: function(){
    return this._data;
  },
  left: function(){
    return this._leftNode;
  },
  right: function(){
    return this._rightNode;
  },
};

function TreeNode(data = null){
  const node = Object.create(treeNodeProto);

  node._data = data;
  node._rightNode = null;
  node._leftNode = null;

  return node;
}

const treeProto = {
  _processArray: function(array){
    array.sort((a, b) => {
      if (a > b) return 1;
      else if (a < b) return -1;
      else if (a === b) return 0;
    });

    //removes duplicates
    const noDupes = array.filter((value, index) => {
      return array.indexOf(value) === index;
    });

    return noDupes;
  },
  _buildTree: function(array, start, end){
    if (start > end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const node = TreeNode(array[mid]);

    node.setLeft(this._buildTree(array, start, mid - 1));
    node.setRight(this._buildTree(array, mid + 1, end ));

    return node;
  },
  buildTree: function(array){
    const processedArray = this._processArray(array);
    console.log(processedArray);
    this._root = this._buildTree(processedArray, 0, processedArray.length - 1);

    return this._root;
  },
  root: function(){
    return this._root;
  },
  insert: function(node, data){
    if (node.data() === data){
      return null;
    }

    if (data > node.data()){
      if (node.right() === null){
        const newNode = TreeNode(data);
        node.setRight(newNode);
        return newNode;
      } else {
        return this.insert(node.right(), data);
      }
    } else if (data < node.data()){
      if (node.left() === null){
        const newNode = TreeNode(data);
        node.setLeft(newNode);
        return newNode;
      } else {
        return this.insert(node.left(), data);
      }
    }
  },
  find: function(node, value){
    if (node.data() === value){
      return node;
    }

    if (value < node.data() && node.left() !== null){
      return this.find(node.left(), value);
    }

    if (value > node.data() && node.right() !== null){
      return this.find(node.right(), value);
    }

    return null;
  },
  delete: function(node, value){
    if (node === null){
      return null;
    }

    if (value < node.data()){
      node.setLeft(this.delete(node.left(), value));
    } else if ( value > node.data()){
      node.setRight(this.delete(node.right(), value));
    } else {

      if (node.left() === null){
        return node.right();
      } else if (node.right() === null){
        return node.left();
      }

      const minNode = this.minNode(node.right());
      node.setData(minNode.data());
      node.setRight(this.delete(node.right(), minNode.data()));

    }

    return node;
  },
  minNode: function(node){
    if (node.left() === null){
      return node;
    }

    return this.minNode(node.left());
  }
  
}

function Tree(array){
  const tree = Object.create(treeProto);

  tree._root = tree.buildTree(array);

  return tree;
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = Tree(array);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right() !== null) {
    prettyPrint(node.right(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data()}`);
  if (node.left() !== null) {
    prettyPrint(node.left(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}
console.log('initial');
prettyPrint(tree.root());

console.log('delete 8');
tree.delete(tree.root(), 8);
prettyPrint(tree.root());

console.log('delete 324');
tree.delete(tree.root(), 324);
prettyPrint(tree.root());

console.log('delete 1');
tree.delete(tree.root(), 1);
prettyPrint(tree.root());

console.log('delete 4');
tree.delete(tree.root(), 4);
prettyPrint(tree.root());