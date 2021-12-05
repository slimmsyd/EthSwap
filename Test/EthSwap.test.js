const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require("Token"); 
const EthSwap =  artifacts.require("EthSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

//Convert Tokens to Human readable
function tokens(n)  { 
    return web3.utils.toWei(n, 'ether',); 

}


contract("EthSwap", ([deployer, investor]) => { 
    let token, ethSwap

    before(async () => { 
         token = await Token.new(); 
         ethSwap = await EthSwap.new(token.address); //Applies the constructor to make contract aware of the Token Address

        //Transfer all Tokens to EthSwap (1 Million)
        await token.transfer(ethSwap.address, tokens('1000000')) 
    })

    describe("Token deployment", async () => { 
        it("Contract has a name", async () => { 
            const name = await token.name(); 
            assert.equal(name, "Dream Token")
        })
    })
    
    //Deploy EthSwap
    describe("EthSwap deployment", async () => { 
        it("Contract has a name", async () => { 
            const name = await ethSwap.name()
            assert.equal(name, 'EthSwap Instant Exchange')
        })
    })

    it('contract has tokens', async () => { 
        let balance = await token.balanceOf(ethSwap.address)
        assert.equal(balance.toString(),  tokens('1000000'))



    })

    describe("buy tokens", async () => { 
        let result

        before(async () => { 
            //Purchase Tokens before each example 
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei("1", 'ether')})

        })

        it("Allows to instantly purchase tokens from ethSwap for a fixed price", async() => { 
            //Check Investor Recieved Tokens
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens("100"))

            //Check EthSwap Balance after purchase
            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('999900'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "ether"))

        //Check Logs to Ensure event was emitted with correct data

           const event = result.logs[0].args;
           assert.equal(event.account, investor)
           assert.equal(event.token, token.address)
           assert.equal(event.amount.toString(), tokens('100').toString())
           assert.equal(event.rate.toString(), "100")

        })
    })


    describe('sellTokens', async () => { 
        let result
        
        before(async () => { 
            //Investor Must Improve The Purchase ---> 2 STEP PROCESS
            await token.approve(ethSwap.address, tokens('100'), {from: investor})
            //Investor Sells Tokens 
            result = await ethSwap.sellTokens(tokens("100"), {from: investor})
            
        })

        it("Allows user to instantly sell tokesn to ethSwap for a fixed price", async () => {

            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens("0"))

            let ethSwapBalance
            ethSwapBalance = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('1000000'))

            ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei("0", "ether"))


            //Check Logs to Ensure event was emitted with correct data
           const event = result.logs[0].args;
           assert.equal(event.account, investor)
           assert.equal(event.token, token.address)
           assert.equal(event.amount.toString(), tokens('100').toString())
           assert.equal(event.rate.toString(), "100")


           //FAILURE: Investor Can't Sell More Tokens Then They Have

           await ethSwap.sellTokens(tokens('500'), {from: investor}).should.be.rejected;

        })


    })
})