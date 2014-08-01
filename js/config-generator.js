var ConfigGenerator = (function(){
  function generateConfigFromEntry(entry){
    return new Promise(function(resolve, reject){
      FileSystem.getFilesRecursive(entry).then(function(files){
        var configEntries = [];
        for(var i = 0; i < files.length; i++){
          var configEntry = {};
          configEntry.path = file.fullPath;
          configEntries.push(configEntry);
        }
        resolve(JSON.stringify(configEntries));
      });
    });
  }
  return {
    generateConfigFromEntry : generateConfigFromEntry
  };
})();