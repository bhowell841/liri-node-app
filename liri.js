require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var axios = require("axios");
var input = process.argv;
var command = process.argv[2];

var name = "";

switch (command) {
    case "concert-this":
        setName()
        concertThis(name)
        break;

    case "spotify-this-song":
        setName();
        spotifyThis(name);
        break;

    case "movie-this":
        setName();
        movieThis(name)
        break;

    case "do-what-it-says":
        doThis();
        break;

    default:
        console.log("Poor choice.  Try: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
}

function setName() {
    for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            name = name + " + " + input[i];
        } // end if
        else {
            name += input[i];
        } // end else
    } // end for
} // end setMedia

function concertThis() {
    "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"
} // end function



function spotifyThis(name) {
    if (name == null) {
        name = "Never gonna give you up";
    }
} // end function



function movieThis(name) {

} // end function



function doThis() {
    console.log("This is running...");
    fs.readFile("random.txt", "utf8", function (err, data) {
                if (error) {
                    console.log("There was an error: " + err);
                }
                else {
                    
                }
            });
    } // end function