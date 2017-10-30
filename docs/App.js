import React from 'react'
import {
  MatchMediaProvider,
  withMatchMedia,
  MatchMedia,
} from '../src'

const Debug = props => <pre children={JSON.stringify(props, null, 2)} />

const Big = props =>
  <h1 {...props} style={{
    fontSize: 64
  }} />

const Medium = props =>
  <h1 {...props} style={{
    fontSize: 32
  }} />

const App = props => (
  <MatchMediaProvider
    mediaQueries={{
      xsmall: '(max-width: 32em)',
      small: '(min-width: 32em)',
      medium: '(min-width: 48em)',
      large: '(min-width: 64em)'
    }}>
    <MatchMedia
      children={(matchProps) => (
        <div>
          {matchProps.matches.includes('large')
            ? <Big>Big Heading</Big>
            : <Medium>Medium Heading</Medium>
          }
          <Debug {...matchProps} />
        </div>
      )}
    />
  </MatchMediaProvider>
)

export default App
