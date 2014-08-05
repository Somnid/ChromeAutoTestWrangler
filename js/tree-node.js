var TreeNode = (function(){
  function create(name){
    var node = {};
    node.name = name;
    node.children = [];
    bind(node);
    return node;
  }
  function bind(node){
    node.appendChild = appendChild.bind(node);
    node.getChild = getChild.bind(node);
    node.hasChild = hasChild.bind(node);
  }
  function appendChild(node){
    this.children.push(node);
  }
  function getChild(name){
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].name == name){
        return this.children[i];
      }
    }
    return null;
  }
  function hasChild(name){
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].name == name){
        return true;
      }
    }
    return false;
  }
  return {
    create : create
  };
})();