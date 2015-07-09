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
     return Markups.find();   
    },   
    
    data: function(){
        picture = Pictures.findOne({_id:this._id});     
        if(typeof picture !== 'undefined'){
            return picture.data;
            }
    }
});



Template.picturePage.events({
    "click #pictureClick": function(){
document.getElementById("pictureInput").click();
    },
    
     "change #pictureInput": function(){
            var files = $('#pictureInput')[0].files;
        var fileReader = new FileReader();
        var numberOfFiles = 0;

        fileReader.onload = function(fileLoadedEvent){
            $('#addPictureComment').click(function(){
                var pictureComment = $('#pictureComment').val();
Meteor.call("insertMarkup",fileLoadedEvent.target.result,this._id,Meteor.userId(),pictureComment,null);
                $('#pictureComment').val('');
            });
 
            if(numberOfFiles<files.length){
 fileReader.readAsDataURL(files[numberOfFiles++]);
            }        
        };
        
 fileReader.readAsDataURL(files[numberOfFiles++]);
    },
    
    "click #addMarkup": function(){
        var context=this;
        var markup = $('#markup').val();
        var addText = $('<p id="finished" class="indigo-text">Add your mark by clicking a location on the image</p>');
        $('#addMarkup').after(addText);
        $('#addMarkup').attr('id','finish');
               $('#markup').val('');
        
 $('.image').css('cursor','pointer').click(function(event){
            var x = event.pageX;
            var y = event.pageY;
            var position = [x,y];
        $('#addMarkup').attr('id','addPictureComment');
Meteor.call('insertMarkup',markup,context._id,Meteor.userId(),null,position);
            //(data,pictureId,userId, pictureComment,position)
        $('#finished').remove();
        $('.image').css('cursor','default');
        });

    },
});



