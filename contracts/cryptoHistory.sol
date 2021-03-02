pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract cryptoHistory is ERC721, Ownable {
    constructor() public ERC721("cryptoHistory", "CH") {}

    string public constant _name = "cryptoHistory";
    string public constant _symbol = "CH";
    //maximum of cards with the same name
    uint256 public constant maxForEachCard = 3;

    struct Card {
        uint256 collection;
        uint256 cardType;
        uint8 capacity;
        uint256[] historyOfCards;
        mapping(uint256 => uint256) charges;
    }

    struct cardAttribute {
        uint256 collection;
        uint256 cardType;
    }
    //this array of cards that will be minted
    cardAttribute[] cardAttributes;
    //this is an array of cards that can be crafted
    cardAttribute[] attributesToForge;

    // this is used to give a number to every that is either created or minted
    uint256 totalCards;

    // this assigns a number to a card
    mapping(uint256 => Card) public cards;

    mapping(uint256 => mapping(uint256 => uint256)) public chargesForCards;

    // array of cards that you will get if you forge a card
    uint256[] cardsToForge;

    // this prevents a functon from minting the same cards few times.
    mapping(uint256 => bool) public alreadycreated;

    event cardCreated(uint256 _collection, uint256 _cardType, address owner);

    //this creates a card
    function _createCard(uint256 _collection, uint256 _cardType)
        private
        returns (uint256 x)
    {
        x = totalCards++;

        Card storage _card = cards[x];

        _card.collection = _collection;
        _card.cardType = _cardType;
        _card.capacity = 1;

        return x;
    }

    // this creates all the cards with the same cardType
    function mintCard(uint256 collection, uint256 cardType) public onlyOwner {
        require(alreadycreated[cardType] == false);

        for (uint256 i = 0; i < maxForEachCard; i++) {
            uint256 x = _createCard(collection, cardType);
            _safeMint(msg.sender, x);
        }
        alreadycreated[cardType] = true;
    }

    // this creates all the cards and collections of the current season
    function mintAll(uint256[] memory collections, uint256[] memory cardTypes)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < cardTypes.length; i++) {
            uint256 collection = collections[i];
            uint256 cardType = cardTypes[i];
            mintCard(collection, cardType);
        }
    }

    function getCard(uint256 _Id)
        external
        view
        returns (
            uint256 collection,
            uint256 cardType,
            uint16 capacity
        )
    {
        Card storage card = cards[_Id];
        collection = card.collection;
        cardType = card.cardType;
        capacity = card.capacity;
    }

    function chargeCards(
        uint256 cardType1,
        uint256 cardType2,
        uint256 cardType3
    ) public onlyOwner {
        // Mojno li tak ne ravno pisat?
        require(
            cardType1 != cardType2 &&
                cardType2 != cardType3 &&
                cardType1 != cardType3,
            "You cannot use cards with the same cardType!"
        );

        // KAK prospisat collection esli ego net v parametrah
        //require(condition, "You cannot use cards with the same collection!");
        // TOTALCARDS < ILI =< ????????????????
        //  //////////////////////////////////////////////////////////////
        for (uint256 i = 0; i <= totalCards; i++) {
            if (cards[i].cardType == cardType2) {
                cards[i].charges[cardType1] == cards[i].capacity;
                cards[i].historyOfCards.push(cardType1);
            }
            if (cards[i].cardType == cardType3) {
                cards[i].charges[cardType1] == cards[i].capacity;
                cards[i].historyOfCards.push(cardType1);
            }
            if (cards[i].cardType == cardType1) {
                cardsToForge.push(i);
            }
        }
    }

    //this destryoes a card and gives
    function destroyCard(uint256 destroyerId, uint256 consumedId)
        public
        returns (uint256 capacity, uint256 cardType)
    {
        require(cards[destroyerId].cardType == cards[consumedId].cardType);
        require(ownerOf(destroyerId) == msg.sender);
        require(ownerOf(consumedId) == msg.sender);

        cards[destroyerId].capacity =
            cards[destroyerId].capacity +
            cards[consumedId].capacity;

        _burn(consumedId);
        for (uint256 i = 0; i < cards[consumedId].historyOfCards.length; i++) {
            uint256 x = cards[consumedId].historyOfCards[i];

            if (cards[consumedId].charges[x] != 0) {
                cards[destroyerId].charges[x] =
                    cards[destroyerId].charges[x] +
                    cards[consumedId].charges[x];
            }
        }

        return (cards[destroyerId].cardType, cards[destroyerId].capacity);
    }

    //this forges a card  and consumes charges of other cards
    function forgeCard(
        uint256 firstCardId,
        uint256 secondCardId,
        uint256 cardTypeToForge
    ) public {
        //The owner of the opened card must be the owener of the contract!!!!!
        require(cards[firstCardId].charges[cardTypeToForge] > 0);
        require(cards[secondCardId].charges[cardTypeToForge] > 0);
        require(ownerOf(firstCardId) == msg.sender);
        require(ownerOf(secondCardId) == msg.sender);

        /// PRAVILNO LI ETO NAPISANO? mojno li Card v kvadratnih skobkah
        //require(ownerOf(cards[Card].cardTypeToForge) == owner());

        cards[firstCardId].charges[cardTypeToForge] - 1;
        cards[secondCardId].charges[cardTypeToForge] - 1;
        for (uint256 i = 0; i < cardsToForge.length; i++) {
            if (cards[cardsToForge[i]].cardType == cardTypeToForge) {
                break;
                safeTransferFrom(owner(), msg.sender, cards[cardsToForge[i]]);
            }
        }
    }

    // function getCardByOwner(address _owner)
    //     external
    //     view
    //     returns (uint256[] memory)
    // {
    //     x = balanceOf(_owner);
    //     uint256[] memory result = new uint256[](x);
    //     uint256 counter = 0;
    //     for (uint256 i = 0; i < x; i++) {
    //         y = tokenByIndex(i);
    //         result.push(y);
    //     }
    //     return result;
    // }
}
