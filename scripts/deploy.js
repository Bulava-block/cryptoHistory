async function main() {
  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  const cryptoHistory = await ethers.getContractFactory("cryptoHistory");
  const cryptHist = await cryptoHistory.deploy();

  // const CardMarketPlace = await ethers.getContractFactory("CardMarketPlace");
  // const marketPlace = await CardMarketPlace.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  console.log("Greeter deployed to:", greeter.address);
  console.log("cryptoHistory deployed to:", cryptHist.address)
  // console.log("marketPlace deployed to:", marketPlace.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });