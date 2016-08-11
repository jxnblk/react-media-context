
import React from 'react'

const defaultQueries = {
  xsmall: 'screen and (max-width: 40em)',
  small: 'screen and (min-width: 40em)',
  medium: 'screen and (min-width: 52em)',
  large: 'screen and (min-width: 64em)'
}

const connectMediaContext = (config = {}) => (Comp) => {
  const queries = config.queries || defaultQueries

  class MediaContext extends React.Component {
    constructor () {
      super()
      this.state = {
        media: [
          'server'
        ]
      }
      this.match = this.match.bind(this)
    }

    getChildContext () {
      return this.state
    }

    match () {
      const media = []

      for (var key in queries) {
        const { matches } = window.matchMedia(queries[key])
        if (matches) {
          media.push(key)
        }
      }

      this.setState({ media })
    }

    componentDidMount () {
      this.match()
      for (let key in queries) {
        window.matchMedia(queries[key]).addListener(this.match)
      }
    }

    componentWillUnmount () {
      for (let key in queries) {
        window.matchMedia(queries[key]).removeListener(this.match)
      }
    }

    render () {
      return <Comp {...this.props} {...this.state} />
    }
  }

  MediaContext.childContextTypes = {
    media: React.PropTypes.array
  }

  return MediaContext
}

export default connectMediaContext

