pragma solidity >=0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";

contract cryptoHistory is ERC721, Ownable, ERC721Burnable {
    using SafeMath for uint256;
    using Address for address;
    using EnumerableSet for EnumerableSet.UintSet;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using Strings for uint256;

    constructor() public ERC721("cryptoHistory", "CH") {}

    string public constant _name = "cryptoHistory";
    string public constant _symbol = "CH";
    //maximum of cards with the same name
    uint256 public constant maxForEachCard = 3;

    struct Card {
        uint256 collection;
        uint256 cardType;
        uint8 capacity;
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

    // this prevents a functon from minting the same cards few times.
    mapping(uint256 => bool) public alreadyCreated;

    // this prevents a cardType from being charged more than once
    mapping(uint256 => bool) public alreadyCharged;

    // this mapping creates an array of cards that were charged
    mapping(address => EnumerableSet.UintSet) cardsToForge;

    //this shows which cardtype a card has charges for and how many charges it has
    mapping(uint256 => EnumerableSet.UintSet) historyOfCards;

    event cardCreated(uint256 _collection, uint256 _cardType, address owner);

    // historyOfCards   Enumarable.set

    // adds a card ID to the array that contains the cards collectors can forge
    function addHistoryOfCards(uint256 cardId, uint256 insertId) public {
        historyOfCards[cardId].add(cards[insertId].cardType);
    }

    // when card is forged this will take the card out of the array
    function removeCardsToForge(uint256 cardId, uint256 insertId) public {
        historyOfCards[cardId].remove(cards[insertId].cardType);
    }

    // that shows all the ID's of the cards that are not forged yet
    function getAllHistoryOfCards(uint256 cardId)
        public
        view
        returns (uint256[] memory)
    {
        uint256 totalCardsX = historyOfCards[cardId].length();

        uint256[] memory cardsX = new uint256[](totalCardsX);

        for (uint256 i = 0; i <= totalCards; i++) {
            cardsX[i] = historyOfCards[cardId].at(i);
        }

        return cardsX;
    }

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
        require(alreadyCreated[cardType] == false);
        alreadyCreated[cardType] = true;
        for (uint256 i = 0; i < maxForEachCard; i++) {
            uint256 x = _createCard(collection, cardType);
            _safeMint(msg.sender, x);
        }
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

    // functions that we use to add remove from the array of charged cards

    // addCardsToForge()
    // removeCardsToForge()
    // getAllCards()

    // adds a card ID to the array that contains the cards collectors can forge
    function addCardsToForge(uint256 cardId) public {
        cardsToForge[owner()].add(cardId);
    }

    // when card is forged this will take the card out of the array
    function removeCardsToForge(uint256 cardId) public {
        cardsToForge[owner()].remove(cardId);
    }

    // that shows all the ID's of the cards that are not forged yet
    function getAllCards() public view returns (uint256[] memory) {
        uint256 totalCardsX = cardsToForge[owner()].length();

        uint256[] memory cardsX = new uint256[](totalCardsX);

        for (uint256 i = 0; i < totalCards; i++) {
            cardsX[i] = cardsToForge[owner()].at(i);
        }

        return cardsX;
    }

    //  End of   cardsToForge   Enumarable.set

    function chargeCards(
        uint256 toChargeId,
        uint256 key1Id,
        uint256 key2Id
    ) public onlyOwner {
        require(
            cards[toChargeId].cardType != cards[key1Id].cardType &&
                cards[key1Id].cardType != cards[key2Id].cardType,
            "You cannot use cards with the same cardType!"
        );
        require(
            cards[toChargeId].collection != cards[key1Id].cardType &&
                cards[key1Id].cardType != cards[key2Id].cardType,
            "You cannot use cards with the same cardType!"
        );

        require(alreadyCharged[cards[toChargeId].cardType] == false);
        require(_exists(toChargeId) == true);
        require(_exists(key1Id) == true);
        require(_exists(key2Id) == true);

        alreadyCharged[cards[toChargeId].cardType] = true;
        for (uint256 i = 0; i <= totalCards; i++) {
            if (cards[i].cardType == cards[key1Id].cardType) {
                cards[i].charges[cards[toChargeId].cardType] ==
                    cards[i].capacity;
                addHistoryOfCards(key1Id, toChargeId);
            }
            if (cards[i].cardType == cards[key2Id].cardType) {
                cards[i].charges[cards[toChargeId].cardType] ==
                    cards[i].capacity;
                addHistoryOfCards(key2Id, toChargeId);
            }
            if (cards[i].cardType == cards[toChargeId].cardType) {
                addCardsToForge(i);
            }
        }
    }

    //this destryoes a card and makes the other card stronger
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

        burn(consumedId);
        for (uint256 i = 0; i < getAllHistoryOfCards(consumedId).length; i++) {
            uint256 x = getAllHistoryOfCards(consumedId)[i];

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
        require(cards[firstCardId].charges[cardTypeToForge] > 0);
        require(cards[secondCardId].charges[cardTypeToForge] > 0);
        require(ownerOf(firstCardId) == msg.sender);
        require(ownerOf(secondCardId) == msg.sender);

        cards[firstCardId].charges[cardTypeToForge] - 1;
        cards[secondCardId].charges[cardTypeToForge] - 1;
        uint256[] memory x = getAllCards();
        for (uint256 i = 0; i < x.length; i++) {
            if (cards[x[i]].cardType == cardTypeToForge) {
                safeTransferFrom(owner(), msg.sender, x[i]);
                removeCardsToForge(x[i]);
                break;
            }
        }
    }

    function getCardByOwner() public view returns (uint256[] memory) {
        uint256 x = balanceOf(msg.sender);
        uint256[] memory result = new uint256[](x); //new
        uint256 counter = 0;
        for (uint256 i = 0; i < x; i++) {
            uint256 y = tokenOfOwnerByIndex(msg.sender, i);
            result[counter] = y;
            counter++;
        }
        return result;
    }
}
