import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/layout'
import Seo from '../components/seo'
import DataTable from 'react-data-table-component'
import ResetIcon from '../../static/assets/icons/close.inline.svg'

const paginationRowsPerPageOptions = [25, 50, 100, 200, 500]

const FilterComponent = ({ onFilter, onClear, filterText }) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-grow box-border items-center w-full justify-end flex-wrap min-h-[60px]">
      <input
        type="text"
        placeholder={t('filterPlaceholder')}
        value={filterText}
        onChange={onFilter}
        className="h-3xl w-[200px] border border-gray-1 p-sm text-xs capitalize rounded-l"
      />
      <button
        onClick={onClear}
        className="h-3xl w-3xl text-center flex items-center justify-center bg-green text-white rounded-r"
      >
        <ResetIcon className="w-xl h-xl" />
      </button>
    </div>
  )
}

const SourcesData = ({ data, pageContext }) => {
  const { t } = useTranslation()

  const columns = [
    {
      name: 'ID',
      selector: row => row.sourceID,
      sortable: true
    },
    {
      name: t('type'),
      selector: row => t(row.type),
      sortable: true
    },
    {
      name: t('fullName'),
      selector: row => row.info[0].fullName,
      sortable: true
    },
    {
      name: t('localName'),
      selector: row => row.info[0].localName,
      sortable: true
    },
    {
      name: t('founded'),
      selector: row => row.info[0].founded,
      sortable: true
    },
    {
      name: t('nation'),
      selector: row => (row.nation ? t(row.nation) : ''),
      sortable: true
    },
    {
      name: t('source.logoCount'),
      selector: row => row.logoCount,
      sortable: true
    },
    {
      name: t('source.latestVersion'),
      selector: row => row.latestVersion
    },
    {
      name: t('source.status'),
      selector: row => (row.status ? t(row.status) : ''),
      sortable: true
    },
    {
      name: t('timeline'),
      selector: row => <span className="block w-md h-md rounded-[50%]"></span>,
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
    rowsPerPageText: t('rowsPerPage'),
    rangeSeparatorText: t('of'),
    selectAllRowsItem: true,
    selectAllRowsItemText: t('all')
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
    <Layout>
      <div className="w-full m-[0_auto] flex-grow flex flex-col flex-nowrap items-start pt-[120px]">
        <section className="w-full m-[0_auto] px-xl flex flex-col overflow-visible">
          <div className="mb-header p-3xl rounded-lg shadow-card bg-white">
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
              noDataComponent={t('noData')}
            />
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default SourcesData

export const Head = ({ data }) => {
  const locales = data.locales.edges[0].node.data
  let obj = undefined
  if (locales) {
    obj = JSON.parse(locales)
  }
  return <Seo title={obj?.sourcestitle} />
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allSourceInfo(sort: { sourceID: ASC }, filter: { fields: { locale: { eq: $language } } }) {
      nodes {
        id
        nation
        info {
          fullName
          localName
          founded
        }
        sourceID
        type
        timeline
        logoCount
        latestVersion
        status
      }
    }
  }
`
