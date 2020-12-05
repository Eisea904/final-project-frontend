import React from 'react'

class ItemRow extends React.Component{

    state = {
      recipient: "",
      quantity: this.props.itemRow.quantity,
      plotCheckbox: this.props.itemRow.plot,
      magicalCheckbox: this.props.itemRow.magical
    }

    handleRecipientSubmit = (evt) => {
      evt.preventDefault()
      let recipientId = parseInt([...this.state.recipient])
      let selectedItem = this.props.itemRow

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
      let selectedItemId = parseInt([evt.target.value])
      let selectedShopId = 1  // deleting will default to deleting from Party items for now
      
      this.props.removeInventoryItem(selectedShopId, selectedItemId)
    }

    handleCheckbox = (evt) => {
      evt.preventDefault()
      let name = [evt.target.name]
      this.setState({
        [name]: !this.state.[name]
      })
      fetch(`http://localhost:3000/items/${this.props.itemRow.id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          [evt.target.value]: !this.state.[name]
        })
      })
      .then(res => res.json())
      .then(updatedItem => {
        this.props.updateItemPlotMagicalInState(updatedItem)
      })
    }


    render() {
      let {id, plot, magical, item_name, description, weight, quantity, cost} = this.props.itemRow
      let optionsOfRecipientShops = this.props.shops.map(shop => {
        return <option value={shop.id}>{shop.name}</option>
      })
      return(
        <tr>
          <td>
            <input type="checkbox" name="plotCheckbox" value="plot" checked={this.state.plotCheckbox} onChange={this.handleCheckbox}/>
          </td>
          <td>
            <input type="checkbox" name="magicalCheckbox" value="magical" checked={this.state.magicalCheckbox} onChange={this.handleCheckbox}/>
          </td>
          <td>{item_name}</td>
          <td>{description}</td>
          <td>{weight}</td>
          <td>{cost}</td>
          <td>
            <form className="update integer form" onSubmit={this.handleQuantitySubmit}>
              <input type="number" name="quantity" placeholder={quantity}  step={1} onChange={this.handleQuantityChange}/>
              <input className="ui button" type="submit" value={"💳"} />
            </form>
          </td>
          <td>  
            <form className="new inventory item" onSubmit={this.handleRecipientSubmit}>
              <input className="ui button" type="submit" value="Give to:"/>
              <select id={id} value={this.state.recipient} onChange={this.handleRecipientChange}>
                <option value="0">{""}</option>
                {optionsOfRecipientShops}
              </select>
            </form>
  {/* for handleDelete if shop.id === 1, function properly; else does not perform fetch?               */}
            <button onClick={this.handleDelete} value={id}> 
              💀 
            </button>
          </td>
        </tr>
      )
    }
}

export default ItemRow