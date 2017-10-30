
# react-media-context

[![Build Status](https://travis-ci.org/jxnblk/react-media-context.svg?branch=master)](https://travis-ci.org/jxnblk/react-media-context)

React provider and higher order component for window.matchMedia

```sh
npm i react-media-context
```

## Usage

```js
import React from 'react'
import {
  MatchMediaProvider,
  withMatchMedia
} from 'react-media-context'

const Title = withMatchMedia(props => {
  const { matches } = props
  let fontSize = 32
  if (matches.includes('large')) {
    fontSize = 64
  }

  const style = {
    fontSize
  }

  return (
    <h1 style={style}>
      Responsive Heading
    </h1>
  )
}

class App extends React.Component {
  render () {
    <MatchMediaProvider>
      <Title />
    </MatchMediaProvider>
  }
}
```

## How is this different from *x*?

Most other responsive React HOCs tend to work on the principle of *showing and hiding* children based on media queries. With this component, you can alter styling and functionality of components responsively.

This could be handy for:
- Changing font sizes based on the viewport width
- Changing margin or padding
- Grid systems
- Dramatically altering page layout
- Using different routing flows
- Changing image sources based on pixel density (but, srcset is probably a better option)

## Props

- `mediaQueries` (Object) - Media queries to match against on window resize

```js
{
  'xsmall': 'screen and (max-width: 40em)',
  'small': 'screen and (min-width: 40em)',
  'medium': 'screen and (min-width: 52em)',
  'large': 'screen and (min-width: 64em)'
}
```

MIT License

