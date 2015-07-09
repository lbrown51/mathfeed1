Router.configure({
  layoutTemplate: 'layout',
    loadingTemplate:  'loading'
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
    },
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

Router.route('/help',{
    name: 'help'
});

Router.route('get/:problemId/:_id',{
    name: 'picturePage',
    data: function(){
     return this.params;
    }});
