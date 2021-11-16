import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import MovieDetails from './components/MovieDetails'

// we're going to create a movie chooser app
// it's going to hold a movie in a dropdown at the top
// and it's going to show its details in the bottom

// for remembering and keep track of the chosen movie
// we have to store the value of the <select> into the State of this component

// for getting a proper state object in a component, we should write it in the Class shape
// we need to convert App from being a functional component into a class-based one

const App = () => {
  // state = {
  //   movieTitle: 'Batman Begins',
  //   showMovieSection: true,
  // }

  const [movieTitle, setMovieTitle] = useState('Batman Begins')
  const [showMovieSection, setShowMovieSection] = useState(true)

  return (
    <div className="App pt-4">
      <Container>
        <Row>
          <Col>
            <h2>Choose a movie!</h2>
            <Button
              onClick={() =>
                // this.setState({
                //   showMovieSection: !this.state.showMovieSection,
                // })
                setShowMovieSection(!showMovieSection)
              }
            >
              SHOW DETAILS
            </Button>
            <Form>
              <Form.Group>
                <Form.Control
                  as="select"
                  value={movieTitle}
                  onChange={
                    (e) => setMovieTitle(e.target.value)
                    // this.setState({
                    //   movieTitle: e.target.value,
                    // })
                  }
                >
                  <option>Batman Begins</option>
                  <option>Wonder Woman</option>
                  <option>Man Of Steel</option>
                  <option>The Flash</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {showMovieSection && (
          // when you conditionally render a component like in this case, with a state variable
          // you're not just toggling its visibility, you're deciding if that component is part of the DOM!
          // so when showMovieSection is true, MovieDetails is going through the mounting phase from scratch, every time
          // and when showMovieSection is false, MovieDetails is effectively GETTING DESTROYED
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <MovieDetails movieTitle={movieTitle} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )
}

export default App
