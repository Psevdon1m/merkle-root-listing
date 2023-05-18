// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NFTAirdrop is ERC721, Ownable {
    using Counters for Counters.Counter;

    bytes32 public root;

    Counters.Counter private _tokenIdCounter;

    constructor(bytes32 _root) ERC721("NFT", "NFT") {
        root = _root;
    }

    function safeMint(
        bytes32[] memory _proof
    ) public  {
        require(
            isValid(_proof, keccak256(abi.encodePacked(msg.sender))),
            "Address not found in verified merkle tree."
        );
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function isValid(bytes32[] memory proof, bytes32 leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }
}
