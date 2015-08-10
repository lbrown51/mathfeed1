var resizeOverlay = function(){
$('canvas').width($('.image').width());
              $('canvas').height($('.image').height());
       var imageP = $('.image').position();
$('canvas').css({top:imageP.top, left:imageP.left});
       
};

$(window).resize(function(){
    resizeOverlay(); 
});

imageArray = {"arry":[],"get": function(){
    return imageArray.arry;
},"push": function(image) {
    this.arry.push(image);
    imageArrayDep.changed();
}, "pop": function(){
    imageArray.arry.pop();
    imageArrayDep.changed();
}
};

var getCurrentImg = function(){
    var cursor;
    imageArray.get().forEach(function(item,number,array){
        if(number === array.length-1){
            cursor = item;
        }
    });
    return cursor;
};

imageArrayDep = new Tracker.Dependency;

Template.picturePage.onRendered(function(){
   $('ul.tabs').tabs();
    subs.subscribe('markups',this.data._id);
    subs.subscribe('pictures',null, this.data._id);
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:1,
        loop:true,
        mouseDrag:false,
        touchDrag:false,
        pullDrag:false

    });
    $('.owl-next').click(function(){
        owl.trigger('next.owl.carousel');
    });
    owl.on('next.owl.carousel',function(event){
        console.log(event);
    });

    $('.fixed-action-btn').css({bottom:$(window).height()/2});
 });

Template.picturePage.helpers({
    employThis: function() {
        if (!getCurrentImg()){
           imageArray.push(this);
        }


    }
    ,
                  
    problemTitle: function(){
        imageArrayDep.depend();
     ofProblem = Problems.findOne({_id:this._id});
        if(typeof ofProblem !== 'undefined'){
                return ofProblem.title;
        }
    },

    problemId: function(){
        imageArrayDep.depend();
        ofProblem = Problems.findOne({_id:this._id});
        if(typeof ofProblem !== 'undefined'){
           return ofProblem._id;
        }
    },
    
    Markup: function(){
            imageArrayDep.depend();
            var cursor = getCurrentImg();
            getCurrentImg();
            return Markups.find({pictureId: cursor._id});
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
    },

    contextComment: function(){
        imageArrayDep.depend();
        var cursor = getCurrentImg();
        if (cursor.pictureComment){
            return cursor.pictureComment;
        } else if (cursor.data) {
            return cursor.data;
        }
    },

    setImageSize: function(){
      $('.image').height($(window).height());
    }
});



Template.picturePage.events({
   "click .image": function(event){
       var height = $('.image').height()
       var width = $('.image').width()
       var xPix = event.offsetX;
       var yPix = event.offsetY;
       var x = xPix / width;
       var y = yPix / height;
       var position = [x,y];
       var context = getCurrentImg();
       
       var api = $('#qtip-overImage').qtip('api');       
     if($('#qtip-overImage')[0]){
         api.destroy();
     } else {
       $('.image').qtip({
           id: "overImage",
            content: {
                text: $('<div class="row"><div class="col s12">' +
                    '<div class="card valign-wrapper center-align">' +
                    '<div id="pictureClick" class="card-action s6 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">photo_camera</i></div>' +
                    '<div id="addCommentArea" class="card-action s6 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">comment</i></div>' +
                    '<div id="cancelClick" class="card-action s12 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">clear</i></div>' +
                    '</div></div></div></div>')
            },
            style: {
               def: false
            },
            
        position: {
            target: $('.image'),
            at: "top left",
            my: "top center",
            adjust: {
             x: position[0]*$('.image').width(),
             y: position[1]*$('.image').height(),
            resize: false
            }
        },
        show: {
            ready: true
        },
        hide: false,
           events: {
               render: function (event, api) {

                   $('#addCommentArea').click(function(){
        var commentArea = $('<div class="row"><div class="col s12">' +
            '<div class="card center-align"><div class="col s12">' +
            '<textarea id="commentArea" style="font-size:18px; line-height:20px;border-bottom-style: none;" class="materialize-textarea indigo-text"></textarea></div>' +
            '<div id="addComment" class="col s12 waves-effect waves-teal valign-wrapper center-align indigo-text">' +
            '<i class="material-icons small">add</i></div>' +
            '</div></div');


        api.set('content.text',commentArea);
            $('#commentArea').focus();

           $('#addComment').click(function(){
                       var markup = $('#commentArea').val();
               Meteor.call('insertMarkup',null,context._id,Meteor.userId(),markup,position);
            //(data,pictureId,userId, pictureComment,position)
               $('#commentArea').val('');
               api.destroy();
           });
       });
       
       $('#pictureClick').click(function(){
           var commentArea =  $('<div class="row"><div class="col s12">' +
               '<div class="card center-align"><div class="col s12">' +
               '<textarea id="commentArea" style="font-size:18px; line-height:20px;border-bottom-style: none;" class="materialize-textarea indigo-text"></textarea></div>' +
               '<div id="addComment" class="col s12 waves-effect waves-teal valign-wrapper center-align indigo-text">' +
               '<i class="material-icons small">add</i></div>' +
               '</div></div><input style="display:none" type="file" id="pictureInput" accept="image/*">');
           api.set('content.text',commentArea);
           $('#pictureInput').change(function(){
               var files = $('#pictureInput')[0].files;
               var fileReader = new FileReader();

               fileReader.onload = function(fileLoadedEvent){
                   $('#addComment').after('<img src="'+ fileLoadedEvent.target.result + '">');
                   $('#addComment').click(function(){
                       var pictureComment = $('#commentArea').val();

                       Meteor.call('insertMarkup',fileLoadedEvent.target.result,context._id,Meteor.userId(),pictureComment,position);

                       api.destroy();
                       //(data,pictureId,userId, pictureComment,position)
                       $('#pictureComment').val('');
                   });
               };

               fileReader.readAsDataURL(files[0]);
           });
document.getElementById("pictureInput").click();
       
       });
         
        $('#cancelClick').click(function(){
          api.destroy();   
        });
        }
           }
            
                
    });     
         }
    },
});

Template.picturePage.events({
    
    "click .popImage": function(){
        $('.qtip').qtip('destroy');
        imageArray.pop();
        //$(element.children().children('img')).attr('src',);
    },
     "click #backToProblem": function(e){
         e.preventDefault();
         Router.go("/get/"+this.problemId);
    },
});



