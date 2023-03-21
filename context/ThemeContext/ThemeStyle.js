import React from 'react';

export function DarkTheme() {
    return (
        <style global jsx>{`
        body {
          background: black;
          height: 100vh;
          width: 100vh
          transition: all 1s linear;
          color:white;
        }
        h1,h2,h3,h4,h5,h6{
          color: white;
        }
        .theme_mode_background{
            background-color: black;
        }
      `}</style>
    );
}

export function LightTheme() {
    return (
        <style global jsx>{`
        body {
          background: white;
          height: 100vh;
          width: 100vh
          transition: all 1s linear;
          color: black
        }
        h1,h2,h3,h4,h5,h6{
          color: black;
        }
        .theme_mode_background{
            background-color: white;
        }
      `}</style>
    );
}
