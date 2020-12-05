import React from 'react'
import ItemRowContainer from './ItemRowContainer'
import Search from './Search'
// import FilterMagical from './FilterMagical'
import Bio from './Bio'
// import NotFound from './NotFound'
// import {Route} from 'react-router-dom'

class MerchandisePage extends React.Component{

    state = {
      searchTerm: "",
      magicFilter: ""
    }

    removeInventoryItem = (selectedShopId, selectedItemId) => {
      let allJoinersWithSelectedShop = this.props.inventory_items.filter(inventory_item => {
        return inventory_item.shop_id === selectedShopId 
      })
      let inventoryItemToDelete = allJoinersWithSelectedShop.filter(inventory_item => {
        return inventory_item.item_id === parseInt(selectedItemId) 
      })
      let inventoryItemMakeSureOnlyOne = inventoryItemToDelete[0]
      fetch(`http://localhost:3000/inventory_items/${inventoryItemMakeSureOnlyOne.id}`, {
        method: "DELETE"
      })
      .then(resp => resp.json())
      .then(() => {
        let selectedShop = this.props.selectedShop
        this.props.filterSelectedShopItemsForState(selectedItemId, selectedShop)
      })
    }

    changeSearchTerm = (termFromChild) => {
      this.setState({
        searchTerm: termFromChild
      })
    }

    render(){
      // console.log(this.props)
      let searchTerm = this.state.searchTerm
      // let selectedShop = this.props.selectedShop
      let filteredItemArray = []
      if(this.props.selectedShop){
        filteredItemArray = this.props.selectedShop.items.filter(item => {
          return item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
        })      
      }


      return(
        <main>
          <>
          <Search searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/>
          </>
          {/* <FilterMagical /> */}
          {/* <ItemRowContainer currentShop={this.state.currentShop}/> */}
          {this.props.selectedShop ?
            <>
              <Bio selectedShop={this.props.selectedShop}/>
              <ItemRowContainer shops={this.props.shops} filteredItemArray={filteredItemArray} 
                addNewInventoryItem={this.props.addNewInventoryItem} removeInventoryItem={this.removeInventoryItem}
                updateItemPlotMagicalInState={this.props.updateItemPlotMagicalInState}
              />
            </>
          :<p>page loading</p> }
        </main>
      )
    }
}

export default MerchandisePage