import React from 'react'
import ShopSelectPage from './ShopSelectPage'
import MerchandisePage from './MerchandisePage'
import NotFound from './NotFound'
import Header from './Header'
import {Route, Switch} from 'react-router-dom'
import Currency from './Currency'
import AllItemsPage from './AllItemsPage'

class ShopParent extends React.Component {

    state = {
      shops: [],
      inventory_items: [],
      allItems: []
    }



    componentDidMount() {

      fetch("http://localhost:3000/shops/")
      .then(res => res.json())
      .then(arrayOfShops => {
        this.setState({
          shops: arrayOfShops
        }) 
      })
      fetch("http://localhost:3000/inventory_items")
      .then(res => res.json())
      .then(arrayOfInventoryItems => {
        this.setState({
          inventory_items: arrayOfInventoryItems
        })
      })
      fetch("http://localhost:3000/items")
      .then(res => res.json())
      .then(arrayOfItems => {
        this.setState({
          allItems: arrayOfItems
        })
      })
    }    

    // updateShopInState is a helper method used at the bottom of addNewInventoryItem()
    updateShopInState = (copyOfShop) => {
      let copyOfShops = this.state.shops.map(shop => {
        if(shop.id === copyOfShop.id){
          return copyOfShop
        } else {
          return shop
        }
      })  
      this.setState({
        shops: copyOfShops
      })
    }

    addNewInventoryItem = (recipientId, selectedItem) => {    
      console.log(selectedItem)
      let selectedItemId = selectedItem.id
      fetch("http://localhost:3000/inventory_items", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          shop_id: recipientId,
          item_id: selectedItemId
        })
      })
      .then(res => res.json())
      .then(shopInInventory => {
        this.updateShopInState(shopInInventory)
      })
    }


    filterSelectedShopItemsForState = (selectedItemId, selectedShop) => {
      
      let copyOfSelectedShop = selectedShop
      let selectedItem = copyOfSelectedShop.items.find(item => {
        return item.id === selectedItemId
      })
      let indexOfSelectedItem = copyOfSelectedShop.items.indexOf(selectedItem)
      // console.log(indexOfSelectedItem)
      copyOfSelectedShop.items.splice(indexOfSelectedItem, 1)

      let shopsAfterDeleteOfAShopItem = this.state.shops.map(shop => {
        if(shop.id === selectedShop.id){
          return copyOfSelectedShop
        } else {
          return shop
        }
      })
      this.setState({
        shops: shopsAfterDeleteOfAShopItem
      })
    }

    filterAllItemsForStateAfterDelete = (selectedItemId) => {
      console.log(selectedItemId)
      let allItems = this.state.allItems
      console.log( allItems.find(item => {
        return item.id = parseInt(selectedItemId)
        })
      )
      let itemBeingDeleted = allItems.find(item => {
        return item.id = parseInt(selectedItemId)
      })
      console.log(itemBeingDeleted)
      let indexOfItemToDelete = allItems.indexOf(itemBeingDeleted)
      // console.log(indexOfItemToDelete)
      let copyOfAllItems = allItems
      copyOfAllItems.splice(indexOfItemToDelete, 1)
      this.setState({
        allItems: copyOfAllItems
      })
    }
    
    addAllItemsTableRow = (newAllItemsTableRow) => {
      let updatedAllItems = [...this.state.allItems, newAllItemsTableRow]
      this.setState({
        allItems: updatedAllItems
      })
    }

    updateItemPlotMagicalInState = (updatedItem) => {
      // let copyOfUpdatedItem = this.state.allItems.find(item => {
      //   if(item.id === updatedItem.id) {
      //     return item
      //   }
      // })
      // let copyOfUpdatedItem = updatedItem
      // console.log(updatedItem)
      let updatedAllItems = this.state.allItems.map(item => {
        if (item.id === updatedItem.id) {
          return updatedItem
        } else {
          return item
        }
      })
      this.setState({
        allItems: updatedAllItems
      })
      console.log(this.state.allItems)

    }

    updateCurrencyAmount = (currencyName, newCurrencyAmount) => {

    }

    renderSelectedShop = (routerProps) => {
      if(routerProps.match.params.id){
          let selectedShopId = routerProps.match.params.id
          let selectedShop = this.state.shops.find(shop => shop.id === parseInt(selectedShopId))
          let party = this.state.shops.find(shop => shop.id === 1)
          return <MerchandisePage shops={this.state.shops} 
          selectedShop={selectedShop} 
          party={party} 
          inventory_items={this.state.inventory_items} addNewInventoryItem={this.addNewInventoryItem} filterSelectedShopItemsForState={this.filterSelectedShopItemsForState} updateItemPlotMagicalInState={this.updateItemPlotMagicalInState} />
      }
    }


    render() {
      let playerParty = this.state.shops.find(shop => {
        if(shop.name === "The Party"){
          return shop
        }
      })
      return (
        <div className="App">
          <header className="App-header">
            <Header />
            <Currency shop={playerParty} />
          </header>

          <main>
            <Switch>

              <Route path="/" exact> <ShopSelectPage shops={this.state.shops} /> </Route>
              <Route path="/shops/:id" exact render={this.renderSelectedShop} />
              <Route path="/items" exact> <AllItemsPage items={this.state.allItems} shops={this.state.shops} addAllItemsTableRow={this.addAllItemsTableRow} 
                addNewInventoryItem={this.addNewInventoryItem} filterAllItemsForStateAfterDelete={this.filterAllItemsForStateAfterDelete} updateItemPlotMagicalInState={this.updateItemPlotMagicalInState}/>
              </Route>
              <Route component={NotFound} />

            </Switch>
          </main>
        </div>
      )
    }

}

export default ShopParent