var ConfigGenerator = (function(){
  function generateConfigFromEntry(entry){
    return new Promise(function(resolve, reject){
      FileSystem.getFilesRecursive(entry).then(function(files){
        var configEntries = [];
        for(var i = 0; i < files.length; i++){
          var configEntry = {};
          configEntry.path = files[i].fullPath;
          configEntries.push(configEntry);
        }
        resolve(JSON.stringify(configEntries));
      });
    });
  }
  function createPathTree(files){
    var tree = {};
    for(var i = 0; i < files.length; i++){
      var pathComponents = files[i].split("/");
      for(var j = 0; j < pathComponents.length; j++){
        tree[pathComponents[i]]
      }
    }
  }
  return {
    generateConfigFromEntry : generateConfigFromEntry
  };
})();