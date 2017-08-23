import React from 'react'
import PropTypes from 'prop-types'

import { injectReducer } from 'common/store/reducers'
import { injectLocale } from 'common/i18n/helpers'

import SearchContainer from '../containers/SearchContainer'
import reducer from '../modules/reducer'

class SearchRoute extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    i18n: PropTypes.shape({
      availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }

  componentWillMount() {
    const { store, i18n } = this.props

    injectReducer(store, {
      key: 'search',
      reducer
    })

    i18n.availableLanguages.forEach(lang => {
      injectLocale(i18n, {
        locale: lang,
        namespace: 'Search',
        resources: require(`../locales/${lang}.json`)
      })
    })
  }

  render() {
    const { store, i18n, ...otherProps } = this.props

    return (
      <SearchContainer {...otherProps} />
    )
  }
}

export default SearchRoute
