/*
	Serve JSON to our AngularJS client
*/


(function() {
  exports.name = function(req, res) {
    return res.json({
      name: 'Bob'
    });
  };

}).call(this);
