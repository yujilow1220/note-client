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

  self.existTags = ko.observableArray([]);
  self.tag = ko.observable("");
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
