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
    console.log("ConcertThis is working");
    if (name === "") {
        name = "Trampled By Turtles";
    }
    
    // set the search  //******* Where do I limit results? */
    var search = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"

    // get the data
    axios.get(search).then(function (response){
        console.log(response.data);
        // console.log(response.data.event.venue.name);
        // console.log(response.data.event.venue.city);
    })
} // end function




function spotifyThis(name) {
    console.log("SpotifyThis is working");
    if (name === "") {
        name = "Never gonna give you up";
    }
} // end function



function movieThis(name) {
    console.log("MovieThis is working");
    if (name === "") {
		name = "Layer Cake";
    } 
    
    // set the search
    var search = "http://www.omdbapi.com/?t=" + name + "&plot=short&apikey=trilogy";
    
    // get the data
    axios.get(search).then(function (response) {
        console.log(response.data.Title);
        console.log(response.data.Released);
        console.log(response.data.imdbRating);
        console.log(response.data.tomatoRating);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
    });
}; // end function




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