var web3 = new Web3(Web3.givenProvider);

var instance;
var user;

var contractAddress="0x911Dc9A7c407922A769676F7A7C1Ad3fC8ec8b57";




$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        //user is an address of the person that is using the wallet once the page connects to the metamask
        user = accounts[0];

        console.log(instance);

        instance.events.Birth().on(`data`, function(event){
            console.log(event);
            
            let cardType =events.returnValues.cardType;
            let capacity =events.returnValues.capacity;
            let owner =events.returnValues.owner;
            $().css("display", "block");
            $().text("cardType:"+cardType
                    +"capacity:"+capacity
                    +"owner:"+owner
            
                        
        })
    })  
})    