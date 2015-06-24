Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/',function() {
    this.render('profile');
});

Router.route('/get',{
    name: 'get'
});