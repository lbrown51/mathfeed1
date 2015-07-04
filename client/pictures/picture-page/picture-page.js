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