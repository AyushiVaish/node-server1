const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request')

app.use(core({origin:true}))

app.get("/:email", (req, res,next) => {
    var options = {
        url: `https://api.gettyimages.com/v3/search/images?phrase=${req.params.place}`,
        headers: {
			'User-Agent' : 'My Web Server' ,
            'content-type': 'application/json'
        }
    };
    function callback(error, response, body) {
        if(!error && response.statusCode === 200) {
            res.send(JSON.parse(body));
            return
        }
        else if (response.statusCode===404){
			res.send({
				message: "Your email is validate"
        });
			return;
    } 
	//request failes
		res.status(response.statusCode).send("something went wrong");
	}
    request(options, callback);
});
app.listen(3000)
