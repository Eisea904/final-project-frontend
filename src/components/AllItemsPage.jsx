import React from 'react'
import TableOfAllItems from './TableOfAllItems.jsx'
import Search from './Search'
import NewItemForm from './NewItemForm'


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

    removeInventoryItem = (selectedShopId) => {
      fetch(`http://localhost:3000/items/${selectedShopId}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        this.props.filterAllItemsForStateAfterDelete(selectedShopId)
      })
    }

    render(){
      console.log(this.props.items)
      let searchTerm = this.state.searchTerm
      let filteredItems = this.props.items.filter(item => {
        return item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      })

      return(
          <main>
            <Search searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/>
            <TableOfAllItems filteredItems={filteredItems} shops={this.props.shops} addNewInventoryItem={this.props.addNewInventoryItem} removeInventoryItem={this.removeInventoryItem}/>
            <NewItemForm addAllItemsTableRow={this.props.addAllItemsTableRow}/>
          </main>
      )
    }
}

export default AllItemsPage