var FileSystem = (function(){
  function getUserFolder(force){
    return new Promise(function(resolve, reject){
      chrome.storage.local.get("folderRef", function(results){
        if(results.folderRef && !force){
          retrieveFolder(results.folderRef).then(resolve);
        }else{
          askForFolder().then(resolve);
        }
      });
    });
  }
  function askForFolder(){
    return new Promise(function(resolve, reject){
      chrome.fileSystem.chooseEntry({ type : "openDirectory" }, function(entry, fileEntries){
        var entryId = chrome.fileSystem.retainEntry(entry);
        chrome.storage.local.set({ folderRef :  entryId });
        resolve(entry, entryId);
      });
    });
  }
  function retrieveFolder(id){
    return new Promise(function(resolve, reject){
      chrome.fileSystem.restoreEntry(id, function(entry){
        resolve(entry);
      });
    });
  }
  function readFile(fileEntry){
    return new Promise(function(resolve, reject){
      fileEntry.file(function(file){
        var fileReader = new FileReader();
        fileReader.onload = function(e){
          resolve(e.target.result);
        };
        fileReader.onerror = function(e){
          reject(e);
        };
        fileReader.readAsArrayBuffer(file);
      });
    });
  }
  function getFilesRecursive(entry){
    return new Promise(function(resolve, reject){
      var files = [];
      if(entry.isDirectory){
        var dirReader = entry.createReader();
        dirReader.readEntries(function(results){
          var promises = [];
          if(results.length === 0){
            resolve([]);
          }else{
            for(var i = 0 ; i < results.length; i++){
              promises.push(getFilesRecursive(results[i]).then(function(subfiles){
                files = files.concat(subfiles);
              }));
            }
            Promise.all(promises).then(function(){
              resolve(files);
            });
          }
        });
      }else{
        resolve([entry]);
      }
    });
  }
  function getFile(fsRoot, location, options){
    return new Promise(function(resolve, reject){
      fsRoot.getFile(location, { create : true }, resolve, reject);
    });
  }
  function createWriter(entry){
    return new Promise(function(resolve, reject){
      entry.createWriter(resolve);
    });
  }
  function saveFile(data, fsRoot, location){
    return new Promise(function(resolve, reject){
      getFile(fsRoot, location, { create : true }).then(function(entry){
        return createWriter(entry);
      }).then(function(writer){
        var blob = new Blob([data], {type: 'text/plain'});
        writer.write(blob);
        resolve();
      }).catch(function(error){
        console.log(error);
      });
    });
  }
  return {
    getUserFolder : getUserFolder,
    readFile : readFile,
    getFilesRecursive : getFilesRecursive,
    saveFile : saveFile
  };
})();