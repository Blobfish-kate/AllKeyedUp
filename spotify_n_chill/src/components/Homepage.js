import React from "react"
import styled from 'styled-components'
import '../stylesheets/Homepage.scss'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    overflow: hidden
`
const Title = styled.h1`
    
`

const Content = styled.div`
    position: absolute;
    width: 100%;
    margin-top: 15%;
    margin-bottom: 20%;
    padding: 0 15%;
    text-align: center
`
const Button = styled.button`
    height: 150%;
    margin-top: 2%;
    margin-right: 1%;
    margin-left: 1%;
    width: 20%;
    font-size: larger;
`
const Link = styled.a`

`

function Homepage(props) {
    let c = []
    for(let i=0; i < 200; i++) {
        c.push(<span className="c" />)
    }

    let anchor
    if(process.env.NODE_ENV !== 'production') {
      anchor = 'http://localhost:8888/login'
    } else {
      anchor = 'http://ec2-3-10-223-4.eu-west-2.compute.amazonaws.com:8888/login'
    }

    return(
        <Container className="wrap">
            {c}
            <Content>
                <Title>All Keyed Up</Title>
                <h2>Song recommendations in your favourite key...</h2>
                <Link href={anchor}>
                    <Button type="button" className="btn btn-light">Login With Spotify</Button>
                </Link>
            
                <Button onClick={props.logout} type="button" className="btn btn-light">Log out</Button>
            
            </Content>
        </Container>
    )
}

export default Homepage