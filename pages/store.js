import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Store from '../components/Store'
import { StoreContext } from '../context/StoreContext'

const Container = styled.div`
    margin: 0 20px;
    height: 80vh;
    border: 1px white solid;
`

function store() {
  return (
    <Container>
        <Header title='Store'/>
        <StoreContext>
            <Store/>
        </StoreContext>
    </Container>
  )
}

export default store