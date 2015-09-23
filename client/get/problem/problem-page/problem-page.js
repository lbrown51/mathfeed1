
imageArray = {"arry":[],"get": function(){
    return imageArray.arry;
},"push": function(image) {
    this.arry.push(image);
    imageArrayDep.changed();
}, "pop": function(){
    imageArray.arry.pop();
    imageArrayDep.changed();
},
    "get": function(id){
        for (var item in this.arry){
            if (this.arry[item]._id === id) {
                    return item;
            }
        }
    }
};


reloadImages = function(){
    $('.picture').css('position','absolute');
    for (var item = 0; item < imageArray.arry.length; item++){
        var id = imageArray.arry[item]._id;
        if (item === 0){
            $("#picture-" + id).position({
                my: "center bottom",
                at: "center top",
                of: $('.descriptionCard')
            });
        } else {
            $("#picture-" + id).position({
                my: "center top",
                at: "center top-20%",
                of: $('#picture-'+imageArray.arry[item-1]._id)
            });
        }


        var level = imageArray.arry.length * 10;
        $("#picture-" + id).zIndex(level);

        if(item === 3) {
            $("#picture-" + id).addClass("top");
            $('.commentCard').position({
                my: "center top",
                at: "center bottom",
                of: $("#picture-"+id)
            });
            $('footer').position({
                my: "center bottom",
                at: "center top",
                of: $('.commentCard')
            });
        }
    }
}

getCurrentImg = function(){
    var cursor;
    imageArray.get().forEach(function(item,number,array){
        if(number === array.length-1){
            cursor = item;
        }
    });
    return cursor;
};

imageArrayDep = new Tracker.Dependency;
Template.problemPage.onRendered(function(){

  /*  $('#owl-pictures').owlCarousel({
        items: 1,
        mouseDrag: false,
        loop:true,
        nav:true,
        dots: false
    });


   owl = $('#owl-pictures').data('owlCarousel'); */


});

Template.problemPage.helpers({
    Picture:function(){
        subs.subscribe('pictures', this._id);
        if(Pictures.findOne({problemId:this._id})){
            return Pictures.find({problemId:this._id});}
    },

    Markup: function(){
        imageArrayDep.depend();
        //var cursor = getCurrentImg();
        //getCurrentImg();
        var pictureArray = [];
            Pictures.find({problemId:this._id}).forEach(function(picture) {
                pictureArray.push(picture._id);
            });
        return Markups.find({pictureId: { $in: pictureArray}});
    },
});


Template.problemPage.events({
   "click #addPhoto": function(){
document.getElementById("pictureInput").click();
   },
    "change #pictureInput": function(){
        var context = this;
            var files = $('#pictureInput')[0].files;
        if(files[0].size< 2500000){
            var fileReader = new FileReader();
            var numberOfFiles = 0;

            fileReader.onload = function(fileLoadedEvent){
                Meteor.call("insertPicture",fileLoadedEvent.target.result,context._id,function(error,result){
                    if(error){
                        Materialize.toast('Your photo has not been entered into the thingy because '+error, 4000);
                    } else {
                        Materialize.toast('Your photo has been entered into the thingy', 4000);
                    }
                });


                if(numberOfFiles<files.length){
                    fileReader.readAsDataURL(files[numberOfFiles++]);
                }
            };

            fileReader.readAsDataURL(files[numberOfFiles++]);
        } else sAlert.warning('The file you tried to insert was too large');


    },

    "click #sendOut": function(){
     Meteor.call("sendOutProblem",this,function(error,result){
          if(error){
            Materialize.toast('Your photo has not been entered into the thingy because '+error, 4000);
          } else {
              Materialize.toast('Your thingy has been shared across the thingyverse', 4000);
          }
        });      
    },
    
    "click #deleteButton":function(event){
             event.preventDefault();
        var context = this;
    var id = $(event.toElement).attr('id');
    var element = $(event.toElement);
        if ($('#deleteBox'+id)[0]){
            $('#deleteBox'+id).remove();
        } else {
       
        var deleteBox = $('<div class="waves-effect waves-light btn col s12 red" id="deleteBox'+id+'">Delete</div>');
        element.after(deleteBox);
        $('#deleteBox'+id).click(function(){
 Meteor.call("deleteProblem",context._id, function(){
      Router.go('/get/');
 }); 
        });
    }
},

    "click #stackPictures": function(){
        reloadImages();
    },
    "click #moveRight":function(){
        owl.trigger("next.owl.carousel");
    },
    "click #moveLeft":function(){
        owl.trigger("prev.owl.carousel");
    },
});