import React from 'react'
// import ShopCard from './ShopCard'
// import CoverEffect from './CoverEffect'
import {NavLink} from 'react-router-dom'


const ShopCardContainer = (props) => {    

    let shopCards = props.shops.map(shop =>
      <NavLink 
      key={shop.id}
      to={`/shops/${shop.id}`} >
        <div className={`card ${shop.name}`} > 
          <div className="decorative">
            <div className="top">
              <div className="border">
                <img src={shop.image} alt={shop.name} />
              </div>
              {/* <div className="id">
                <h4>{shop.id}</h4>
              </div> */}
              <div className="name">
                <h3>{shop.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    )
    return(
      <section>
        <h2>Shops of Barovia</h2>
        <div className="cards">
          {shopCards}
        </div>
      </section>
    )

}

export default ShopCardContainer