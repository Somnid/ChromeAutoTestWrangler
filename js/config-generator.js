var ConfigGenerator = (function(){
  function generateConfigFromEntry(entry){
    return new Promise(function(resolve, reject){
      FileSystem.getFilesRecursive(entry).then(function(files){
        var pathTree = createPathTree(files);
        config = createConfigFromPathTree("", pathTree);
        resolve(JSON.stringify(config));
      });
    });
  }
  function createPathTree(files){
    var root = TreeNode.create("");
    for(var i = 0; i < files.length; i++){
      var pathComponents = files[i].fullPath.split("/");
      var currentNode = root;
      for(var j = 0; j < pathComponents.length; j++){
        if(!currentNode.hasChild(pathComponents[j])){
          currentNode.appendChild(TreeNode.create(pathComponents[j]));
        }
        currentNode = currentNode.getChild(pathComponents[j]);
      }
    }
    return root;
  }
  function createConfigFromPathTree(pathName, pathTree){
    var path = pathName + "/" + pathTree.name;
    var item = {};
    item.path = path;
    if(pathTree.children.length > 0){
      item.subtests = [];
      for(var i = 0; i < pathTree.children.length; i++){
        var subtest = createConfigFromPathTree(path, pathTree.children[i]);
        item.subtests.push(subtest);
      }
    }
    return item;
  }
  return {
    generateConfigFromEntry : generateConfigFromEntry
  };
})();