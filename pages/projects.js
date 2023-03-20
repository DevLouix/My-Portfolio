import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Projects from '../components/views/Projects'

function projects() {
  return (
    <div>
        <Header title='Projects'/>
        <Projects/>
    </div>
  )
}

export default projects