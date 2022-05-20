import React from 'react'
import { graphql } from 'gatsby'
import { useIntl } from 'react-intl'

import Layout from '../components/layout'
import Seo from '../components/seo'
import DataTable from 'react-data-table-component'
import ResetIcon from '../../static/assets/icons/close.inline.svg'

import { mainContent, contentWrapper, dataTable, filterWrapper } from './sources.module.styl'

const paginationRowsPerPageOptions = [25, 50, 100, 200, 500]

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  const intl = useIntl()
  return (
    <div className={filterWrapper}>
      <input
        type="text"
        placeholder={intl.formatMessage({ id: 'filterPlaceholder' })}
        value={filterText}
        onChange={onFilter}
      />
      <button onClick={onClear}>
        <ResetIcon />
      </button>
    </div>
  )
}

const SourcesData = ({ data, pageContext }) => {
  const intl = useIntl()

  const columns = [
    {
      name: 'ID',
      selector: row => row.sourceID,
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'type' }),
      selector: row => intl.formatMessage({ id: row.type }),
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'fullName' }),
      selector: row => row.info[0].fullName,
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'localName' }),
      selector: row => row.info[0].localName,
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'nation' }),
      selector: row => (row.nation ? intl.formatMessage({ id: row.nation }) : ''),
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'source.logoCount' }),
      selector: row => row.logoCount,
      sortable: true
    },
    {
      name: intl.formatMessage({ id: 'source.version' }),
      selector: row => row.latestVersion
    },
    {
      name: intl.formatMessage({ id: 'timeline' }),
      selector: row => <span></span>,
      conditionalCellStyles: [
        {
          when: row => row.timeline,
          classNames: ['complete']
        },
        {
          when: row => !row.timeline,
          classNames: ['not-complete']
        }
      ],
      center: true
    }
  ]

  const paginationComponentOptions = {
    rowsPerPageText: intl.formatMessage({ id: 'rowsPerPage' }),
    rangeSeparatorText: intl.formatMessage({ id: 'of' }),
    selectAllRowsItem: true,
    selectAllRowsItemText: intl.formatMessage({ id: 'all' })
  }

  const [filterText, setFilterText] = React.useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false)
  const filteredItems = data.allSourceInfo.nodes.filter(
    item =>
      item.info[0].fullName &&
      item.info[0].fullName.toLowerCase().includes(filterText.toLowerCase())
  )

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText('')
      }
    }

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    )
  }, [filterText, resetPaginationToggle])
  return (
    <Layout pageContext={pageContext}>
      <Seo title={intl.formatMessage({ id: 'sources.title' })} />
      <div className={mainContent}>
        <section className={contentWrapper}>
          <div className={dataTable}>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationPerPage={25}
              paginationResetDefaultPage={resetPaginationToggle}
              paginationRowsPerPageOptions={paginationRowsPerPageOptions}
              paginationComponentOptions={paginationComponentOptions}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              highlightOnHover
              pointerOnHover
              noDataComponent={intl.formatMessage({ id: 'noData' })}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default SourcesData

export const query = graphql`
  query ($locale: String!) {
    allSourceInfo(
      sort: { fields: sourceID, order: ASC }
      filter: { fields: { locale: { eq: $locale } } }
    ) {
      nodes {
        id
        nation
        info {
          fullName
          localName
        }
        sourceID
        type
        timeline
        logoCount
        latestVersion
      }
    }
  }
`
