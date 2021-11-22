import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class MovieItem extends Component {

constructor(){
    super();
    this.DeleteMovie = this.DeleteMovie.bind(this); //strong and loose javascript
}
//delete http from axios
DeleteMovie(){
    axios.delete('http://localhost:4000/api/movies/'+this.props.movie._id)
    .then(()=>{
        this.props.ReloadData();
    }) // call back function after delete
    .catch()
}
    render() {
        return (
            <div>
                {/* edit used for editing movies providing have proper id from mongo  */}
                <Card>
                    <Card.Header>{this.props.movie.title}</Card.Header>
                    <Card.Body>
                        <blockquote>
                            <img src={this.props.movie.poster}></img>
                            <footer>
                                {this.props.movie.year}
                            </footer>
                        </blockquote>
                    </Card.Body>
                    <Link to={"/edit/" + this.props.movie._id} className="btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteMovie}>Delete</Button>
                </Card>
            </div>
        );
    }
}
export default MovieItem;