const Web3 = require('web3');
const NameServiceABI = require("../abi/PFNNameService.json")
export async function GetDomain(walletAddress :string) {
    if (walletAddress == "") {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        walletAddress = accounts[0]
    }

    if (!walletAddress)
        return ""


    const pfnWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"
    ));

    let pfnContract = new pfnWeb3.eth.Contract(NameServiceABI, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
    let pfnName = await pfnContract.methods.domain(walletAddress).call();

    return pfnName || ""
}

export async function GetDomains(walletAddress :string) {
    if (walletAddress == "") {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        walletAddress = accounts[0]
    }

    if (!walletAddress)
        return []


    const pfnWeb3 = new Web3(new Web3.providers.HttpProvider(
        "https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"
    ));

    let pfnContract = new pfnWeb3.eth.Contract(NameServiceABI, "0x1374ECB08beA236BBED4337c02ef6788aB0e2216");
    let numNames = await pfnContract.methods.balanceOf(walletAddress).call();

    let domains = []
    for (let i = 0; i < Number(numNames); i++) {
        let tokenNum = await pfnContract.methods.tokenOfOwnerByIndex(walletAddress, i).call();
        let domainInfo = await pfnContract.methods.domainInfo(tokenNum).call();
        let numSubs = domainInfo?.numberOfCreatedSubdomains
        let subs = []
        for (let j = 0; j < Number(numSubs); j++) {
            let subName = await pfnContract.methods.getSubDomain(tokenNum, j).call();
            if (subName != "") {
                subs.push({name: subName, subId: j})
            }
        }
        domains.push({domainName: Web3.utils.hexToString(domainInfo.domainName) + ".pfn", domainId: tokenNum, subaccounts: subs})

    }

    return domains
}
