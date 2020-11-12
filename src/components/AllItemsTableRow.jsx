import React from 'react'

class AllItemsTableRow extends React.Component{

    state = {
      recipient: ""
    }

    handleRecipientSubmit = (evt) => {
      evt.preventDefault()
      let recipientId = parseInt([...this.state.recipient])
      let selectedItem = this.props.AllItemsTableRow
      
      this.props.addNewInventoryItem(recipientId, selectedItem)
    }

    handleRecipientChange = (evt) => {
      evt.preventDefault()
      this.setState({
        recipient: [evt.target.value]
      })
    }

    handleDelete = (evt) => {
      evt.preventDefault()
      let selectedItemId = [evt.target.value]
      this.props.removeInventoryItem(selectedItemId)
    }

    render() {
      console.log(this.props)

        let {id, plot, magical, item_name, description, weight, cost} = this.props.itemRow
        let optionsOfRecipientShops = this.props.shops.map(shop => {
          return <option value={shop.id}>{shop.name}</option>
        })
      return(
        <tr>
          <td>
            <input type="checkbox" checked={plot} />
          </td>
          <td>
            <input type="checkbox" checked={magical}/>
          </td>
          <td>{item_name}</td>
          <td>{description}</td>
          <td>{weight}</td>
          <td>{cost}</td>
          <td>  
            <form className="new inventory item" onSubmit={this.handleRecipientSubmit}>
              <input className="ui button" type="submit" value="Give to:"/>
              <select id={id} value={this.state.recipient} onChange={this.handleRecipientChange} >
                <option value="0">{""}</option>
                {optionsOfRecipientShops}
              </select>
            </form>
            <button onClick={this.handleDelete} value={id}> 
              💀 
            </button>
          </td>
        </tr>
      )
    }
}

export default AllItemsTableRow