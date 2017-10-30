import React from 'react'
import PropTypes from 'prop-types'
import { CHANNEL } from './constants'

const withMatchMedia = Component => {
  class MatchMedia extends React.Component {
    static contextTypes = {
      [CHANNEL]: PropTypes.shape({
        matches: PropTypes.array.isRequired
      })
    }

    render () {
      const { matches } = this.context[CHANNEL]

      return (
        <Component
          {...this.props}
          matches={matches}
        />
      )
    }
  }

  return MatchMedia
}

export default withMatchMedia
