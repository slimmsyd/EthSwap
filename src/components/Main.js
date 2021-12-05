import React, { Component } from 'react'
import Web3 from 'web3';
import BuyForm from './BuyForm.js'
import SellForm from './SellForm.js'
class Main extends Component { 

constructor(props) {
    super(props)
    this.state = {
        currentForm: "sell"
    }
}

render() {


    //Check To See What Current form UI is is placed on.
    let content; 
    if(this.state.currentForm === "buy") {
        content = <BuyForm
        ethBalance = {this.props.ethBalance}
        tokenBalance = {this.props.tokenBalance}
        buyTokens = {this.props.buyTokens}
        />
    }else {content = <SellForm
        ethBalance = {this.props.ethBalance}
        tokenBalance = {this.props.tokenBalance}
        sellTokens = {this.props.sellTokens}
        />
    }
        return  (
      <div id = "content">

            <div className = "d-flex justify-content-between mb-3">
                <button className = "btn btn-light"
                onClick = {(event) => { 
                    this.setState({currentForm: 'buy'})
                }}
                >
                    Buy
                </button>
                <span className = "text-muted">&lt; &nbsp; &gt;</span>
                <button className= "btn btn-light"
                 onClick = {(event) => { 
                    this.setState({currentForm: 'sell'})

                }}>
                    Sell
                </button>
            </div>

          <div className = "card mb-4">
                {content}
            
          </div>
          <h1> Welcome To Dream Swap</h1>
       
      </div>
    );
}
}

export default Main; 