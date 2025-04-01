import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CrowdfundingContract...");
  
  const CrowdfundingContract = await ethers.getContractFactory("CrowdfundingContract");
  const contract = await CrowdfundingContract.deploy();
  
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  
  console.log("CrowdfundingContract deployed to:", address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 