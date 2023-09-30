// @ts-check
const { ethers } = require("hardhat");
const { tokenAddress } = require("./constants");

// ? 2 step
// owner is delegating the weight of 10000 tokens to themselves to vote with
const delegateVotes = async () => {
  const token = await ethers.getContractAt("MyToken", tokenAddress);
  const owner = await ethers.provider.getSigner(0);
  const ownerAddress = await owner.getAddress();
  await token.delegate(ownerAddress);

  const balance = await token.balanceOf(ownerAddress);
  console.log("Owner token balance: ", ethers.utils.formatEther(balance));
};

delegateVotes();
