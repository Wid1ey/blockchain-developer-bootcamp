const { ethers } = require("hardhat");
async function main() {
  console.log(`Preparing deployment...\n`);

  // Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const Exchange = await ethers.getContractFactory("Exchange");

  // Fetch accounts
  const accounts = await ethers.getSigners();

  console.log(
    `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
  );

  // Deploy contracts
  const aca = await Token.deploy("Quantum aca", "aca", "1000000");
  await aca.deployed();
  console.log(`aca Deployed to: ${aca.address}`);

  const acaV1 = await Token.deploy("acaV1", "acaV1", "1000000");
  await acaV1.deployed();
  console.log(`acaV1 Deployed to: ${acaV1.address}`);

  const mDAI = await Token.deploy("mDAI", "mDAI", "1000000");
  await mDAI.deployed();
  console.log(`mDAI Deployed to: ${mDAI.address}`);

  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log(`Exchange Deployed to: ${exchange.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
