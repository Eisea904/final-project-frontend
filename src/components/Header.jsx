import React from 'react'
// import Currency from './Currency'
import {NavLink} from 'react-router-dom'

class Header extends React.Component{

    render(){
        let linkPartyInventory = <NavLink key={"linkPartyInventory"} to={`/shops/1`}> Party Inventory </NavLink>
        let linkShopSelectPage = <NavLink key={"linkShopSelectPage"} to={`/`}> Home </NavLink>
        let linkAllItemsPage = <NavLink key={"linkAllItemsPage"} to={`/items`}> Items </NavLink>

        return (
          <div>
            <header>
              {/* <Currency shop={this.props.playerParty}/>  */}
              <h4 className="header links">{linkShopSelectPage}</h4>
              <h4 className="header links">{linkAllItemsPage}</h4>
              <h4 className="header links">{linkPartyInventory}</h4>
              <h1>Welcome to Barovia</h1>
            </header>
          </div>
      )
    }
}

export default Header