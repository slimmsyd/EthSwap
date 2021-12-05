import React, { Component } from 'react'


class Form extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            output: "0"
        }
    }
    
    render() {
    
        return  (
            <form className = "mb-3" onSubmit = {(event) => {
                event.preventDefault()
                //Calcuate Amount Of Ether We Want To Buy 
                let etherAmount = this.input.value.toString()
                etherAmount = etherAmount; 
                this.props.buyTokens(etherAmount)
                console.log("Purchasing Tokens...")
            }}> 
              <div>
                  <label className = "float-left"><p>Input</p></label>
                  <span className = "float-right text-muted">
                      Balance: {this.props.ethBalance}
                      </span>
              </div>

              <div className = "input-group mb-4">
                  <input
                  type ="text"
                   onChange = {(event) => {
                       console.log("changing...")
                       const etherAmount = this.input.value.toString()
                       this.setState({
                           output: etherAmount * 100
                       })
                   }}

                  ref = {(input) => { this.input = input}}
                  className = "form-control form-control-lg"
                  placeholder = "0"
                  required />
                  <div className = "input-group-append">
                      <div className = "input-group-text"> 
                      <img src = "" height = "22" alt = ""/>
                      &nbsp;&nbsp;Eth
                  </div>
                  </div>
              </div>

              <div>
                  <label className ="float-left"><p>Output</p></label>
                  <span className ="float-right text-muted"> 
                  Balance: {this.props.tokenBalance}
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
                                      &nbsp; DRM
              </div>
          </div>
      </div>

          <div className = "m-5">
              <span className ="float-left text-muted"> Exchage Rate</span>
              <span className ="float-right text-muted"> 1 ETH = 100 DRM</span>
          </div>

          <button type ="submit" className = "btn btn-primary btn-block btn-lg">SWAP!</button>

            </form>
        );
    }
    }
    
    export default Form; 