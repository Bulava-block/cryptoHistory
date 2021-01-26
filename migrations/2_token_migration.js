const Token = artifacts.require("cryptoHistory");

module.exports = function(deployer) {
  deployer.deploy(Token);
};
