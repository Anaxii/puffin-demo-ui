const Web3 = require('web3');
const ERC20 = require("../abi/IERC20.json")
export default async function GetAllowance(walletAddress :string) {
    const avaxWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/C/rpc"
    ));
    const pfnWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"
    ));

    let wavaxContract = new avaxWeb3.eth.Contract(ERC20, "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3");
    let wavaxBalance = await wavaxContract.methods.allowance(walletAddress, "0x40dA58598877009868B9B876f52d31a0C204FC63").call();

    let pfnContract = new pfnWeb3.eth.Contract(ERC20, "0xa61E9ed5E29850a1DCfD357a466D49E1E8eB5fB7");
    let pfnBalance = await pfnContract.methods.allowance(walletAddress, "0xd3E11DeF6d34E231ab410e5aA187e1f2d9fF19E1").call();

    return {fuji_wavax: BigInt(wavaxBalance), pfn_wavax: BigInt(pfnBalance)}
}
