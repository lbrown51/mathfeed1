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

Template.markupItem.events({
    "click .collection-item": function(event){
        if(this.position){  $(event.toElement).addClass('active');

        $('.image').qtip({
            content: {
                text: this.data
            },
            style: {
                classes: 'qtip-tipsy'
            },
            
        position: {
            target: this.position
        },
        hide: {
                fixed: true,
                leave:false
            }
            
                
    });}
        
    },
     "click .active": function(event){
    $(event.toElement).removeClass('active');
     }
});