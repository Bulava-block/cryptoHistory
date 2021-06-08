var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress="0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";


const cardAttributes=[
    {collection:0, cardType:1, url:"./leaders/bismark.png"},
    {collection:0, cardType:2, url:"./leaders/bloodyMarry.png"},
    {collection:0, cardType:3, url:"./leaders/carolusRex.png"},
    {collection:1, cardType:4, url:"./witches/aronova.jpg"},
    {collection:1, cardType:5, url:"./witches/belik.jpg"},
    {collection:1, cardType:6, url:"./witches/chechneva.jpg"},
    {collection:2, cardType:7, url:"./spies/hall.png"},
    {collection:2, cardType:8, url:"./spies/kyznetsov.png"},
    {collection:2, cardType:9, url:"./spies/morros.png"},
    
];
 const trial=[2, 2, 4, 1];
 const collection=[0, 0, 0, 1, 1, 1, 2, 2, 2];
 const cardType=[1, 2, 3, 4, 5, 6, 7, 8, 9];
 const url=["./leaders/bismark.png",
            "./leaders/bloodyMarry.png",
            "./leaders/carolusRex.png",
            "./witches/aronova.jpg",
            "./witches/belik.jpg",
            "./witches/chechneva.jpg",
            "./spies/hall.png",
            "./spies/kyznetsov.png",
            "./spies/morros.png"
          ];




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
          $("#card1").hide();
          $("#card2").hide();
          $("#destroyCard").hide();
             

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
          $("#allCollectionsDiv").show();
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
    var arrayId=[];
    var card;
    var allCards=[];
    
    try{
        arrayId=await instance.methods.getCardByOwner().call();
    } catch(err){
        console.log(err);
    }
      console.log("nomera kart", arrayId);
    for(i=0; i<arrayId.length; i++){
      
      
    card= await instance.methods.getCard(arrayId[i]).call();
     
    allCards.push(card.cardType);    
       
    } 
       
    
       allCards.forEach((item, index)=>{
         id=arrayId[index];
          
        appendCard(item, id);
      

      });
     
}
      
    

  
  

function appendCard(x, id){
   console.log("cardTYPE", x, id)

  var urlVar;
  var idDiv;
  var col;
  
   
  for(i=0; i<cardType.length; i++){
      
     if(cardType[i]==x){
       urlVar=url[i];
       col=collection[i];
       console.log("cardType to Show", x);
       console.log("url to Show", urlVar);
       console.log("sol to Show", col);
        if(col==0){
          idDiv="#lead";
           console.log("lead", idDiv);
      }
        if(col==1){
          idDiv="#witches";
        console.log("witches", idDiv);
      }
       if(col==2){
        idDiv="#spies";
      console.log("spies", idDiv);
       }
       
       cardDiv=`
      <div id="hide${id}" >
     <div style="cursor: pointer" class="cardLeaders">
     <img type="image" onclick=selectToCharge(`+id+`) id="bismark" src=`+urlVar+` />
     </div>
     </div>`
     $(idDiv).append(cardDiv);
     $("#sosok").append(cardDiv);
           
     }  
    
  }
}
  // onclick="window.location.href='cardInfo.html';"
    
    



  
  var key1;
  var key2;
  var cardToCharge;
  var selectingKey1 = false;
  var selectingKey2 = false;
  var selectingCardToForge = false;

  //when you click on key1 card
$("#buttonCard1").click(function () {
  selectingKey1 = true;
  selectingKey2 = false;
  $("#exampleModal").modal("show");
  // this hides current card or image key1 from the modul
  //$(`#hide${key1}`).hide();
    
  //this hides current key2 cat from the modul
  //$(`#hide${key2}`).hide();
});

$("#buttonCard2").click(function () {
  selectingKey2 = true;
  selectingKey1 = false;
  $("#exampleModal").modal("show");
  //$(`#hide${key2}`).hide();
  //$(`#hide${key1}`).hide();

});


$("#cardToForge").click(function () {
  selectingKey2 = false;
  selectingKey1 = false;
  selectingCardToForge = true;
  $("#exampleModal").modal("show");
  //$(`#hide${key2}`).hide();
  //$(`#hide${key1}`).hide();

});



   function selectToCharge(id){
    
     
      // we click mom(left) egg
      if (selectingKey1) {
        
        key1 = id;
        console.log("KEY1", key1);

        // remove the previous  card if there was any
        $(`#buttonCard1`).empty();
        // append a new card
        
        //$(`#buttonCard1`).append(appendCardWithId(id));
        appendCardWithId(id);
        
        
        //close the module
        $("#exampleModal").modal("hide");
        // the numbers that are below the cats picture
        
      }
          //DO THE SAME THING WITH DAD EGG
      if (selectingKey2) {
        $(`#hide${key2}`).show();
        key2 = id;
        console.log("KEY2", key2);
        $(`#buttonCard2`).empty();
        appendCardWithId(id);
      }        
      $("#exampleModal").modal("hide");

      if (selectingCardToForge) {
        $(`#hide${cardToCharge}`).show();
        cardToCharge = id;
        console.log("cardToCharge", cardToCharge);
        $(`#cardToCharge`).empty();
        appendCardWithId(id);
      }        
      $("#exampleModal").modal("hide");
    
  }


  async function appendCardWithId(id){
  
   var urlVar;
      try{
      card=await instance.methods.getCard(id).call();
    }   catch(err){
      console.log(err);
    } 
   for(i=0; i<cardType.length; i++){
       
      if(cardType[i]==card.cardType){
        urlVar=url[i];         
       cardDiv=   
       `<div id="${id}" style="cursor: pointer" class="cardLeaders">
       <img type="image" id="bismark" src=`+urlVar+` />
       </div>`
       console.log(cardDiv)
      
            
      }  
     
   }
   if(selectingKey1){
    $(`#card1`).append(cardDiv)
    console.log(selectingKey1)
   $(`#buttonCard1`).append(cardDiv)
   $(`#destroyer`).append(cardDiv)
  };
   if(selectingKey2){
    $(`#buttonCard2`).append(cardDiv)
    $(`#destroyed`).append(cardDiv)
    $(`#card2`).append(cardDiv)
   };
   if(selectingCardToForge){
    $(`#cardToForge`).append(cardDiv)
    $(`#xxx`).append(cardDiv)
   }
   return cardDiv;
 }


    //  Button charge that gives the charges on the owner's page
 $("#charge").click(function () {
  
  instance.methods.chargeCards(cardToCharge, key1, key2).send({}, function (error, txHash) {
    if (error) console.log(error);
    else {
      console.log(txHash);
     
    }
    
  });
})


$("#card1").click(function () {
  selectingKey1 = true;
  selectingKey2 = false;
  $("#exampleModal").modal("show");
  // this hides current card or image key1 from the modul
  //$(`#hide${key1}`).hide();
    
  //this hides current key2 cat from the modul
  //$(`#hide${key2}`).hide();
});


$("#card2").click(function () {
  selectingKey1 = false;
  selectingKey2 = true;
  $("#exampleModal").modal("show");
  // this hides current card or image key1 from the modul
  //$(`#hide${key1}`).hide();
    
  //this hides current key2 cat from the modul
  //$(`#hide${key2}`).hide();
});

$("#xxx").click(function () {
  selectingKey2 = false;
  selectingKey1 = false;
  selectingCardToForge = true;
  $("#exampleModal").modal("show");
  //$(`#hide${key2}`).hide();
  //$(`#hide${key1}`).hide();

});


$("#destroyer").click(function () {
  selectingKey1 = true;
  selectingKey2 = false;
  $("#exampleModal").modal("show");
  // this hides current card or image key1 from the modul
  //$(`#hide${key1}`).hide();
    
  //this hides current key2 cat from the modul
  //$(`#hide${key2}`).hide();
});

$("#destroyed").click(function () {
  selectingKey2 = true;
  selectingKey1 = false;
  $("#exampleModal").modal("show");
  //$(`#hide${key2}`).hide();
  //$(`#hide${key1}`).hide();

});

    // Destroy Button
$("#destroyCard").click(function () {
  
  instance.methods.destroyCard(key1, key2).send({}, function (error, txHash) {
    if (error) console.log(error);
    else {
      console.log(txHash);
     
    }
    
  });
})

$("#forgeCard").click(function () {
  
  instance.methods.forgeCard(key1, key2).send({}, function (error, txHash) {
    if (error) console.log(error);
    else {
      console.log(txHash);
     
    }
    
  });
})
