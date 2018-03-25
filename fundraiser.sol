pragma solidity ^0.4.17;

contract Fundraiser {
    struct Project{
        string name;
        address[] backers;
        uint32 votes;
    }

mapping (uint32=>Project) public projects;

function vote(uint32 id) public {
    projects[id].votes +=1;
}
function donate() public  payable{

}
function fund() public constant returns(uint256) {
    return(this.balance);
}
}
