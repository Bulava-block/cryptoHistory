const cryptoHistory = artifacts.require("cryptoHistory");
const CardMarketPlace = artifacts.require("CardMarketPlace");

module.exports = async function(deployer) {
  await deployer.deploy(cryptoHistory);
  await deployer.deploy(CardMarketPlace, cryptoHistory.address);
};
