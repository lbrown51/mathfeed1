var resizeOverlay = function(){
$('canvas').width($('.image').width());
              $('canvas').height($('.image').height());
       var imageP = $('.image').position();
$('canvas').css({top:imageP.top, left:imageP.left});
       
};

$(window).resize(function(){
    resizeOverlay(); 
});

var context;
var picture;
Template.picturePage.onRendered(function(){
   $('ul.tabs').tabs();
    Meteor.subscribe('markups',this.data._id);
 Meteor.subscribe('pictures',null, this.data._id);
 });

Template.picturePage.helpers({
    employThis: function(){

    },               
                  
    problemTitle: function(){
     ofProblem = Problems.findOne({_id:this.problemId});
        if(typeof ofProblem !== 'undefined'){
        return ofProblem.title;}
    },
    
    problemId: function(){
        ofProblem = Problems.findOne({_id:this.problemId});
        if(typeof ofProblem !== 'undefined'){
        return ofProblem._id;}
    },
    
    Markup: function(){
     return Markups.find({pictureId: this._id});   
    },   
    
    data: function(){
        picture = Pictures.findOne({_id:this._id});     
        if(typeof picture !== 'undefined'){
            return picture.data;
            }
    },
    
    backToPage: function(){
          var locArry = window.location.pathname.split('/');
        if (locArry[1] === "give"){
         return "solutionPage";
        } else {
         return "problemPage";   
        }  
    }
});



Template.picturePage.events({
   "click .image": function(event){
          var x = event.offsetX;
        var y = event.offsetY;
        var position = [x,y];
       var context = this;
       
       var api = $('#qtip-overImage').qtip('api');
       
       if(api !== null){
       api.set('position.adjust.x',position[0]);
                  api.set('position.adjust.y',position[1]);

       } else {
       
     
       $('.image').qtip({
           id: "overImage",
            content: {
                text: $('<div id="qtipForm" class="row hidden"><div id="addCommentArea" class="waves-effect waves-light btn indigo col s12">Comment</div><div id="pictureClick" class="waves-effect waves-light btn indigo col s12">Picture</div></div>')          
            },
            style: {
               classes: 'qtip-tipsy'
            },
            
        position: {
            target: $('.image'),
            at: "top left",
            adjust: {
             x: position[0],
             y: position[1],
            resize: false
            }
        },
        show: {
            ready: true
        },
        hide: {
       
                fixed: true,
                leave:false,
            },
           events: {
        render: function(event,api){
        $('#addCommentArea').click(function(){
        var commentArea = $('<div id="commentForm" class="row hidden"><div class="col s12"><textarea id="commentArea" class="materialize-textarea"></textarea></div><div id="addComment" class="col s12 waves-effect waves-light btn indigo"><a id="addComment" class="white-text">Add</a?</div></div>');
        api.set('content.text',commentArea);
           
           $('#addComment').click(function(){
                       var markup = $('#commentArea').val();
               Meteor.call('insertMarkup',markup,context._id,Meteor.userId(),null,position);
            //(data,pictureId,userId, pictureComment,position)
               $('#commentArea').val('');
               api.destroy();
               $('li.collection-item').last().trigger('click');
            
           });
       });
          
            $('#pictureInput').change(function(){
            var files = $('#pictureInput')[0].files;
            var fileReader = new FileReader();
           
            fileReader.onload = function(fileLoadedEvent){
                 var commentArea = $('<div id="commentForm" class="row hidden"><div class="col s12"><textarea id="commentArea" class="materialize-textarea"></textarea></div><div id="addComment" class="col s12 waves-effect waves-light btn indigo"><a id="addComment" class="white-text">Add</a?</div></div>');
           api.set('content.text',commentArea);
            $('#addComment').after('<img src="'+ fileLoadedEvent.target.result + '">');
            $('#addComment').click(function(){
                       var pictureComment = $('#commentArea').val();
                               
 Meteor.call('insertMarkup',fileLoadedEvent.target.result,context._id,Meteor.userId(),pictureComment,position);
                
               $('#commentArea').val('');
               api.destroy();
               $('li.collection-item').last().trigger('click');
            

            //(data,pictureId,userId, pictureComment,position)
                                $('#pictureComment').val('');
        });
            };
           
           fileReader.readAsDataURL(files[0]);
        });
       
       $('#pictureClick').click(function(){
document.getElementById("pictureInput").click();
       
       });
            
        }
           }
            
                
    });     
       
       }
    },
});

Template.picturePage.events({
    
    
     "change #pictureInput": function(){
            var files = $('#pictureInput')[0].files;
                var context = this;

        var fileReader = new FileReader();
        var numberOfFiles = 0;

        
        

    },
});



