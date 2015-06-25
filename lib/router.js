Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/',{
    name:'profile'
});

Router.route('/get',{
    name: 'get'
});

Router.route('/get/:_id',{
    name: 'problemPage',
    data: function(){
        return Problems.findOne({_id: this.params._id});
    }
});

Router.route('/give',{
    name: 'give'
});

Router.route('/give/:_id',{
    name: 'solutionPage',
    data: function(){
        return Problems.findOne({_id: this.params._id});
    }
});
