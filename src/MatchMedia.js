import React from 'react'
import PropTypes from 'prop-types'
import withMatchMedia from './withMatchMedia'

class MatchMedia extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render () {
    const { children } = this.props
    return children(this.props)
  }
}

export default withMatchMedia(MatchMedia)
