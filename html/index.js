var web3 = new Web3(Web3.givenProvider);

var instance;
var user;

var contractAddress="0x441981488b1bec20f63485D5b224B38337DD8E17";

const cardAttributes=[
    {collection:0, cardType:1, url:"./leaders/bismark.png"},
    {collection:0, cardType:2, url:"./leaders/bloodyMarry.png"},
    {collection:1, cardType:4, url:"./witches/aronova.jpg"},
    {collection:1, cardType:5, url:"./witches/belik.jpg"},
    {collection:1, cardType:6, url:"./witches/chechneva.jpg"},
    {collection:2, cardType:7, url:"./spies/hall.png"},
    {collection:2, cardType:8, url:"./spies/kyznetsov.png"},
    
    ];


const attributesToForge=[
    {collection:0, cardType:3, url:"./leaders/carolusRex.png"},
    {collection:2, cardType:9, url:"./spies/morros.png"},
    ];
    


    // $("#sellACat").click(function () {
    //     //$(`#hide${idForSale}`).show();
    //     //this puts all the cats back into the modul
    //     idForSale=null;
    //     $("#catForBuy").addClass("hidden");
    //     $("#catForSale").removeClass("hidden");
    //     $("#sell").addClass("hidden");
    //     $("#pik").addClass("hidden");
    //     $(`#onSaleCats`).empty();
    //     $(`#catForSale`).empty();
    //     $(`#catForSale`).append(`<input type="image"  src="./sell.jpg" />`);
    //     $("#buyButton").addClass("hidden");
    //     $("#pikBuy").addClass("hidden");
    //     $("#pikBuy1").addClass("hidden");
    //     $("#goBack").addClass("hidden");
    //   });
      
    //   $("#buyACat").click(function () {
    //     $("#catForSale").addClass("hidden");
    //     $("#catForBuy").removeClass("hidden");
    //     $("#pik").addClass("hidden");
    //     $("#sell").addClass("hidden"); 
    //   });



$(document).ready(function(){
    window.ethereum.enable().then(function(accounts) {
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
        //user is an address of the person that is using the wallet once the page connects to the metamask
        user = accounts[0];

        console.log(instance);
    
            instance.events.cardCreated().on(`data`, function(event){
            console.log(event);
            
            let cardType =events.returnValues.cardType;
            let collection =events.returnValues.collection;
            let owner =events.returnValues.owner
            $("#maninEvent").css("display", "block");
            $("#maninEvent").text("collection:"+collection
                    +"cardType:"+cardType
                    +"owner:"+owner)
            })         
            
            .on('error', console.error);

    })  
    
})    
    //    "My Collection" Button
$("#buttonCollection").click(function () {
         
         $("#ForgeCardDiv").hide();
         $("#destroyerDestroyed").hide();
         $("#allCollectionsDiv").hide();
         $("#buttonMyCards").removeClass("hidden");
         $("#buttonDestroy").removeClass("hidden");
          $("#buttonForge").removeClass("hidden");
          $("#sellButton").hide();
          $("#buyButton").hide(); 
           
       });
    //  Button "Buy or Sell"
$("#buttonBuySell").click(function () {
        $("#allCollectionsDiv").hide();
        $("#buttonMyCards").addClass("hidden");
        $("#buttonDestroy").addClass("hidden");
         $("#buttonForge").addClass("hidden");
         $("#sellButton").show();
          $("#buyButton").show(); 
          $("#destroyerDestroyed").hide();
             

      });

    //   "My Cards" Button
$("#buttonMyCards").click(function () {
        
    $("#buttonDestroy").addClass("hidden");
    $("#buttonForge").addClass("hidden"); 
    $("#buttonMyCards").addClass("hidden");
    $("#allCollectionsDiv").show();
      }); 


        //  "Destroy a Card" button
$("#buttonDestroy").click(function () {
        
        $("#buttonMyCards").addClass("hidden");
        $("#buttonForge").addClass("hidden");
        $("#buttonDestroy").addClass("hidden"); 
        $("#destroyerDestroyed").show();
          });      

        //   "Forge a Card" Button
$("#buttonForge").click(function () {
        
            $("#buttonDestroy").addClass("hidden");
            $("#buttonMyCards").addClass("hidden"); 
            $("#buttonForge").addClass("hidden");
            $("#ForgeCardDiv").show();
              });      

            //   "SELL" button
$("#sellButton").click(function () {
        
          $("#sellButton").hide();
          $("#buyButton").hide(); 
      });

    //   "BUY" Button
$("#buyButton").click(function () {
        
          $("#buyButton").hide();
          $("#sellButton").hide(); 
      });




function createCardJs(){
        var x=[];
        var y =[];
    for(i=0; i<cardAttributes.length; i++){
        x.push(cardAttributes[i].collection);
        y.push(cardAttributes[i].cardType);
    }
    instance.methods.mintAll(x,y).send({}, function(error, txHash){
        if(error)
        console.log(error);
        else{
            console.log(txHash)
        }    
    });
}

async function getCards(){
    var arrayId;
    var card;
    try{
        arrayId=await instance.methods.getCardByOwner(user).call();
    } catch(err){
        console.log(err);
    }

    for(i=0; i<arrayId.length; i++){
        card= await instance.methods.getCard(arrayId[i]).call();
        appendCard(card.cardType);
    }
    console.log(card);
}

function appendCard(cardType=2){
    if(cardType==cardAttributes[i].cardType){
        url==cardAttributes[i].url;

    cardDiv=`
    <div onclick="window.location.href='cardInfo.html';"  style="cursor: pointer" class="cardLeaders">
    <img type="image" id="bismark" src=`+url+` />
    </div>`
    $("#stas").append(cardDiv);
    }

    if(cardType==attributesToForge[i].cardType){
        url==attributesToForge[i].url;

    cardDiv=`
    <div onclick="window.location.href='cardInfo.html';"  style="cursor: pointer" class="cardLeaders">
    <img type="image" id="bismark" src=`+url+` />
    </div>`
    $("#stas").append(cardDiv);
    }
}


    
cardAttributes = {
    "1":{collection:0, url:"./leaders/bismark.png"},
    "2":{collection:0, url:"./leaders/bloodyMarry.png"},
    etc...
  }