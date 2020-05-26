import React from 'react'
import styled from 'styled-components'

const Image = styled.img`

`

const Overlay = styled.div`
    margin-top: 25%;
    opacity: 0;
    tranisition: .3s ease;
`
const Icon = styled.i`
    font-size: 100px;
    color: white
`

const Container = styled.div`
    margin: 20px auto;
    text-align: center;
    &:hover ${Overlay} {
        opacity: 1
    }
`

function FoundSong(props) {
    return(
                <Container className="container col-lg-4 col-md-6">
                    <div className="card shadow">
                        <Image className="card-img" src={props.song.album.images[0].url} alt="album cover"/>
                        <Overlay className="card-img-overlay text-white">
                            <a href={props.song.external_urls.spotify} target="_blank">
                                <Icon className="fa fa-play-circle card-title" />
                            </a>
                        </Overlay>
                        <div className="card-body">
                            <h4 className="card-title">{props.song.name}</h4>
                            <p className="card-text">{props.song.artists[0].name}</p>
                        </div>
                    </div>
                </Container>
    )
}

export default FoundSong