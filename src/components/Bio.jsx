import React from 'react'

class Bio extends React.Component{

    render() {
      console.log(this.props)
      return(
        <p>{this.props.selectedShop.bio}</p>
      )
    }
}

export default Bio