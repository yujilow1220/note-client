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
  self.tag.subscribe(function(newValue){
    console.log(self.tag())
    editor.focus();
  });
  self.post = function(){
    var content = editor.getValue();
    var tag = self.tag();
    var url = "http://localhost:3000/post";
    var store = getStore();
    var json = {
      text: content,
      tag: tag
    }
    saveJSON(store);
    $.ajax({
      type : 'post',
      url : url,
      data : JSON.stringify(json),
      contentType: 'application/JSON',
      dataType : 'JSON',
      scriptCharset: 'utf-8',
    }).done(function(data){
    });
  };
  editor.commands.addCommand({
      name: "send a post",
      bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
      exec: function(editor) {
        console.log(self.tag());
      }
  });
  editor.commands.addCommand({
      name: "focus to tag",
      bindKey: {win: "Ctrl-E", mac: "Command-E"},
      exec: function(editor) {
        $("#tag").focus();
      }
  });

};


ko.applyBindings(new noteClientViewModel());


/**

functions

*/



function saveJSON(json){
  var store = $.parseJSON(localStorage.getItem('post_cache')) || [];
  store.push(json);
  localStorage.setItem('post_cache', JSON.stringify(store));
}
