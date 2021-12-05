import React, { Component } from 'react'


class SellForm extends  Component {
constructor(props){
    super(props)
    this.state = {
        output: "0"
    }
}

render() {
    
    return  (
        <form className = "mb-4" onSubmit = {(event) => {
            event.preventDefault()
            let ethAmount
            //Calcuate Amount Of Ether We Want To Buy 
            ethAmount = this.input.value.toString()
            ethAmount = ethAmount; 
            this.props.sellTokens(ethAmount)
            console.log("Purchasing Tokens...")
        }}> 
          <div>
              <label className = "float-left"><p>Input</p></label>
              <span className = "float-right text-muted">
                  Balance: {this.props.tokenBalance}
                  </span>
          </div>

          <div className = "input-group mb-4">
              <input
              type ="text"
               onChange = {(event) => {
                   console.log("changing...")
                   const tokenAmount = this.input.value.toString()
                   this.setState({
                       output: tokenAmount / 100
                   })
               }}

              ref = {(input) => { this.input = input}}
              className = "form-control form-control-lg"
              placeholder = "0"
              required />
              <div className = "input-group-append">
                  <div className = "input-group-text"> 
                  <img src = "" height = "22" alt = ""/>
                  &nbsp;&nbsp;DRM
              </div>
              </div>
          </div>

          <div>
              <label className ="float-left"><p>Output</p></label>
              <span className ="float-right text-muted"> 
              Balance: {this.props.ethBalance}
              </span>
          </div>

          <div className = "input-group mb-2">
              <input
                  type =  "text"
                  className ="form-control form-control-lg"
                  placeholder ="0"
                  value = {this.state.output}
                  disabled />
                  <div className ="input-group-append"> 
                      <div className ="input-group-text"> 
                          <img src ="" height ="32" alt ="" />
                                  &nbsp; ETH
          </div>
      </div>
  </div>

      <div className = "m-5">
          <span className ="float-left text-muted"> Exchage Rate</span>
          <span className ="float-right text-muted"> 100 DRM = 1 ETH</span>
      </div>

      <button type ="submit" className = "btn btn-primary btn-block btn-lg">SWAP!</button>

        </form>
    );
}}



export default SellForm; 