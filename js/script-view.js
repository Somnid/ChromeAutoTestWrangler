var ScriptView = (function(){
  function create(){
    var scriptView = {};
    scriptView.dom = {};
    bind(scriptView);
    this.gatherSelectors();
    this.getUserFolder();
    return scriptView;
  }
  function bind(scriptView){
    scriptView.gatherSelectors = gatherSelectors.bind(scriptView);
    scriptView.attachEvents = attachEvents.bind(scriptView);
    scriptView.editLocation = editLocation.bind(scriptView);
    scriptView.getUserFolder= getUserFolder.bind(scriptView);
  }
  function gatherSelectors(){
    this.dom.locationButton = document.getElementById("btn-location");
  }
  function attachEvents(){
    this.dom.locationButon.addEventListener("click", this.editLocation);
  }
  function editLocation(){
    this.getUserFolder(true);
  }
  function getUserFolder(force){
    FileSystem.getUserFolder(force).then(function(entry){
		  this.fsRoot = entry;
		}.bind(this));
  }
  return {
    create : create
  };
})();