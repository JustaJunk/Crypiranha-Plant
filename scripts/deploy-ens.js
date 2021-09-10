const hre = require("hardhat");
const ethers = require("ethers");

const main = async () => {
  
  const ENS = await hre.ethers.getContractFactory("MockEnsRegistry");
  const ens = await ENS.deploy()
  await ens.deployed()
  console.log("ENS deployed to:", ens.address)
  
  const Resolver = await hre.ethers.getContractFactory("MockPublicResolver")
  const resolver = await Resolver.deploy()
  await resolver.deployed()
  console.log("Resolver deployed to:", resolver.address)

  const Aggregator = await hre.ethers.getContractFactory("MockV3Aggregator")
  const mockPairs = ['eth-usd', 'btc-usd', 'bnb-usd', 'link-usd']
  const mockPrices = [3500,  50000, 400, 30]

  mockPairs.map(async (pair, idx) => {
    const namehash = ethers.utils.namehash(pair+".data.eth")
    const mockAgg = await Aggregator.deploy(1, mockPrices[idx]*10**8)
    await mockAgg.deployed()
    console.log(`Aggregator ${pair} deployed to:`, mockAgg.address)
    ens.setResolver(namehash, resolver.address)
    resolver.setAddr(namehash, mockAgg.address)
  })

  return ens.address
}
module.exports = main

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch(error => {
//     console.error(error);
//     process.exit(1);
//   });
