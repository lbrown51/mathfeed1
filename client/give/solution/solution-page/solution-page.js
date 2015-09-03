
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

Template.solutionPage.onRendered(function(){

});
Template.solutionPage.helpers({
    Picture: function(){
        subs.subscribe('pictures', this._id);
        if(Pictures.findOne({problemId:this._id})){
            return Pictures.find({problemId:this._id});}
    }
});