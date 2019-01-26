/* eslint-disable */
var TheToken = artifacts.require("./TheToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TheToken, 0, 'The', 18, 'THE')
};
