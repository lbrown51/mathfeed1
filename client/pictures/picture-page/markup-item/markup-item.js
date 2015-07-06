
Template.markupItem.onRendered(function(){
    $('ul.collection').load( function() {
        console.log("hello?");
    var markupCheck = this.data.data.substring(0,4);
       if (markupCheck === "data"){
           var thisListItem = $('#'+this._id);
           console.log(thisListItem);
            thisListItem.append( $('<img src="'+this.data+'"></img>') );
       } else {
           var thisListItem = $('#'+this._id);
           thisListItem.append(this.data);}
    });
});