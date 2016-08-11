
require('mocha-jsdom')()

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import expect from 'expect'
import { mount } from 'enzyme'
import MediaContext, { connectMediaContext } from '../src/MediaContext'

describe('<MediaContext />', () => {
  let tree

  before(() => {
    // Stub matchMedia
    window.matchMedia = () => {
      return {
        matches: false,
        addListener: (listener) => {},
        removeListener: (listener) => {}
      }
    }
  })

  it('should render', () => {
    expect(() => {
      tree = mount(<MediaContext />)
    }).toNotThrow()
  })

  it('should have child context', () => {
    expect(tree.node.getChildContext().media).toEqual([])
  })

  context('when xsmall matches', () => {
    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: /max\-width:\s40em\)$/.test(query),
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }
      tree = mount(<MediaContext />)
    })

    it('should include xsmall in the media context', () => {
      const { media } = tree.node.getChildContext()
      expect(media).toEqual(['xsmall'])
    })
  })

  context('when small matches', () => {
    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: /min\-width:\s40em\)$/.test(query),
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }
      tree = mount(<MediaContext />)
    })

    it('should include small in the media context', () => {
      const { media } = tree.node.getChildContext()
      expect(media).toEqual(['small'])
    })
  })

  context('when medium matches', () => {
    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: /min\-width:\s52em\)$/.test(query),
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }
      tree = mount(<MediaContext />)
    })

    it('should include medium in the media context', () => {
      const { media } = tree.node.getChildContext()
      expect(media).toEqual(['medium'])
    })
  })

  context('when large matches', () => {
    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: /min\-width:\s64em\)$/.test(query),
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }
      tree = mount(<MediaContext />)
    })

    it('should include large in the media context', () => {
      const { media } = tree.node.getChildContext()
      expect(media).toEqual(['large'])
    })
  })

  context('when setting custom queries', () => {
    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: /min\-width:\s640px\)$/.test(query),
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }

      const CustomMedia = connectMediaContext({
        queries: {
          mobile: 'screen and (max-width: 640px)',
          desktop: 'screen and (min-width: 640px)'
        }
      })('div')

      tree = mount(<CustomMedia />)
    })

    it('should include custom media queries in context', () => {
      const { media } = tree.node.getChildContext()
      expect(media).toEqual(['desktop'])
    })
  })

  context('when resizing the window', () => {
    let match
    let handleResize

    before(() => {
      window.matchMedia = (query) => {
        return {
          matches: false,
          addListener: (listener) => {},
          removeListener: (listener) => {}
        }
      }
      match = expect.spyOn(MediaContext.prototype, 'match')
      tree = mount(<MediaContext />)
      const e = new Event('resize')
      window.dispatchEvent(e)
    })

    it('should call the handleResize method', () => {
      expect(match.call.length).toEqual(1)
    })

    it('should call the match method', () => {
      expect(match.calls.length).toEqual(1)
    })
  })

  context('when rendering server-side', () => {
    it('should render', () => {
      expect(() => {
        const html = ReactDOMServer.renderToString(<MediaContext />)
      }).toNotThrow()
    })
  })
})

