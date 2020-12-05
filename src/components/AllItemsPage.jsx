import React from 'react'
import TableOfAllItems from './TableOfAllItems.jsx'
import Search from './Search'
import NewItemForm from './NewItemForm'
// import Currency from './Currency'


class AllItemsPage extends React.Component{

    state = {
      searchTerm: "",
      magicFilter: "" 
    }

    changeSearchTerm = (termFromChild) => {
      this.setState({
        searchTerm: termFromChild
      })
    }

    removeInventoryItem = (selectedItemId) => {
      fetch(`http://localhost:3000/items/${selectedItemId}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        this.props.filterAllItemsForStateAfterDelete(selectedItemId)
      })
    }

    render(){
      // console.log(this.props.items)
      let searchTerm = this.state.searchTerm
      let filteredItems = this.props.items.filter(item => {
        return item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      })

      return(
          <main>
            {/* <Currency shop={this.props.shops[0]}/> */}
            <Search searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/>
            <TableOfAllItems filteredItems={filteredItems} shops={this.props.shops} addNewInventoryItem={this.props.addNewInventoryItem} 
              removeInventoryItem={this.removeInventoryItem} updateItemPlotMagicalInState={this.props.updateItemPlotMagicalInState}
            />
            <NewItemForm addAllItemsTableRow={this.props.addAllItemsTableRow}/>
          </main>
      )
    }
}

export default AllItemsPage