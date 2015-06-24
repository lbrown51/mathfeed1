Problems = new Mongo.Collection('problems');

Meteor.methods({ 
    insertProblem: function(title,course ,description){
        
       var user = Meteor.users.findOne({_id:this.userId});
        var problemObj = {title: title, course:course, description: description, user: user, pics:[]  
                         };
Problems.insert(problemObj);
    }, 
});