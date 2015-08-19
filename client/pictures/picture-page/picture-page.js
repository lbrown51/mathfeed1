Template.picturePage.onRendered(function(){
   $('ul.tabs').tabs();
    subs.subscribe('markups',this.data._id);
    subs.subscribe('pictures',null, this.data._id);
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:1,
        mouseDrag:false,
        pullDrag:false
    });
    $('.owl-next').click(function(){
        if($('.qtip')[0])$('.qtip').qtip('api').hide();
        owl.trigger('next.owl.carousel');
    });
    owl.on('next.owl.carousel',function(event){

    });
    $('.owl-prev').click(function(){
        if($('.qtip')[0])$('.qtip').qtip('api').hide();
        owl.trigger('prev.owl.carousel');
    });
    owl.on('prev.owl.carousel',function(event){

    });


    $('.owl-navigation').hover(function(){
        $('.owl-navigation').css('opacity',.9);
    },function(){
        $('.owl-navigation').css('opacity',.6);
    });

    //$('#image-'+this.data._id).css('position',"relative");
        imageArray.push(this.data);
});

Template.picturePage.helpers({
    employThis: function() {

    },
                  
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
   "click .image,.card": function(event){
       var parsedIndex = parseInt(imageArray.get(this._id))+1;
       var context = this;

       if ($('#picture-'+context._id).hasClass('top')) {
           var height = $('#image-'+context._id).height()
           var width = $('#image-'+context._id).width()
           var xPix = event.offsetX;
           var yPix = event.offsetY;
           var x = xPix / width;
           var y = yPix / height;
           var position = [x, y];

           var api = $('#qtip-image-'+context._id).qtip('api');
           if ($('#qtip-image-'+context._id)[0]) {
               api.destroy();
           } else {
               $('#image-' + context._id).qtip({
                   id: "image-" + context._id,
                   content: {
                       text: $('<div class="row"><div class="col s12">' +
                           '<div class="card valign-wrapper center-align">' +
                           '<div id="pictureClick-'+context._id+'" class="card-action s6 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">photo_camera</i></div>' +
                           '<div id="addCommentArea-'+context._id+'" class="card-action s6 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">comment</i></div>' +
                           '<div id="cancelClick-'+context._id+'" class="card-action s12 waves-effect waves-teal valign-wrapper center-align indigo-text"><i class="material-icons small">clear</i></div>' +
                           '</div></div></div></div>')
                   },
                   style: {
                       def: false
                   },

                   position: {
                       target: $('#image-' + context._id),
                       at: "top left",
                       my: "top center",
                       adjust: {
                           x: position[0] * $('.image').width(),
                           y: position[1] * $('.image').height(),
                           resize: false
                       }
                   },
                   show: {
                       ready: true
                   },
                   hide: false,
                   events: {
                       render: function (event, api) {
                           $('#addCommentArea-' + context._id).click(function () {
                               var commentArea = $('<div class="row"><div class="col s12">' +
                                   '<div class="card center-align"><div class="col s12">' +
                                   '<textarea id="commentArea-'+context._id+'" style="font-size:18px; line-height:20px;border-bottom-style: none;" class="materialize-textarea indigo-text"></textarea></div>' +
                                   '<div id="addComment-'+context._id+'" class="col s12 waves-effect waves-teal valign-wrapper center-align indigo-text">' +
                                   '<i class="material-icons small">add</i></div>' +
                                   '</div></div');

                               api.set('content.text', commentArea);
                               $('#commentArea-'+context._id).focus();

                               $('#addComment-'+context._id).click(function () {
                                   var markup = $('#commentArea').val();
                                   Meteor.call('insertMarkup', null, context._id, Meteor.userId(), markup, position);
                                   //(data,pictureId,userId, pictureComment,position)
                                   $('#commentArea').val('');
                                   api.destroy();
                               });
                           });

                           $('#pictureClick-'+context._id).click(function () {
                               var commentArea = $('<div class="row"><div class="col s12">' +
                                   '<div class="card center-align"><div class="col s12">' +
                                   '<textarea id="commentArea-'+context._id+'" style="font-size:18px; line-height:20px;border-bottom-style: none;" class="materialize-textarea indigo-text"></textarea></div>' +
                                   '<div id="addComment-'+context._id+'" class="col s12 waves-effect waves-teal valign-wrapper center-align indigo-text">' +
                                   '<i class="material-icons small">add</i></div>' +
                                   '</div></div><input style="display:none" type="file" id="pictureInput-'+context._id+'" accept="image/*">');
                               api.set('content.text', commentArea);
                               $('#pictureInput-'+context._id).change(function () {
                                   var files = $('#pictureInput-'+context._id)[0].files;
                                   var fileReader = new FileReader();

                                   fileReader.onload = function (fileLoadedEvent) {
                                       $('#addComment-'+context._id).after('<img src="' + fileLoadedEvent.target.result + '">');
                                       $('#addComment-'+context._id).click(function () {
                                           var pictureComment = $('#commentArea').val();

                                           Meteor.call('insertMarkup', fileLoadedEvent.target.result, context._id, Meteor.userId(), pictureComment, position);

                                           api.destroy();
                                           //(data,pictureId,userId, pictureComment,position)
                                           $('#pictureComment').val('');
                                       });
                                   };

                                   fileReader.readAsDataURL(files[0]);
                               });
                               var pictureInputId = "pictureInput-"+context._id;
                               document.getElementById(pictureInputId).click();
                           });
                           $('#cancelClick-'+context._id).click(function () {
                               api.destroy();
                           });
                       }
                   }
               });
           }
       } else {
           var fromLevel = parsedIndex*10;
           var toLevel = (imageArray.arry.length)*10;
           var topElement = $('.top');
           topElement.zIndex(fromLevel).removeClass('top');
           $("#picture-"+context._id).zIndex(toLevel).addClass("top");


           $('.picture:not(#picture-'+context._id+')').click(function(){
               $(".picture").removeClass('top');
           topElement.zIndex(toLevel).addClass("top");
               $("#picture-"+context._id).zIndex(fromLevel);
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



