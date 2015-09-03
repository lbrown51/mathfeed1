var subs = new SubsManager();

Router.configure({
  layoutTemplate: 'layout',
    loadingTemplate:  'loading',
    fastRender: true
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
    unload: function(){
        imageArray.arry.length = 0;
        $('footer').css('position','inherit');
    },
    onStop: function(){
        $('.qtip').qtip('destroy');
    }
});

Router.route('/give',{
    name: 'give'
});

Router.route('/give/:_id',{
    name: 'solutionPage',
    data: function(){
        return Problems.findOne({_id: this.params._id});
    },
    unload: function(){
        imageArray.arry.length = 0;
        $('footer').css('position','inherit');
    },
    onStop: function(){
        $('.qtip').qtip('destroy');
    }
});

Router.route('/help',{
    name: 'help'
});

Router.route('get/:problemId/:_id',{
    name: 'picturePage',
    data: function(){
     return this.params;
    },
});

Router.route('give/:problemId/:_id',{
    name: 'givePicturePage',
    template: 'picturePage',
    data: function(){
     return this.params;
    },
});
