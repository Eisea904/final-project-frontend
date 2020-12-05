import React from 'react'
import AllItemsTableRow from './AllItemsTableRow'

const TableOfAllItems = (props) => {
// console.log(props.filteredItems)
    let allItemsTableRows = props.filteredItems.map(itemRow => {
        return <AllItemsTableRow key={itemRow.id} itemRow={itemRow} addNewInventoryItem={props.addNewInventoryItem} removeInventoryItem={props.removeInventoryItem} 
          shops={props.shops} updateItemPlotMagicalInState={props.updateItemPlotMagicalInState}
        />
      })

    return (
        <table border="1px solid black" className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Plot?</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Magical?</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Item Name</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Weight</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Cost</h3>
            </th>
            <th>
            <h4 className="ui canter aligned header">{""}</h4>
            </th>
          </tr>
          {allItemsTableRows}
        </tbody>
      </table>
    )
}

export default TableOfAllItems