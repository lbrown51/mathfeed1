var context;
Template.picturePage.helpers({
    employThis: function(){
        $('ul.tabs').tabs();
        context = this;
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
    }
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
 Meteor.call("upsertMarkup",fileLoadedEvent.target.result,context,Meteor.userId());
            if(numberOfFiles<files.length){
 fileReader.readAsDataURL(files[numberOfFiles++]);
            }        
        };
        
 fileReader.readAsDataURL(files[numberOfFiles++]);
    },
    
    "click #addMarkup": function(){
        var markup = $('#markup').val();
        Meteor.call('upsertMarkup',markup,context,Meteor.userId());
    }
});

//var resizeOverlay = function(){
//$('.overlay').width($('.image').width());
//              $('.overlay').height($('.image').height());
//       var imageP = $('.image').position();
//$('.overlay').css({top:imageP.top, left:imageP.left, position:"absolute"});
//       
//};
//
//$(window).resize(function(){
//    resizeOverlay(); 
//});
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
