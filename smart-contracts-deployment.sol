// contracts/TicketNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TicketNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _eventIdCounter;

    struct Event {
        uint256 id;
        string name;
        string venue;
        uint256 date;
        uint256 price;
        uint256 maxSupply;
        uint256 currentSupply;
        string metadataURI;
        bool isActive;
        address organizer;
    }

    struct Ticket {
        uint256 eventId;
        uint256 purchaseDate;
        bool isUsed;
        address originalPurchaser;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => uint256[]) public eventTickets;
    mapping(address => uint256[]) public userTickets;
    
    uint256 public platformFee = 250; // 2.5%
    uint256 constant FEE_DENOMINATOR = 10000;

    event EventCreated(
        uint256 indexed eventId,
        string name,
        address indexed organizer,
        uint256 price,
        uint256 maxSupply
    );

    event TicketPurchased(
        uint256 indexed tokenId,
        uint256 indexed eventId,
        address indexed purchaser,
        uint256 price
    );

    event TicketValidated(
        uint256 indexed tokenId,
        uint256 indexed eventId,
        address validator
    );

    event TicketTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );

    constructor() ERC721("TickBase NFT Tickets", "TICK") Ownable(msg.sender) {}

    // Crear un nuevo evento
    function createEvent(
        string memory _name,
        string memory _venue,
        uint256 _date,
        uint256 _price,
        uint256 _maxSupply,
        string memory _metadataURI
    ) external returns (uint256) {
        require(_date > block.timestamp, "Event date must be in the future");
        require(_maxSupply > 0, "Max supply must be greater than 0");
        require(bytes(_name).length > 0, "Event name required");
        require(bytes(_venue).length > 0, "Venue required");

        _eventIdCounter.increment();
        uint256 eventId = _eventIdCounter.current();

        events[eventId] = Event({
            id: eventId,
            name: _name,
            venue: _venue,
            date: _date,
            price: _price,
            maxSupply: _maxSupply,
            currentSupply: 0,
            metadataURI: _metadataURI,
            isActive: true,
            organizer: msg.sender
        });

        emit EventCreated(eventId, _name, msg.sender, _price, _maxSupply);
        return eventId;
    }

    // Comprar boletos
    function mintTickets(uint256 _eventId, uint256 _quantity) 
        external 
        payable 
        nonReentrant 
    {
        Event storage eventInfo = events[_eventId];
        require(eventInfo.isActive, "Event is not active");
        require(eventInfo.date > block.timestamp, "Event has already occurred");
        require(
            eventInfo.currentSupply + _quantity <= eventInfo.maxSupply,
            "Not enough tickets available"
        );
        require(
            msg.value >= eventInfo.price * _quantity,
            "Insufficient payment"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            _tokenIdCounter.increment();
            uint256 tokenId = _tokenIdCounter.current();

            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, eventInfo.metadataURI);

            tickets[tokenId] = Ticket({
                eventId: _eventId,
                purchaseDate: block.timestamp,
                isUsed: false,
                originalPurchaser: msg.sender
            });

            eventTickets[_eventId].push(tokenId);
            userTickets[msg.sender].push(tokenId);

            emit TicketPurchased(tokenId, _eventId, msg.sender, eventInfo.price);
        }

        eventInfo.currentSupply += _quantity;

        // Distribuir fondos
        uint256 fee = (msg.value * platformFee) / FEE_DENOMINATOR;
        uint256 organizerAmount = msg.value - fee;

        payable(eventInfo.organizer).transfer(organizerAmount);
        payable(owner()).transfer(fee);
    }

    // Validar boleto (para entrada al evento)
    function validateTicket(uint256 _tokenId) 
        external 
        view 
        returns (bool isValid, string memory message) 
    {
        if (_tokenId == 0 || _tokenId > _tokenIdCounter.current()) {
            return (false, "Invalid ticket ID");
        }

        Ticket memory ticket = tickets[_tokenId];
        Event memory eventInfo = events[ticket.eventId];

        if (ticket.isUsed) {
            return (false, "Ticket already used");
        }

        if (eventInfo.date < block.timestamp) {
            return (false, "Event has already passed");
        }

        if (ownerOf(_tokenId) == address(0)) {
            return (false, "Ticket does not exist");
        }

        return (true, "Valid ticket");
    }

    // Marcar boleto como usado
    function useTicket(uint256 _tokenId) external {
        require(ownerOf(_tokenId) != address(0), "Ticket does not exist");
        Ticket storage ticket = tickets[_tokenId];
        Event memory eventInfo = events[ticket.eventId];
        
        require(
            msg.sender == eventInfo.organizer || msg.sender == owner(),
            "Only organizer or owner can mark ticket as used"
        );
        require(!ticket.isUsed, "Ticket already used");
        require(
            eventInfo.date <= block.timestamp + 1 days,
            "Can only use ticket near event date"
        );

        ticket.isUsed = true;
        emit TicketValidated(_tokenId, ticket.eventId, msg.sender);
    }

    // Transferir boleto
    function transferTicket(uint256 _tokenId, address _to) external {
        require(ownerOf(_tokenId) == msg.sender, "You don't own this ticket");
        require(_to != address(0), "Invalid recipient");
        
        Ticket memory ticket = tickets[_tokenId];
        Event memory eventInfo = events[ticket.eventId];
        require(!ticket.isUsed, "Cannot transfer used ticket");
        require(eventInfo.date > block.timestamp, "Cannot transfer past event ticket");

        _transfer(msg.sender, _to, _tokenId);
        
        // Actualizar lista de boletos del usuario
        _removeFromUserTickets(msg.sender, _tokenId);
        userTickets[_to].push(_tokenId);

        emit TicketTransferred(_tokenId, msg.sender, _to);
    }

    // Obtener boletos de un usuario
    function getUserTickets(address _user) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return userTickets[_user];
    }

    // Obtener boletos de un evento
    function getEventTickets(uint256 _eventId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return eventTickets[_eventId];
    }

    // Obtener eventos activos
    function getActiveEvents() 
        external 
        view 
        returns (Event[] memory) 
    {
        uint256 activeCount = 0;
        
        // Contar eventos activos
        for (uint256 i = 1; i <= _eventIdCounter.current(); i++) {
            if (events[i].isActive && events[i].date > block.timestamp) {
                activeCount++;
            }
        }

        Event[] memory activeEvents = new Event[](activeCount);
        uint256 index = 0;

        // Llenar array con eventos activos
        for (uint256 i = 1; i <= _eventIdCounter.current(); i++) {
            if (events[i].isActive && events[i].date > block.timestamp) {
                activeEvents[index] = events[i];
                index++;
            }
        }

        return activeEvents;
    }

    // Funciones administrativas
    function setPlatformFee(uint256 _fee) external onlyOwner {
        require(_fee <= 1000, "Fee too high"); // Max 10%
        platformFee = _fee;
    }

    function toggleEventStatus(uint256 _eventId) external {
        Event storage eventInfo = events[_eventId];
        require(
            msg.sender == eventInfo.organizer || msg.sender == owner(),
            "Not authorized"
        );
        eventInfo.isActive = !eventInfo.isActive;
    }

    function withdrawEmergency() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Funciones internas
    function _removeFromUserTickets(address _user, uint256 _tokenId) private {
        uint256[] storage userTokens = userTickets[_user];
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == _tokenId) {
                userTokens[i] = userTokens[userTokens.length - 1];
                userTokens.pop();
                break;
            }
        }
    }

    // Override requeridos
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

---

// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying TicketNFT contract...");

  const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy();

  await ticketNFT.waitForDeployment();

  const address = await ticketNFT.getAddress();
  console.log("TicketNFT deployed to:", address);

  // Verificar en Basescan
  if (hre.network.name === "base" || hre.network.name === "base-sepolia") {
    console.log("Waiting for block confirmations...");
    await ticketNFT.deploymentTransaction().wait(6);
    
    console.log("Verifying contract on Basescan...");
    await hre.run("verify:verify", {
      address: address,
      constructorArguments: [],
    });
  }

  // Crear eventos de ejemplo en testnet
  if (hre.network.name === "base-sepolia") {
    console.log("Creating sample events...");
    
    const [owner] = await hre.ethers.getSigners();
    
    // Evento 1
    const tx1 = await ticketNFT.createEvent(
      "Festival de Verano 2025",
      "Parque Central",
      Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 días desde ahora
      hre.ethers.parseEther("0.05"),
      100,
      "ipfs://QmSampleHash1/metadata.json"
    );
    await tx1.wait();
    
    // Evento 2
    const tx2 = await ticketNFT.createEvent(
      "Concierto de Rock",
      "Estadio Nacional",
      Math.floor(Date.now() / 1000) + 45 * 24 * 60 * 60, // 45 días desde ahora
      hre.ethers.parseEther("0.03"),
      250,
      "ipfs://QmSampleHash2/metadata.json"
    );
    await tx2.wait();
    
    console.log("Sample events created!");
  }

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

---

// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "base-sepolia": {
      url: "https://sepolia.base.org",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    "base": {
      url: "https://mainnet.base.org",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: {
      "base": process.env.BASESCAN_API_KEY,
      "base-sepolia": process.env.BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
    ],
  },
};

---

// test/TicketNFT.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
  let ticketNFT;
  let owner;
  let organizer;
  let buyer1;
  let buyer2;
  const eventPrice = ethers.parseEther("0.05");

  beforeEach(async function () {
    [owner, organizer, buyer1, buyer2] = await ethers.getSigners();
    
    const TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy();
    await ticketNFT.waitForDeployment();
  });

  describe("Event Creation", function () {
    it("Should create an event successfully", async function () {
      const eventDate = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
      
      await expect(
        ticketNFT.connect(organizer).createEvent(
          "Test Concert",
          "Test Venue",
          eventDate,
          eventPrice,
          100,
          "ipfs://test"
        )
      ).to.emit(ticketNFT, "EventCreated");

      const event = await ticketNFT.events(1);
      expect(event.name).to.equal("Test Concert");
      expect(event.organizer).to.equal(organizer.address);
    });

    it("Should reject past event dates", async function () {
      const pastDate = Math.floor(Date.now() / 1000) - 86400; // Yesterday
      
      await expect(
        ticketNFT.createEvent(
          "Test Concert",
          "Test Venue",
          pastDate,
          eventPrice,
          100,
          "ipfs://test"
        )
      ).to.be.revertedWith("Event date must be in the future");
    });
  });

  describe("Ticket Purchase", function () {
    let eventId;

    beforeEach(async function () {
      const eventDate = Math.floor(Date.now() / 1000) + 86400;
      const tx = await ticketNFT.connect(organizer).createEvent(
        "Test Concert",
        "Test Venue",
        eventDate,
        eventPrice,
        100,
        "ipfs://test"
      );
      await tx.wait();
      eventId = 1;
    });

    it("Should mint tickets successfully", async function () {
      await expect(
        ticketNFT.connect(buyer1).mintTickets(eventId, 2, {
          value: eventPrice * 2n
        })
      ).to.emit(ticketNFT, "TicketPurchased");

      const balance = await ticketNFT.balanceOf(buyer1.address);
      expect(balance).to.equal(2);
    });

    it("Should reject insufficient payment", async function () {
      await expect(
        ticketNFT.connect(buyer1).mintTickets(eventId, 2, {
          value: eventPrice // Only paying for 1 ticket
        })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should respect max supply", async function () {
      // Create event with only 2 tickets
      const eventDate = Math.floor(Date.now() / 1000) + 86400;
      await ticketNFT.createEvent(
        "Limited Event",
        "Test Venue",
        eventDate,
        eventPrice,
        2,
        "ipfs://test"
      );

      // Buy all tickets
      await ticketNFT.connect(buyer1).mintTickets(2, 2, {
        value: eventPrice * 2n
      });

      // Try to buy one more
      await expect(
        ticketNFT.connect(buyer2).mintTickets(2, 1, {
          value: eventPrice
        })
      ).to.be.revertedWith("Not enough tickets available");
    });
  });

  describe("Ticket Validation", function () {
    let eventId;
    let tokenId;

    beforeEach(async function () {
      const eventDate = Math.floor(Date.now() / 1000) + 86400;
      await ticketNFT.connect(organizer).createEvent(
        "Test Concert",
        "Test Venue",
        eventDate,
        eventPrice,
        100,
        "ipfs://test"
      );
      eventId = 1;

      await ticketNFT.connect(buyer1).mintTickets(eventId, 1, {
        value: eventPrice
      });
      tokenId = 1;
    });

    it("Should validate valid ticket", async function () {
      const [isValid, message] = await ticketNFT.validateTicket(tokenId);
      expect(isValid).to.be.true;
      expect(message).to.equal("Valid ticket");
    });

    it("Should reject invalid ticket ID", async function () {
      const [isValid, message] = await ticketNFT.validateTicket(999);
      expect(isValid).to.be.false;
      expect(message).to.equal("Invalid ticket ID");
    });
  });

  describe("Ticket Transfer", function () {
    let tokenId;

    beforeEach(async function () {
      const eventDate = Math.floor(Date.now() / 1000) + 86400;
      await ticketNFT.connect(organizer).createEvent(
        "Test Concert",
        "Test Venue",
        eventDate,
        eventPrice,
        100,
        "ipfs://test"
      );

      await ticketNFT.connect(buyer1).mintTickets(1, 1, {
        value: eventPrice
      });
      tokenId = 1;
    });

    it("Should transfer ticket successfully", async function () {
      await expect(
        ticketNFT.connect(buyer1).transferTicket(tokenId, buyer2.address)
      ).to.emit(ticketNFT, "TicketTransferred");

      const newOwner = await ticketNFT.ownerOf(tokenId);
      expect(newOwner).to.equal(buyer2.address);
    });

    it("Should reject transfer from non-owner", async function () {
      await expect(
        ticketNFT.connect(buyer2).transferTicket(tokenId, owner.address)
      ).to.be.revertedWith("You don't own this ticket");
    });
  });
});
