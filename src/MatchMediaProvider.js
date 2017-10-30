import React from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

class MatchMediaProvider extends React.Component {
  static childContextTypes = {
    [CHANNEL]: PropTypes.shape({
      matches: PropTypes.array
    })
  }

  static propTypes = {
    mediaQueries: PropTypes.object
  }

  static defaultProps = {
    mediaQueries: {}
  }

  constructor () {
    super()

    this.state = {
      matches: []
    }

    this.listeners = []

    this.registerListener = ({ name, value }) => {
      const handleChange = e => {
        const { matches } = this.state
        if (e.matches && matches.includes(name)) return
        let next
        if (e.matches) {
          next = [ ...matches, name ]
        } else {
          next = matches.filter(n => n !== name)
        }
        this.setState({ matches: next })
      }

      const matcher = window.matchMedia(value)
      const listener = matcher.addListener(handleChange)

      if (matcher.matches) {
        this.setState(state => ({ matches: [ ...state.matches, name ] }))
      }

      this.listeners.push({ matcher, listener })
    }

    this.removeListeners = () => {
      this.listeners.forEach(({ matcher, listener }) => {
        matcher.removeListener(listener)
      })
    }
  }

  componentDidMount () {
    const { mediaQueries } = this.props
    Object.keys(mediaQueries)
      .map(name => ({ name, value: mediaQueries[name] }))
      .forEach(this.registerListener)
  }

  componentWillUnmount () {
    this.removeListeners()
  }

  getChildContext () {
    return {
      [CHANNEL]: this.state
    }
  }

  render () {
    return this.props.children
  }
}

export default MatchMediaProvider
