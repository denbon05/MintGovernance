// @ts-check
const { ethers } = require("hardhat");
const {
  abi: governorABI,
} = require("../artifacts/contracts/MyGovernor.sol/MyGovernor.json");
const {
  abi: tokenABI,
} = require("../artifacts/contracts/MyToken.sol/MyToken.json");
const { governorAddress, tokenAddress } = require("./constants");

const execute = async () => {
  const governor = await ethers.getContractAt(governorABI, governorAddress);
  const token = await ethers.getContractAt(tokenABI, tokenAddress);

  const owner = await ethers.provider.getSigner(0);
  const ownerAddress = await owner.getAddress();

  const calldata = token.interface.encodeFunctionData("mint", [
    ownerAddress,
    ethers.utils.parseEther("25000"),
  ]);
  const tx = await governor.execute(
    [tokenAddress], // targets
    [0], // values
    [calldata],
    ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("Give the owner more tokens!"),
    ),
  );
  const receipt = await tx.wait();

  console.log("receipt", receipt);
};

execute();
