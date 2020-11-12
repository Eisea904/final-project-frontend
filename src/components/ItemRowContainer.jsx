import React from 'react'
import ItemRow from './ItemRow'


const ItemRowContainer = (props) => {

    let itemRows = props.filteredItemArray.map(itemRow => {
      return <ItemRow key={itemRow.id} itemRow={itemRow} addNewInventoryItem={props.addNewInventoryItem} removeInventoryItem={props.removeInventoryItem} shops={props.shops} />
    })

    // let itemRows = props.selectedShop.items.map(itemRow => {
    //   return <ItemRow key={itemRow.id} itemRow={itemRow} addNewInventoryItem={props.addNewInventoryItem} removeInventoryItem={props.removeInventoryItem} shops={props.shops} />
    // })

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
              <h3 className="ui center aligned header">Quantity</h3>
            </th>
            <th>
              <h4 className="ui canter aligned header">{""}</h4>
            </th>
          </tr>
          {itemRows}
        </tbody>
      </table>
    )
    
}

export default ItemRowContainer