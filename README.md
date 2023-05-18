# NFTAirdrop JavaScript Script

This JavaScript script is used to deploy and interact with the `NFTAirdrop` smart contract.

## Prerequisites

- Hardhat Runtime Environment (HRE)
- `hardhat` package
- `keccak256` package
- `merkletreejs` package

## Script Details

The script performs the following actions:

1. Imports the necessary packages and libraries.
2. Retrieves the signers' addresses.
3. Generates leaves by hashing each address using Keccak256.
4. Constructs a Merkle tree with the leaves.
5. Deploys the `NFTAirdrop` contract, passing the Merkle tree root as a parameter.
6. Obtains the proof and leaf for a registered address.
7. Obtains the proof and leaf for a fake address (substitute with a real address).
8. Calls the `safeMint` function of the `NFTAirdrop` contract to mint an NFT for the registered address.
9. Retrieves the balance of the NFT for a specific address.

## Smart Contract Details

The `NFTAirdrop` contract is an ERC721 token contract that allows for the safe minting of NFTs based on a provided Merkle tree root. The contract inherits from the `ERC721` and `Ownable` contracts and uses the `Counters` and `MerkleProof` libraries from OpenZeppelin.

### Contract Variables

- `root`: A bytes32 variable representing the Merkle tree root hash.
- `_tokenIdCounter`: A Counter variable for managing token IDs.

### Contract Functions

#### `constructor(bytes32 _root)`

```solidity
constructor(bytes32 _root) ERC721("NFT", "NFT")
```

Initializes the contract by setting the Merkle tree root hash passed as a parameter.

#### `safeMint(bytes32[] memory _proof)`

```solidity
function safeMint(bytes32[] memory _proof) public
```

Mints an NFT for the caller if their address is found in the verified Merkle tree. The `_proof` parameter contains the proof data necessary to verify the caller's address.

#### `isValid(bytes32[] memory proof, bytes32 leaf)`

```solidity
function isValid(bytes32[] memory proof, bytes32 leaf) public view returns (bool)
```

Verifies whether a given `_proof` and `leaf` combination is valid by checking against the Merkle tree root.

## License

The script and the smart contract do not have explicit license information provided in the code.
