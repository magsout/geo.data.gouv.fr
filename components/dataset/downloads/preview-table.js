import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-table'
import {translate} from 'react-i18next'

import tableStyle from 'react-table/react-table.css'

const PreviewTable = ({data, t}) => {
  const attributes = new Set()
  data = data.features.map(feature => {
    const properties = {...feature.properties}
    delete properties.gml_id

    Object.keys(properties).forEach(key => {
      attributes.add(key)
    })

    return properties
  })

  return (
    <div>
      <Table
        data={data}
        columns={[...attributes].map(attribute => ({
          Header: attribute,
          accessor: attribute,
          minWidth: 200
        }))}
        showPageSizeOptions={false}
        defaultPageSize={50}
        minRows={25}

        previousText={t('preview.paging.previous')}
        nextText={t('preview.paging.next')}
        loadingText={t('common:loading')}
        noDataText={t('preview.empty')}
        pageText={t('preview.paging.page')}
        ofText={t('preview.paging.of')}
      />

      {/* eslint-disable react/no-danger */}
      <style dangerouslySetInnerHTML={{__html: tableStyle}} />
      {/* eslint-enable react/no-danger */}
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          flex: 1;

          :global(.ReactTable) {
            flex: 1;
          }
        }
      `}</style>
    </div>
  )
}

PreviewTable.propTypes = {
  data: PropTypes.shape({
    features: PropTypes.array.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(PreviewTable)
