Problems = new Mongo.Collection('problems');

Meteor.methods({ 
    insertProblem: function(title,course ,description){
        if(this.userId){
        check(title,String);
        check(course,String);
        check(description,String);
        
       
        var problemObj = {title: title, course:course, description: description, userId: this.userId,data:new Date(),out:false  
                         };
Problems.insert(problemObj);
        } else {
            console.log("You must be logged in for that silly");
            return "You must be logged in for that silly";
        }
        },
    
    sendOutProblem: function(problem){
        
       Problems.update(problem, {$set: {out:true}});
    }
});