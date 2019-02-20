require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
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

    // set the search  
    var search = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp&limit=1"

    // get the data
    axios.get(search).then(function (response) {
        console.log(response.data[0].venue.city);
        console.log(response.data[0].venue.name);
    })
} // end function



function spotifyThis(name) {
    console.log("SpotifyThis is working");
    if (name === "") {
        name = "Never gonna give you up";
    }
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    spotify.search({
        type: 'track',
        query: name,
        limit: 2
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data, null, 2));
    });
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

        console.log("Movie: " + response.data.Title);
        console.log("Year: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatos Rating: " + response.data.tomatoRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
}; // end function




function doThis() {
    console.log("This is running...");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("There was an error: " + err);
        } else {
            console.log(data);

            var dataArr = data.split(",");
            console.log(dataArr);
        }
    });
} // end function