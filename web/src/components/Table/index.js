import React from 'react'
import ReactTable from 'react-table'
import _ from 'lodash'
import './styles.scss'
import 'react-table/react-table.css'

export default function Table ({ data: { title, columns, rows } }) {
  const tableColumns = _.map(columns, ({ name, accessor }) => ({
    Header: name,
    accessor
  }))

  // Note(marlon):this lives here while the API keeps changing
  // Ideally a lot of this lives in a component or several
  const tableRows = _.map(rows, row => _.mapValues(row, (value) => {
    if (_.isObject(value)) {
      if (value.type === 'labels' && value.labels) {
        const pairs = _.map(value.labels, (v, k) => `${k}:${v}`)
        if (pairs.length) return pairs.join(', ')
      }
      if (_.includes(['array', 'list'], value.type)) {
        const arr = _.find([value.array, value.list])
        if (arr) return arr.join(', ')
        return '-'
      }
      if (value.text) return value.text
      return '-'
    }
    return value
  }))
  const pageSize = rows && rows.length ? rows.length : null
  return (
    <div className='table--component'>
      <h2 className='table-component-title'>{title}</h2>
      <ReactTable
        columns={tableColumns}
        data={tableRows}
        showPagination={false}
        pageSize={pageSize}
      />
    </div>
  )
}