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
      let itemIndexToDelete = selectedItemId - 1
      let editedSelectedShop = selectedShop.items.splice(itemIndexToDelete, 1)

      let shopsAfterDeleteOfAShopItem = this.state.shops.map(shop => {
        if(shop.id === selectedShop.id){
          return editedSelectedShop
        } else {
          return shop
        }
      })
      this.setState({
        shops: shopsAfterDeleteOfAShopItem
      })
    }

    filterAllItemsForStateAfterDelete = (selectedItemId) => {
      let indexOfItemToDelete = selectedItemId - 1
      let newAllItems = this.state.allItems.splice(indexOfItemToDelete, 1)
      this.setState({
        allItems: newAllItems
      })
    }

    renderSelectedShop = (routerProps) => {
      if(routerProps.match.params.id){
          let selectedShopId = routerProps.match.params.id
          let selectedShop = this.state.shops.find(shop => shop.id === parseInt(selectedShopId))
          let party = this.state.shops.find(shop => shop.id === 1)
          return <MerchandisePage shops={this.state.shops} 
          selectedShop={selectedShop} 
          party={party} 
          inventory_items={this.state.inventory_items} addNewInventoryItem={this.addNewInventoryItem} filterSelectedShopItemsForState={this.filterSelectedShopItemsForState}
          />
          // return <p>hello</p>
      }
    }
    
    addAllItemsTableRow = (newAllItemsTableRow) => {
      let updatedAllItems = [...this.state.allItems, newAllItemsTableRow]
      this.setState({
        allItems: updatedAllItems
      })
    }

    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <Header />
          </header>

          <main>
            <Currency shops={this.state.shops}/>
            <Switch>

              <Route path="/" exact> <ShopSelectPage shops={this.state.shops} /> </Route>
              <Route path="/shops/:id" exact render={this.renderSelectedShop} />
              <Route path="/items" exact> <AllItemsPage items={this.state.allItems} shops={this.state.shops} addAllItemsTableRow={this.addAllItemsTableRow} addNewInventoryItem={this.addNewInventoryItem} filterAllItemsForStateAfterDelete={this.filterAllItemsForStateAfterDelete}/></Route>
              <Route component={NotFound} />

            </Switch>
          </main>
        </div>
      )
    }

}

export default ShopParent