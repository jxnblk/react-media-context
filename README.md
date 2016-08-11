
# react-media-context

[![Build Status](https://travis-ci.org/jxnblk/react-media-context.svg?branch=master)](https://travis-ci.org/jxnblk/react-media-context)

React higher-order component (HOC) to provide context for the currently matched media query.

## Getting Started

```sh
npm i -S react-media-context
```

## Usage

```js
import React from 'react'
import MediaContext from 'react-media-context'

const Title = (props, context) => {
  const { media } = context
  let fontSize = 32
  if (media.indexOf('large') > -1) {
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

Title.contextTypes = {
  media: React.PropTypes.array
}

class App extends React.Component {
  render () {
    <MediaContext>
      <Title />
    </MediaContext>
  }
}
```

```js
// Higher order component example
import React from 'react'
import { connectMediaContext } from 'react-media-context'

const MyComponent = () => {
  /* ... */
}

export default connectMediaContext()(MyComponent)
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

## Configuration

Pass a configuration object as the first argument to `connectMediaContext` to change the default breakpoints.

```js
// Example config
const MediaContext = connectMediaContext({
  queries: {
    mobile: 'screen and (max-width:52em)',
    desktop: 'screen and (min-width:52em)'
  }
})(MyComponent)
```

```js
// Default breakpoints
{
  'xsmall': 'screen and (max-width: 40em)',
  'small': 'screen and (min-width: 40em)',
  'medium': 'screen and (min-width: 52em)',
  'large': 'screen and (min-width: 64em)'
}
```

MIT License

