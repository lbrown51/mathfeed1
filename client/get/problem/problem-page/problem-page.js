
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

Template.problemPage.helpers({
    Picture:function(){
        subs.subscribe('pictures', this._id);
        if(Pictures.findOne({problemId:this._id})){
            return Pictures.find({problemId:this._id});}
    }
});


Template.problemPage.events({
   "click #addPhoto": function(){
document.getElementById("pictureInput").click();
   },
    "change #pictureInput": function(){
        var context = this;
            var files = $('#pictureInput')[0].files;
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
}
});