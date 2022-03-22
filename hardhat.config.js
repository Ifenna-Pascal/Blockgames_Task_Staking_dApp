require("@nomiclabs/hardhat-waffle");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/5dbf31941c414fb8bb13b7142f7d9854", //Infura url with projectId
      accounts: ["163fb1a585e759f63b573fef4aa1064e28bf99625add519c287e875c7c529d9b"] // add the account that will deploy the contract (private key)
     },
   }
};
