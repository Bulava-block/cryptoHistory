async function main() {
  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const cryptoHistory = await ethers.getContractFactory("cryptoHistory");
  const cryptHist = await cryptoHistory.deploy();

  const CardMarketPlace = await ethers.getContractFactory("CardMarketPlace");
  const marketPlace = await CardMarketPlace.deploy("0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097");

  console.log("Greeter deployed to:", greeter.address);
  console.log("Greeter deployed to:", cryptHist.address)
  console.log("Greeter deployed to:", marketPlace.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });