const Web3 = require('web3');
const ERC20 = require("../abi/IERC20.json")
export async function GetBalances(walletAddress :string) {
    console.log(walletAddress)
    if (walletAddress == "") {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        walletAddress = accounts[0]
    }

    if (!walletAddress)
        return {avax: BigInt(0), pfn: BigInt(0), fuji_wavax: BigInt(0), pfn_wavax: BigInt(0)}

    const avaxWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/C/rpc"
    ));
    let avaxBal =  await avaxWeb3.eth.getBalance( walletAddress )
    const pfnWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"
    ));
    let pfnBal =  await pfnWeb3.eth.getBalance( walletAddress )

    let wavaxContract = new avaxWeb3.eth.Contract(ERC20, "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3");
    let wavaxBalance = await wavaxContract.methods.balanceOf(walletAddress).call();

    let pfnContract = new pfnWeb3.eth.Contract(ERC20, "0xa61E9ed5E29850a1DCfD357a466D49E1E8eB5fB7");
    let pfnBalance = await pfnContract.methods.balanceOf(walletAddress).call();

    return {avax: BigInt(avaxBal), pfn: BigInt(pfnBal), fuji_wavax: BigInt(wavaxBalance), pfn_wavax: BigInt(pfnBalance)}
}
