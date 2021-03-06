import React from 'react'

class Currency extends React.Component{

    
    state = {
      userTypedRoses: 0,
      userTypedElectrum: 0
    }

    componentDidMount() {
      if(this.props?.shop?.length > 0){
        this.setState({
          userTypedRoses: this.props.shop.roses,
          userTypedElectrum: this.props.shop.electrum
        })
      } else {
        this.setState({
          userTypedRoses: 0,
          userTypedElectrum: 0
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(this.props.shop !== prevProps.shop) {
        this.setState({
          userTypedRoses: this.props.shop.roses,
          userTypedElectrum: this.props.shop.electrum
        })
      }
    }

    handleQuantityChange = (evt) => {
      const inputName = evt.currentTarget.name;
      const inputText = evt.currentTarget.value;
      this.setState({
        [inputName]: inputText,
      });
    };

    handleSubmit = (evt) => {
      evt.preventDefault()
      let currencyType
      let newCurrencyAmount
      if (evt.currentTarget.userTypedRoses) {
        newCurrencyAmount = parseInt(this.state.userTypedRoses)
        currencyType = "roses"
      } else {
        newCurrencyAmount = parseInt(this.state.userTypedElectrum)
        currencyType = "electrum"
      }
      fetch(`http://localhost:3000/shops/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          [currencyType]: [newCurrencyAmount]
        })
      })
      .then(res => res.json())
      .then(updatedShop => {
        // console.log(updatedShop)

      })
      
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //   console.log(this.props.shop !== nextProps.shop)
    //   return this.props.shop !== nextProps.shop
    // }



    render(){
      return(
        <div>
          
          <div>
            <img className="picOfCurrency" src="https://i.etsystatic.com/7380805/r/il/a58ffe/769169221/il_570xN.769169221_rqo9.jpg" 
              alt="Copper Gold"/>
              Roses:  
                      {/* <p>{this.props.shop.roses}</p> */}
                      <form className="update integer form" onSubmit={this.handleSubmit}>
                        <input type="number" name="userTypedRoses" placeholder={this.state.userTypedRoses} value={this.state.userTypedRoses} step={1} onChange={this.handleQuantityChange}/>
                        <input className="ui button" type="submit" button={"roses"} value={"💲"} />
                      </form>
          </div>
          
          <div>
            <img className="picOfCurrency" src="data:image/jpeg;base64,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" 
              alt="Silver Gold" />  
              Electrum: 
                        {/* <p>{this.props.shop.electrum}</p> */}
                        <form className="update integer form" onSubmit={this.handleSubmit}>
                          <input type="number" name="userTypedElectrum" placeholder={this.state.userTypedElectrum} value={this.state.userTypedElectrum} step={1} onChange={this.handleQuantityChange}/>
                          <button className="ui button" type="submit" name={"electrum"}>
                            💲
                          </button>
                        </form> 
          </div>
        </div>
      )
    }
}

export default Currency