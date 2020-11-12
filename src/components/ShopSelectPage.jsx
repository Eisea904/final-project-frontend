import React from 'react'
import ShopCardContainer from './ShopCardContainer'
// import Login from './Login'

class ShopSelectPage extends React.Component {

    // state = {
    //   shops: []
    // }

    // componentDidMount() {
    //   fetch("http://localhost:3000/shops")
    //   .then(res => res.json())
    //   .then(arrayOfShops => {
    //       this.setState({
    //         shops: arrayOfShops
    //       })
    //   })
    // }



    render () {
      return (
        <main>
          <ShopCardContainer shops={this.props.shops} />  {/* collectSelectedShop={this.props.collectSelectedShop} */}
        </main>
      )
    }
}

export default ShopSelectPage