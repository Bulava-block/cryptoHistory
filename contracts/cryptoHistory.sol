pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//_card.charges[cardtype] = 1;

contract cryptoHistory is ERC721, Ownable {
    constructor() public ERC721("cryptoHistory", "CH") {}

    string public constant _name = "cryptoHistory";
    string public constant _symbol = "CH";
    uint256 public constant maxForEachCard = 3;

    struct Card {
        uint256 collection;
        uint256 cardType;
        uint16 capacity;
        mapping(uint256 => uint256) charges;
    }

    Card[] cards;

    mapping(uint256 => address) public cardIndexToOwner;
    mapping(address => uint256) public ownershipTokenCount;

    event cardCreated(
        uint256 _collection,
        uint256 _cardType,
        uint16 _capacity,
        address owner
    );

    function _createCard(
        uint256 _collection,
        uint256 _cardType,
        uint256 _capacity,
        address _owner
    ) private returns (uint256) {
        Card storage _card = Card({cardType: _cardType, capacity: _capacity});
        _card.charges[11111] = 1;

        _card._capacity = 1;

        cards.push(_card);

        uint256 newCardId = cards.length - 1;

        emit cardCreated(_cardType, _capacity, _owner);

        _transfer(address(0), _owner, newCardId);

        return newCardId;
    }

    function mintCard(uint256 cardType) public onlyOwner {
        for (uint256 i = 0; i < maxForEachCard; i++) {
            _createCard(cardType, 1, msg.sender);
        }
    }

    function getCard(uint256 _Id)
        external
        view
        returns (uint256 cardType, uint16 capacity)
    {
        Card storage card = cards[_Id];
        cardType = uint256(Card.cardType);
        capacity = uint16(Card.capacity);
    }
}
