Problems = new Mongo.Collection('problems');

Meteor.methods({ 
    insertProblem: function(title,description){
       var user = Meteor.users.findOne({_id:this.userId});
        var problemObj = {title: title, description: description, user: user, pics:[]  
                         };
        console.log(problemObj);
                         }, 
});