var express = require("express");
var router = express.Router();

/* Handle a GET request to the subdirectory root.*/
router.get("/", function (req, res, next) {
  let eg = req.app.get('eg');
  eg.auth({
    'path':'papi/v0/groups/',// The endpoint from documenation
    'method':'GET',//our method type, also from the docs
    'headers':{},// no special headers mentioned in the reference guide
    'body': ''//no body required as this is a GET request
  });
  //kick off the request to the server now that it's authenticated
  eg.sed(function(data, response){
    if (response.statusCode !== (200 | 304)){
      console.log('Error', response.statusCode);
      res.render('groups', {title: 'Error' + response.statusCode, data: []});
    } else {
      // parse the raw data as JSON
      data = JSON.parse(data);
      //extract groups names from the data object
      names=data.groups.items.map( () => group.goupName);
      //render our template using real group names
      res.render('groups',{title: 'List of Akamai Property Manager Groups', data: names});
    }
  });
});

module.exports = router;
