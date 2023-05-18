// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

async function main() {
  const accounts = await ethers.getSigners();
  const addresses = accounts.map((account) => account.address);

  const leaves = addresses.map((addr) => keccak256(addr));
  const treeRaw = new MerkleTree(leaves, keccak256, { sortPairs: true });

  const bufToHex = (buf) => "0x" + buf.toString("hex");
  const tree = bufToHex(treeRaw.getRoot());

  const NFTAirdrop = await hre.ethers.getContractFactory("NFTAirdrop");

  const nftAirdrop = await NFTAirdrop.deploy(tree);
  await nftAirdrop.deployed();

  const leaf = bufToHex(keccak256(addresses[0]));
  const fakeLeaf = bufToHex(keccak256("0x0...000"));
  // todo substitute with a real address

  const proof = treeRaw.getProof(leaf).map((el) => bufToHex(el.data));
  const fakeProof = treeRaw.getProof(fakeLeaf).map((el) => bufToHex(el.data));

  // console.log("Registered address",(await nftAirdrop.isValid( proof, leaf)))
  // console.log("Not registered address",(await nftAirdrop.isValid( fakeProof, fakeLeaf)))

  let transaction = await nftAirdrop.connect(accounts[0]).safeMint(proof);
  await transaction.wait();
  console.log(await nftAirdrop.balanceOf(addresses[1]));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
