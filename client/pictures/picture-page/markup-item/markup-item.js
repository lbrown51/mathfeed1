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

Template.markupItem.helpers({
    isImage: function(){
        var check = this.data.substr(0,4);
        if(check === "data"){
            return true; } else { return false;}
    }
});


Template.markupItem.events({
    "click .comment": function(event){
        if(this.position){  $(event.toElement).addClass('active');
        var context = this;
        var tooltip = $('#'+context._id).qtip({
            id: context._id,
            content: {
                text: context.data
            },
            overwrite: false,
            style: {
                classes: 'qtip-tipsy'
            },
            
        position: {
            target: $('.image'),
            at: "top left",
            adjust: {
             x: context.position[0],
             y: context.position[1],
            resize: false
            }
        },
        show: {
            ready: true
        },
        hide: {
                event: {
                    target: $('#'+context._id)
                },
                fixed: true,
                leave:false,
            }
            
                
    });                                
        
                         }
        
    },
    "click .markImage": function(event){
         var context = this;          
        if(context.position){ 
    $(event.toElement).addClass('active');
        var tooltip = $('#'+context._id).qtip({
           content: {
               text: function(){
                   return "<p>"+context.pictureComment+"</p>" + "<img src='" + context.data + "' class='qtip-image'>";   }
           },
            
            show: {
            ready: true
        },
            position: {
            target: $('.image'),
            at: "top left",
            adjust: {
             x: context.position[0],
             y: context.position[1],
            resize: false,

        }       
            },
            
            hide: {
            event: {
                target: $('#'+context._id)
                },
                fixed: true,
                leave:false
            },
            style: {
                classes: "qtip-tipsy"
            }
                        
    });
                         
            }
    },
    
     "click .active": function(event){
    var api = $('#'+this._id).qtip('api');     api.destroy();
    $(event.toElement).removeClass('active');
     }
});