// @ts-check
const { ethers } = require("hardhat");

// ? 1 step
async function main() {
  const owner = await ethers.provider.getSigner(0);
  const transactionCount = await owner.getTransactionCount();

  // gets the address of the token before it is deployed
  const futureAddress = ethers.utils.getContractAddress({
    from: await owner.getAddress(),
    nonce: transactionCount + 1,
  });

  const MyGovernor = await ethers.getContractFactory("MyGovernor");
  const governor = await MyGovernor.deploy(futureAddress);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(governor.address);

  console.log(
    `Governor deployed to ${governor.address}\n`,
    `Token deployed to ${token.address}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
