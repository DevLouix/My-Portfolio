import React from 'react'

export function DarkTheme() {
    return(
        <style global jsx>{`
        body {
          background: black;
          height: 100vh;
          width: 100vh
          transition: all 1s linear;
          color:white;
        }
        h1{
          color: white;
        }
      `}</style>
    )
}

export function LightTheme() {
    return(
        <style global jsx>{`
        body {
          background: white;
          height: 100vh;
          width: 100vh
          transition: all 1s linear;
          color: black
        }
      `}</style>
    )
}