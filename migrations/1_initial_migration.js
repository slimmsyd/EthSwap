
//Migrating SmartContracts to the Blockchain 


const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
