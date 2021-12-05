import React, { Component, useEffect } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import { render } from 'react-dom';
import Navbar from './Navbar';
import Main from './Main';
import Token from '../abis/Token.json';
import EthSwap from '../abis/EthSwap.json';

 
class App extends Component {


  componentDidMount = async () => { 
    try { 
      //Initates Web3 - Gets Browser Detected To MetaMask Provider
      let web3; 
      if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3()) { 
        web3 = new Web3(window.web3.currentProvider)
      } else { window.alert("Non-Eth browser detected! You should Consider using MetamMask!")

      }

      //Get Web3 Accounts 

      const accounts = await window.ethereum.selectedAddress;
      this.setState({account: accounts})
      const ethBalance = await web3.eth.getBalance(this.state.account)
      this.setState({ethBalance})


      

      //Load Token
      const networkId = await web3.eth.net.getId() //{get.Id} Makes  The Network Dynamic Not Fixed  //Alternative was {Token.Network[5777]}
      const tokenData = Token.networks[networkId]

      //Check To See If Token Exist, If So Proceed
      if(tokenData) { 
        const token = new web3.eth.Contract(Token.abi, tokenData.address)
        this.setState({token})
        //Get The TokenBalance of User Connected, Different From Earlier When Getting The Eth Balance
        let tokenBalance = await token.methods.balanceOf(this.state.account).call() //Have to Do .call() when fetch Info From BlockChain
        console.log("tokenBalance is ",  tokenBalance.toString())
        this.setState({tokenBalance: tokenBalance.toString()})
      } else { 
        window.alert("Token Contract Not Deployed To Detected Network")
      }


      //Load EthSwap
      const ethSwapData = EthSwap.networks[networkId]
      if(ethSwapData) { 
        const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
        this.setState({ethSwap})
      }else {window.alert("EthSwap Contract Not Deployed To Detected Network ")}


      //Loading Will Update Dynamically 
      this.setState({loading: false})

    } catch(err) {
      console.log(err)
    }
  }


  //Load Smart Contracts 

//SetUp Buying Tokens Functionality 
  buyTokens = (etherAmount) => { 
    this.setState({loading: true})
    this.state.ethSwap.methods.buyTokens().send({value: etherAmount , from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading: false})
    }); //Send Method Initiates The Transactions On Blockchain
  }

    sellTokens =  (tokenAmount) => { 
    const ethSwapData = EthSwap.networks["5777"]
    const ethSwapAddress = ethSwapData.address
    this.setState({loading: true})
    //Approve The Sell First
    this.state.token.methods.approve(ethSwapAddress, tokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) => {
      //Then Allow TokenSwap To Sell Your Tokens
      this.state.ethSwap.methods.sellTokens(tokenAmount).send({from: this.state.account}).on('transactionHash' , (hash) => {
        this.setState({loading: false})
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '' ,
      ethBalance: "0",
      token : {},
      tokenBalance: "0",
      ethSwap: {},
      loading: true
    }

  }



  render() {

    //Decide If Loading is Fixed Or Dynamic 
    let content; 
    if(this.state.loading) { 
      content = <p id = "loader" className ="text-center">loading.... </p>
    }else { content = <Main 
      ethBalance = {this.state.ethBalance} 
      tokenBalance = {this.state.tokenBalance} 
      buyTokens = {this.buyTokens}
      sellTokens = {this.sellTokens}
      /> }  


    return  (
      <div>
        <Navbar account = {this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12  text-center ml-auto mr-auto" style = {{maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="https://sydneysanders.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
                
              </div>
            </main>
          </div>
        </div>
      </div>
    );
}
}


export default App;
