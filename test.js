var request = require('request');

const apiUrl = process.env.APIURL;

request(`${apiUrl}/artists`, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// var cmd = require('node-cmd');
// var request = require('request');



// console.log(apiUrl);

// request(`${apiUrl}/artists`, (error, response, body) => {
// 	console.log(error);

//   if (body) {
//   	console.log(body);
//   	invalidate('KOOOOOS');
//   };
// });

// const invalidate = (id) => {
// 	cmd.get(
// 	    `
// 	      echo ${id}
// 	    `,
// 	    function(err, data){
// 	        if (!err) {
// 	           console.log('the node-cmd cloned dir contains these files :\n\n',data)
// 	        } else {
// 	           console.log('error', err)
// 	        }

// 	    }
// 	);
// };


// invalidate('Katt');
