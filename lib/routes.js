Router.route('/', function () {
    this.render('index');
  });


Router.route('/city/:_id', function () {
  this.render('city', {
    data: {
      city : this.params._id,
      state: this.params.query.state
    }
  });
  
});


