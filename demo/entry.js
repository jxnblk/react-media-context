
import React from 'react'
import ReactDOM from 'react-dom'
import MediaContext, { connectMediaContext } from '../src/MediaContext'
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
        {'<MediaContext /> provider and higher order component'}
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

const HOCDemo = connectMediaContext()((props) => {
  const size = props.media[props.media.length - 1]
  const fontSizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 48
  }
  const fontSize = fontSizes[size]

  const sx = {
    root: {
      padding: size === 'xsmall' ? 16 : 32,
    },
    heading: {
      fontSize
    },
    pre: {
      fontFamily: 'Menlo, monospace'
    }
  }

  return (
    <div style={sx.root}>
      <h2 style={sx.heading}>HOC Demo {fontSize}px</h2>
      <pre style={sx.pre}>matches: {props.media.join(', ')}</pre>
    </div>
  )
})

class App extends React.Component {
  render () {
    return (
      <MediaContext>
        <Header />
        <HOCDemo />
        <Readme />
      </MediaContext>
    )
  }
}

ReactDOM.render(<App />, div)

