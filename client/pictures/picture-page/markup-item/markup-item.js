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
    
    
    $('#'+this.data._id).dblclick(function(event){
         event.preventDefault();
    var id = $(event.toElement).attr('id');
    var element = $(this);
        if ($('#deleteBox'+id)[0]){
            $('#deleteBox'+id).remove();
            $('#edit'+id).remove();
        } else {
       
        var deleteBox = $('<div class="waves-effect waves-light btn col s12 red" id="deleteBox'+id+'">Delete</div>');
        element.after(deleteBox);
        $('#deleteBox'+id).click(function(){
           Meteor.call("deleteMarkup",id); 
        });
            var textInput = $('<div id="edit'+id+'"class="row"><div class="input-field col s12"><input value="'+ element[0].childNodes[2].data + '" id="editBox'+id+'" id="edit" type="text" class="validate"><label class="active" for="edit">Edit Entry</label></div><div id="save'+id+'" class="col s12 indigo waves-effect waves-light btn">Save</div></div>');
            element.after(textInput);
            
         $('#save'+id).click(function(event){
             event.preventDefault();
             var text = $('#editBox'+id).val();
             element.text('');
             element.text(text);
             Meteor.call('updateMarkup',id,text);
           $('#deleteBox'+id).remove();
           $('#edit'+id).remove();
             
            });
        }
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
        var tooltips = $('#'+context._id).qtip({
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
            },
        events: {
            render: function(event,api){

                
            }
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