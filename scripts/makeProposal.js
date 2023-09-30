// @ts-check
const { ethers } = require("hardhat");
const { tokenAddress, governorAddress } = require("./constants");

// ? step 3
// owner is delegating the weight of 10000 tokens to themselves to vote with
const makeProposal = async () => {
  const governor = await ethers.getContractAt("MyGovernor", governorAddress);
  const token = await ethers.getContractAt("MyToken", tokenAddress);

  const owner = await ethers.provider.getSigner(0);
  const ownerAddress = await owner.getAddress();
  // encode any kind of call data or value on the proposal
  const calldata = token.interface.encodeFunctionData("mint", [
    ownerAddress,
    ethers.utils.parseEther("25000"),
  ]);
  // console.log({ calldata, ownerAddress });

  // super
  // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/governance/Governor.sol#L268
  const tx = await governor.propose(
    [tokenAddress], // targets
    [0], // values
    [calldata], // data to execute
    "Give the owner more tokens!", // description
  );
  // console.log("After TX");

  const receipt = await tx.wait();
  // console.log("receipt", receipt);
  const event = receipt.events.find((x) => x.event === "ProposalCreated");
  const { proposalId } = event.args;
  console.log("proposalId: ", proposalId);
  // 21399350344938057064678839072770073879435210058011913047113334689416489651392
};

makeProposal();
