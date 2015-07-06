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
Template.picturePage.helpers({
    employThis: function(){
        $('ul.tabs').tabs();
        context = this;
        Meteor.subscribe('markups',this._id);
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
    
});


Template.picturePage.helpers(function(){
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
Meteor.call("insertMarkup",fileLoadedEvent.target.result,context,Meteor.userId(),pictureComment);
                $('#pictureComment').val('');
            });
 
            if(numberOfFiles<files.length){
 fileReader.readAsDataURL(files[numberOfFiles++]);
            }        
        };
        
 fileReader.readAsDataURL(files[numberOfFiles++]);
    },
    
    "click #addMarkup": function(){
        var markup = $('#markup').val();
       console.log(typeof markup); Meteor.call('insertMarkup',markup,context,Meteor.userId());
        $('#markup').val('');
    }
});


//
//var xClick;
//var yClick;
//
//"click canvas": function(event){
//        xClick = $(event)[0].offsetX;
//        yClick = $(event)[0].offsetY;
//        $('.hidden').show('fast');
//    },
//    
//    "click #addMarkup": function(){
//        var comment = $('#markup').val();
//         context = $(".overlay")[0].getContext('2d');      
//    context.fillStyle = "white";
//context.fillText(comment,xClick,yClick);
//      var canvas = document.getElementById("canvas");
// var data = canvas.toDataURL("image/jpeg", 1.0);
//        console.log(this);
//     Meteor.call("upsertMarkup",data,this);
//    }
//Template.picture.onRendered(function(){
//   $('img').imagesLoaded(function(){
//       resizeOverlay();
//   }); 
//    
//});

//        Meteor.subscribe('markups',this._id);
