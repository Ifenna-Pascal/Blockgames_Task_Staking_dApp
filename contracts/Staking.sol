//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./token.sol";

contract Staking is IFTToken, Ownable, SafeMath {
    address [] public stakers;
     using SafeMath for uint256;
    address private owner;
    IFTToken  IfTtoken;
    mapping (address => uint ) public stakingBalance;
    mapping (address => bool) public hasStaked;
    mapping (address => uint) public rewards;
    

    constructor (IFTToken _ifttoken) public {
        owner = msg.sender;
        iftToken = _ifttoken;
        IFTToken.transfer(msg.sender, 1000)
    }

    function StakeToken (uint _amount)  public {
        require( _amount > 0; "account must be greater than 0")
        iftToken.transferFrom(msg.sender, address(this), amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        hasStaked[msg.sender] = true;
        stakers.push(msg.sender)
    }


    function UnstakeToken ( uint _amount) public {
        uint balance = stakingBalance[msg.sender];
        require(balance > _amount, "Insufficient Balance");
        stakingBalance[msg.sender] = stakingBalance[msg.sender] - _amount;
        if(stakingBalance[msg.sender] == 0) {
            hasStaked[msg.sender] = false;
        }
        iftToken.transfer(msg.sender, _amount);
     };

    function calculateReward(address _stakeholder)
       public
       view
       returns(uint256)
   {
       return stakingBalance[_stakeholder] / 100;
   }

        /**
    * @notice A method to distribute rewards to all stakers.
    */
   function distributeRewards()
       public
       onlyOwner
   {
       for (uint256 s = 0; s < stakers.length; s += 1){
           address stakeholder = stakers[s];
           uint256 reward = calculateReward(stakeholder);
           rewards[stakeholder] = rewards[stakeholder] + reward;
       }
   }

   function WithdrawToken () public {
       public
   {
       uint256 reward = rewards[msg.sender];
       rewards[msg.sender] = 0;
        iftToken.transfer(msg.sender, reward)
   }

}


}