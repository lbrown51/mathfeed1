Template.solutionPage.onRendered(function(){
    if(this.data){
        subs.subscribe('pictures', this.data._id);
    }
});
Template.solutionPage.helpers({
    Picture: function(){
        if(Pictures.findOne({problemId:this._id})){
        return Pictures.find({problemId:this._id});}
    }
});