import React from 'react'

class NewItemForm extends React.Component{

    state = {
      plot: false,
      magical: false,
      item_name: "",
      description: "",
      weight: 1, 
      cost: 1
    }

    handleInputChange = (evt) => {
      this.setState({
          [evt.target.name]: [evt.target.value]
      })
    }

    handleSubmit = (evt) => {
      evt.preventDefault()
      console.log(this.state.description)
      let {plot, magical, item_name, description, weight, cost} = this.state
      fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          plot,
          magical,
          item_name,
          description,
          weight,
          cost
        })
      })
      .then(res => res.json())
      .then(newAllItemsTableRow => {
        console.log(newAllItemsTableRow)
        this.props.addAllItemsTableRow(newAllItemsTableRow)
      })
    }


    render(){
      return(
        <div className="ui segment">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="inline fields">
              <input type="boolean" name="plot" placeholder="plot? true/false" value={this.state.plot} onChange={this.handleInputChange} />
              <input type="boolean" name="magical" placeholder="magical?  true/false" value={this.state.magical} onChange={this.handleInputChange} />
              <input type="text" name="item_name" placeholder="Item Name" value={this.state.item_name} onChange={this.handleInputChange} />
              <input type="text" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
              <input type="number" name="price" placeholder="Price" value={this.state.price} onChange={this.handleInputChange} />
              <input type="number" name="weight" placeholder="Weight" value={this.state.weight} onChange={this.handleInputChange} />
            </div>
            <button className="ui button" type="submit">
                🖋
            </button>
          </form>
        </div>
      )
    }
}

export default NewItemForm