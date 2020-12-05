import React from 'react'
import ShopCardContainer from './ShopCardContainer'
// import Login from './Login'
// import Currency from './Currency'

class ShopSelectPage extends React.Component {

    render () {
      return (
        <main>
          {/* <Currency shop={this.props.shops[0]}/>           */}
          <ShopCardContainer shops={this.props.shops} />
        </main>
      )
    }
}

export default ShopSelectPage