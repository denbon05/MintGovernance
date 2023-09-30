// @ts-check
const { ethers } = require("hardhat");
const { governorAddress, proposalId } = require("./constants");
const {
  abi,
} = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");

// ? step 4
// As the owner with 10000 tokens we have the executive power to
// push this proposal through
const castVote = async () => {
  const governor = await ethers.getContractAt(abi, governorAddress);
  // Support is generic and can represent various things depending on
  // the voting system used.
  const support = 1;
  const tx = await governor.castVote(proposalId, support);
  console.log("tx", tx);
  const receipt = await tx.wait();

  console.log("receipt", receipt);
};

castVote();
