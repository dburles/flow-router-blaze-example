Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {
  Template.post.onCreated(function() {
    var self = this;
    self.autorun(function() {
      self.subscribe('post', FlowRouter.getParam('slug'));
    });
  });

  Template.post.helpers({
    post: function() {
      return Posts.findOne({ slug: FlowRouter.getParam('slug') });
    }
  });
}

FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('layout', { main: 'home' });
  }
});

FlowRouter.route('/post/:slug', {
  action: function() {
    BlazeLayout.render('layout', { main: 'post' });
  }
});

if (Meteor.isServer) {
  if (Posts.find().count() === 0) {
    Posts.insert({ slug: 'post-1', title: 'Post 1' });
    Posts.insert({ slug: 'post-2', title: 'Post 2' });
    Posts.insert({ slug: 'post-3', title: 'Post 3' });
  }

  Meteor.publish('post', function(slug) {
    check(slug, String);
    return Posts.find({ slug: slug });
  });
}
