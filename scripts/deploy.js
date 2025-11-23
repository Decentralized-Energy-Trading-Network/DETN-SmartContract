async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Check balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "MATIC");

  // Check if we have enough balance
  if (balance.lt(ethers.utils.parseEther("0.1"))) {
    throw new Error("Insufficient MATIC for deployment");
  }

  // Deploy contract - use correct contract name
  const SLRToken = await ethers.getContractFactory("SLRToken");
  console.log("Deploying SLRToken...");
  
  const token = await SLRToken.deploy();
  console.log("Deployment transaction hash:", token.deployTransaction.hash);

  // Wait for deployment
  console.log("Waiting for confirmations...");
  const receipt = await token.deployTransaction.wait(3);
  console.log("Block confirmations:", receipt.confirmations);
  
  // Verify contract
  console.log("Contract deployed to:", token.address);
  console.log("Waiting 60 seconds before verification...");
  await new Promise(r => setTimeout(r, 60000));
  
  try {
    console.log("Verifying contract on block explorer...");
    await hre.run("verify:verify", {
      address: token.address,
      constructorArguments: [],
    });
    console.log("Verification successful!");
  } catch (e) {
    if (e.message.includes("Already Verified")) {
      console.log("Contract already verified");
    } else {
      console.log("Verification failed:", e.message);
    }
  }

  // Additional info
  console.log("\nDeployment Summary:");
  console.log("Contract:", token.address);
  console.log("Deployer:", deployer.address);
  console.log("Total Supply:", await token.totalSupply());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });