var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true
});
editor.getSession().setMode("ace/mode/markdown");
editor.getSession().setUseWrapMode(true);
editor.setFontSize(15);

function noteClientViewModel(){
  var self = this;
  var editor = ace.edit("editor");
  self.existTags = ko.observableArray([]);
  self.tag = ko.observable("");
  self.tag.subscribe(function(){
    editor.focus();
  });
  self.onClickTag = function(data){
    self.tag(data.text);
    editor.focus();
  }
  self.post = function(){
    var content = editor.getValue();
    var tag = self.tag() || 'root';
    var url = "http://localhost:3000/post";
    var json = {
      text: content,
      tag: tag
    }
    saveJSON(json);
    $.ajax({
      type : 'post',
      url : url,
      data : JSON.stringify(json),
      contentType: 'application/JSON',
      dataType : 'JSON',
      scriptCharset: 'utf-8',
    }).done(function(data){
      editor.setValue("");
      console.log(data);
    });
  };
  editor.commands.addCommand({
      name: "send a post",
      bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
      exec: function(editor) {
        self.post();
      }
  });
  editor.commands.addCommand({
      name: "focus to tag",
      bindKey: {win: "Ctrl-T", mac: "Command-T"},
      exec: function(editor) {
        $("#tag").focus().select();
      }
  });


  load(self);

};


ko.applyBindings(new noteClientViewModel());


/**

functions

*/

function load(self){
  loadTag(function(data){
    self.existTags(data);
  });
}

function loadTag(callback){
  var url = "http://localhost:3000/tags"
  $.ajax({
    type : 'get',
    url : url
  }).done(function(data){
    callback(data);
  });
}



function saveJSON(json){
  var store = $.parseJSON(localStorage.getItem('post_cache')) || [];
  store.push(json);
  localStorage.setItem('post_cache', JSON.stringify(store));
}
