var ScriptView = (function(){
  function create(){
    var scriptView = {};
    scriptView.dom = {};
    scriptView.fsRoot = null;
    bind(scriptView);
    scriptView.gatherSelectors();
    scriptView.attachEvents();
    scriptView.getUserFolder();
    return scriptView;
  }
  function bind(scriptView){
    scriptView.gatherSelectors = gatherSelectors.bind(scriptView);
    scriptView.attachEvents = attachEvents.bind(scriptView);
    scriptView.editLocation = editLocation.bind(scriptView);
    scriptView.getUserFolder = getUserFolder.bind(scriptView);
    scriptView.buildConfig = buildConfig.bind(scriptView);
  }
  function gatherSelectors(){
    this.dom.locationButton = document.getElementById("btn-location");
    this.dom.buildButton = document.getElementById("btn-build");
  }
  function attachEvents(){
    this.dom.locationButton.addEventListener("click", this.editLocation);
    this.dom.buildButton.addEventListener("click", this.buildConfig);
  }
  function editLocation(){
    this.getUserFolder(true);
  }
  function getUserFolder(force){
    FileSystem.getUserFolder(force).then(function(fsRoot){
		  this.fsRoot = fsRoot;
		  this.buildConfig();
		}.bind(this));
  }
  function buildConfig(){
    ConfigGenerator.generateConfigFromEntry(this.fsRoot)
		.then(function(entryText){
		  return FileSystem.saveFile(entryText, this.fsRoot, "config.gen.json");
		}.bind(this)).then(function(){
		  console.log("complete");
		});
  }
  return {
    create : create
  };
})();