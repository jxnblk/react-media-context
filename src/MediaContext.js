
import React from 'react'
import { debounce } from 'lodash'
import connectMediaContext from './connectMediaContext'

const MediaContext = connectMediaContext('div')

export { default as connectMediaContext } from './connectMediaContext'
export default MediaContext

