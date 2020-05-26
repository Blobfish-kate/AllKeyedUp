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
                <H2>Results for: {props.genreSelection} tracks in {props.keySelection}</H2>
                <h4>Want to change your search critera?</h4>
                <br />
                <button className="btn btn-light" onClick={props.backButton}>Back</button>
            </TitleContainer>
            <div className="container">
                <div className="row justify-content-center">
                    {props.recommendedSongs}
                </div>
            </div>
        </Container>
    )
}

export default Results