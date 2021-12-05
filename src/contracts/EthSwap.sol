pragma solidity >=0.4.21 <0.6.0;
import './Token.sol';

contract EthSwap { 
    string public name = "EthSwap Instant Exchange"; 
    //Create a Var, represending the token contract
    Token public token;
    uint public rate = 100; 

    event TokenPurchased( 
        address account,
        address token,
        uint amount,
        uint rate
    );


    event TokensSold (
        address account, 
        address token,
        uint amount,
        uint rate
    );

   //BUY TOKENS FUNCTIONALITY 

    constructor(Token _token) public { 
        token = _token; 
    }

    function buyTokens() public payable { 
        //Calcuate the # of tokens to buy 
        uint tokenAmount = msg.value * rate;

        //Transfer Tokens to the Users {msg.sender === The Person Calling Function(who we are sending it to)}
        token.transfer(msg.sender, tokenAmount );

        //Require Eth Sqp has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount); // This === EthSwp Adderss
          //Emit a Event 

        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
        //{_amount} === # of Tokens User Is Selling
    function sellTokens(uint _amount) public payable {
        //User Can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        //Cacluate the Amount of Ether to redeem
        
        uint etherAmount = _amount / rate; 

        //Require that EthSwap has enough ether 
        require(address(this).balance >= etherAmount);

        //Perform Sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount); 

        //Emit A Event 

        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
  

}




