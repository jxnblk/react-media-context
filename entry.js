
import React from 'react'
import ReactDOM from 'react-dom'
import MediaContext from '../src/MediaContext'
import readme from 'html!markdown!../README.md'

const div = document.getElementById('app')

const Header = ({}, { media }) => {
  let fontSize = 32

  if (media.indexOf('large') > -1) {
    fontSize = 96
  } else if (media.indexOf('medium') > -1) {
    fontSize = 64
  }

  const sx = {
    root: {
      padding: media.indexOf('xsmall') > -1 ? 16 : 32
    },
    heading: {
      fontSize,
      margin: 0
    }
  }

  return (
    <header style={sx.root}>
      <h1 style={sx.heading}>
        Hello
      </h1>
      <p>
        {'<MediaContext /> provider'}
      </p>
      <a href='//github.com/jxnblk/react-media-context'>GitHub</a>
    </header>
  )
}

const Readme = (props, { media }) => {
  const sx = {
    maxWidth: '48em',
    padding: media.indexOf('xsmall') > -1 ? 16 : 32
  }

  return (
    <div
      style={sx}
      dangerouslySetInnerHTML={{ __html: readme }} />
  )
}

Readme.contextTypes = {
  media: React.PropTypes.array
}

Header.contextTypes = {
  media: React.PropTypes.array
}

class App extends React.Component {
  render () {
    return (
      <MediaContext>
        <Header />
        <Readme />
      </MediaContext>
    )
  }
}

ReactDOM.render(<App />, div)

