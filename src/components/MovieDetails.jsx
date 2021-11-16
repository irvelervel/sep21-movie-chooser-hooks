import { useState, useEffect } from "react";
import { Card } from 'react-bootstrap'

// MovieDetails is going to actually perform the fetch for the selected movie details
// so MovieDetails needs to know which one is the selected movie!
// I'm receiving here a prop called movieTitle with this.props.movieTitle

// CHAIN OF EVENTS
// (constructor)
// render()
// componentDidMount()
// componentDidUpdate()
// componentWillUnmount() <-- is useful for a limited amount of scenarios, mostly for dealing
// with PENDING things

let timer = null

const MovieDetails = (props) => {

    // state = {
    //     movieDetails: null
    // }

    const [movieDetails, setMovieDetails] = useState(null)

    const getMovieData = async () => {
        try {
            let response = await fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + props.movieTitle)
            // the initial fetch is supposed to be http://www.omdbapi.com/?apikey=24ad60e9&s=Batman%20Begins
            if (response.ok) {
                // successfull fetch!
                let data = await response.json()
                console.log(data.Search[0])
                // this.setState({
                //     movieDetails: data.Search[0]
                //     // data.Search[0] is a single object!
                // })
                setMovieDetails(data.Search[0])
            } else {
                // something went wrong... :(
                console.log('an error happened in the fetch process')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('componentDidMount triggered!')
        getMovieData()

        // extra
        timer = setInterval(() => {
            // timer because an Interval object
            console.log('tick, tok')
        }, 1000)
        // the next line is for telling react that you know what you're doing
        // and you want the suggestions from the editor to just shut up!
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // componentDidMount = async () => {
    //     // 1) it's actually happening AFTER the initial render()
    //     // 2) we're guaranteed it's happening just ONCE for every component mounting
    //     // that's great because a fetch() is an EXPENSIVE operation
    //     // we want to execute it just the times we actually need it!
    //     console.log('componentDidMount triggered!')
    //     this.getMovieData()

    //     // extra
    //     this.timer = setInterval(() => {
    //         // timer because an Interval object
    //         console.log('tick, tok')
    //     }, 1000)
    // }

    useEffect(() => {
        return () => {
            clearInterval(timer)
        }
    }, [])

    // componentWillUnmount = () => {
    //     // this is useful for closing/removing/destroying any pending counter/interval/connection
    //     // you might have still going in your component

    //     // componentWillUnmount gets fired JUST ONCE, a moment BEFORE the destroying of this component
    //     clearInterval(this.timer)
    //     // or maybe closing an open connection in a chat window
    // }

    useEffect(() => {
        getMovieData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.movieTitle])

    // componentDidUpdate is a lifecycle method automatically triggered by React
    // over and over again every time there's a change in the state or in the props
    // of this component
    // componentDidUpdate = (previousProps, previousState) => {
    //     // we're going to fall here every time there's a change in the STATE or in the PROPS
    //     // the solution is: calling getMovieData() not when we fall here because of a STATE change,
    //     // but only when there's a PROPS change

    //     // we can use previousProps and compare it to this.props
    //     // for detecting a prop change!
    //     if (previousProps.movieTitle !== this.props.movieTitle) {
    //         // it means the movieTitle changed!
    //         // it means that I selected a new option in the dropdown in App
    //         this.getMovieData() // <-- this will set the state!
    //         // if your componentDidUpdate doesn't have an if statement,
    //         // ...probably something's off
    //     }
    // }

    // render gets fired again every time there's a change in the state or in the props
    // not having a state yet, the only reason is going to be a props change
    console.log(props.movieTitle)
    return (
        <>
            {
                movieDetails ? (
                    <Card>
                        <Card.Img variant="top" src={movieDetails.Poster} />
                        <Card.Body className="text-dark">
                            <Card.Title>{movieDetails.Title}</Card.Title>
                            <Card.Text>
                                {movieDetails.Year} - {movieDetails.imdbID}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : <p>LOADING...</p>
            }
        </>
    )
}

export default MovieDetails