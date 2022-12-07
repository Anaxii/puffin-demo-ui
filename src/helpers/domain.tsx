const Web3 = require('web3');
const NameServiceABI = require("../abi/PFNNameService.json")
export async function GetDomain(walletAddress :string) {
    console.log(walletAddress)
    if (walletAddress == "") {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        walletAddress = accounts[0]
    }

    if (!walletAddress)
        return ""


    const pfnWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"
    ));

    let pfnContract = new pfnWeb3.eth.Contract(NameServiceABI, "0x80108f1319A6C44bF352eDd121C34a8AEDdC655b");
    let pfnName = await pfnContract.methods.domain(walletAddress).call();

    return pfnName || ""
}
