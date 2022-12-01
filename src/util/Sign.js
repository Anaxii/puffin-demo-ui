import Web3 from "web3";

export async function Sign() {

  if (!window.ethereum) {
    console.log("Wallet not connected")
    return
  }

  const accounts = await window.ethereum.request({method: "eth_requestAccounts"});

  const message = "Puffin KYC Request: " + accounts[0];
  const hashedMessage = Web3.utils.keccak256(message);

  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [message, accounts[0]],
  });

  const r = signature.slice(0, 66);
  const s = "0x" + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);

  return {signature, r, s, v, hashedMessage, walletAddress: accounts[0]}


}
