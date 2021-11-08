const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//cors helps put data to front end
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

//parser middleware allows intercept of main body
//parse app/x-ww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Connecting to the database
const Connection = 'mongodb+srv://Admin:Vanyolo1@cluster0.tvdpt.mongodb.net/movies?retryWrites=true&w=majority' ;
mongoose.connect(Connection, {useNewUrlParser: true});

const Schema = mongoose.Schema;

//generating schema what database will look like
var movieSchema = new Schema({
    title:String,
    year:String,
    poster:String
});

//using movieSchema to generate a model
// when want to use database just refer to movieModel
var MovieModel = mongoose.model("movie", movieSchema);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

//getting a certain movie if searched using id
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) =>{
        res.json(data);
    })
})

//passing up requests, getting server ready to retrive some data
//pulling title year and poster out of the body
app.post('/api/movies', (req,res)=>{
    console.log(req.body);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);
    res.send('Data Sent to Server!')

    MovieModel.create({
        title:req.body.Title,
        year:req.body.Year,
        poster:req.body.Poster
    })
})

    // casting the array of movies to backend local host 4000
app.get('/api/movies', (req, res) => {
   /* const movies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }, 
        {
            "Title": "War of the Worlds",
            "Year": "2005",
            "imdbID": "tt0407304",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
        }
    ];*/
    MovieModel.find((err, data)=>{
        res.json(data);
    })

     // calling object passing down movies
   /* res.json({
        mymovies:movies,
        'Message':'Hello from the server'
    })*/
})

//http listen method to listen to request on certain port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})