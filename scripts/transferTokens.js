const { ethers } = require("hardhat");

async function main() {
  const tokenAddress = "0xaae260576594010C381C6866F28f5E770F4777F3";
  const recipient = "0x67D0283D7F53039454d4007E4D448313258F69c2";
  
  // Amount to send (e.g., 100 SLR tokens)
  const amount = ethers.utils.parseUnits("100", 18); // 100 * 10^18

  // Get the deployer/sender
  const [sender] = await ethers.getSigners();
  console.log(`Transferring from: ${sender.address}`);

  // Get the token contract - use correct contract name "SLRToken"
  const token = await ethers.getContractAt("SLRToken", tokenAddress);

  console.log(`Token contract address:`, token);
  
  // Check balances before transfer
  const senderBalanceBefore = await token.balanceOf(sender.address);
  const recipientBalanceBefore = await token.balanceOf(recipient);
  
  console.log(`Sender balance before: ${ethers.utils.formatUnits(senderBalanceBefore, 18)} SLR`);
  console.log(`Recipient balance before: ${ethers.utils.formatUnits(recipientBalanceBefore, 18)} SLR`);

  // Option 1: Use the standard transfer() function (recommended)
  console.log("Using standard transfer function...");
  const tx = await token.transfer(recipient, amount);
  console.log(`Transaction hash: ${tx.hash}`);
  
  await tx.wait();
  console.log("Transfer complete!");
  
  // Check balances after transfer
  const senderBalanceAfter = await token.balanceOf(sender.address);
  const recipientBalanceAfter = await token.balanceOf(recipient);
  
  console.log(`Sender balance after: ${ethers.utils.formatUnits(senderBalanceAfter, 18)} SLR`);
  console.log(`Recipient balance after: ${ethers.utils.formatUnits(recipientBalanceAfter, 18)} SLR`);

  // Option 2: If you added safeTransfer function to your contract
  // const tx = await token.safeTransfer(recipient, amount);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });