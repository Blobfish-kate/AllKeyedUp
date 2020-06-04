import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 90vw;
    margin: 0 auto
`
const TitleContainer = styled.div`
    width: 100%;
    background-color: white;
    margin: auto;
    text-align: center
`

const H2 = styled.h2`
    color: black
`

function Results(props) {
    return(
        <Container className="container">
            <TitleContainer className="jumbotron">
                {props.listLength > 0 && <div>
                    <H2>
                        Results for: {props.genreSelection} tracks
                        {props.keySelection &&
                            <span> in {props.keySelection}</span>
                        }
                        {props.timeSelection && 
                            <span> with {props.timeSelection} beats per bar</span>
                        }
                    </H2>
                    <br />
                    <h4>Want to change your search critera?</h4>
                    <br />
                    <button className="btn btn-light" onClick={props.backButton}>Back</button>
                </div> }
                {props.listLength === 0 && <div>
                    <H2>
                        No results for: {props.genreSelection} tracks
                        {props.keySelection &&
                            <span> in {props.keySelection}</span>
                        }
                        {props.timeSelection && 
                            <span> with {props.timeSelection} beats per bar</span>
                        }
                    </H2>
                    <br />
                    <h4>Looks like your search was too specific, you hipster!</h4>
                    <br />
                    <button className="btn btn-light" onClick={props.backButton}>Change search criteria</button>
                </div> }
            </TitleContainer>

            <div className="row justify-content-center">
                {props.recommendedSongs}
            </div>
        </Container>
    )
}

export default Results