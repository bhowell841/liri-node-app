

require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment")
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
        console.log("");
        console.log("Poor choice.  Try: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
        console.log("");
}

function setName() {
    for (var i = 3; i < input.length; i++) {
        if (i > 3 && i < input.length) {
            name = name + "+" + input[i];
        } // end if
        else {
            name += input[i];
        } // end else
    } // end for
} // end setMedia


function concertThis(name) {
    // console.log("ConcertThis is working");
    if (name === "") {
        name = "Trampled By Turtles";
    }
    // console.log(name);
    var band = name.split("+").join(" ");
    // console.log(band);

    // set the search  
    var search = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp&limit=1"

    // get the data
    axios.get(search).then(function (response) {
                console.log("");
                console.log("Artist: " + band);
                console.log("-----------------------------------");
                for (var i = 0; i < 5; i++) {
                    var date = moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY")
                    // console.log(date);
                    console.log(response.data[i].venue.city);
                    console.log(response.data[i].venue.name);
                    console.log(date);
                    console.log("-----------------------------------");
                }
            
        })
        .catch((error) => {
            // Error
            if (error.response) {
                console.log("");
                console.log("Error, could not find shows for " + band); 
                console.log("");
            }   
        });
} // end function



function spotifyThis(name) {
    // console.log("SpotifyThis is working");
    if (name === "") {
        name = "Never gonna give you up";
    }
    var song = name.split("+").join(" ");

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    spotify.search({
        type: 'track',
        query: name,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log("There was an error: " + err);
        }
        // console.log(JSON.stringify(data, null, 2));
        console.log("");
        console.log("-----------------------------------");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        if (data.tracks.items[0].preview_url) {
            console.log("Sample: " + data.tracks.items[0].preview_url);
        } else {
            console.log("Sample:  Sorry no sample available for " + song);
        }
        console.log("-----------------------------------");
        console.log("");
    });
} // end function



function movieThis(name) {
    // console.log("MovieThis is working");
    if (name === "") {
        name = "Layer Cake";
    }
    // console.log("plus: " + name);
    
    var movie = name.split("+").join(" ");
    // console.log("normal: " + movie);
    // set the search
    var search = "http://www.omdbapi.com/?t=" + name + "&apikey=trilogy";

    // get the data
    axios.get(search).then(function (response) {
            if (response.data.Response === 'False') {
                console.log("");
                console.log(movie + " was not found.")
                console.log("");
            } else {
                console.log("");
                console.log("-----------------------------------");
                console.log("Movie: " + response.data.Title);
                console.log("Year: " + response.data.Released);
                console.log("IMDB Rating: " + response.data.imdbRating);
                if (response.data.Ratings[1]) {
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                } else {
                    console.log("Rotten Tomatoes Rating: None");
                }
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-----------------------------------");
                console.log("");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}; // end function




function doThis() {
    // console.log("This is running...");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("There was an error: " + err);
        } else {
            // console.log(data);

            var dataArr = data.split(",");
            var dataArr = dataArr.slice(1).join(" ");
            // console.log(dataArr);

            spotifyThis(dataArr);
        }
    });
} // end function