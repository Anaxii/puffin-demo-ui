export const AddNetwork = async (network: string): Promise<void> => {

    if (network == "pfn") {
        await window?.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: `0x${(43113114).toString(16)}`,
                chainName: "Puffin",
                nativeCurrency: {
                    name: "PFN",
                    symbol: "PFN",
                    decimals: 18
                },
                rpcUrls: ["https://node.thepuffin.network/ext/bc/273dwzFtrR6JQzLncTAbN5RBtiqdysVfKTJKBvYHhtUHBnrYWe/rpc"],
                blockExplorerUrls: ["https://testnet.snowtrace.io/"]
            }]
        }).catch((error: any): void => {
            console.log(error)
        })
        return
    }
    await window?.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: `0x${(43113).toString(16)}`,
            chainName: "Avalanche Testnet C-Chain",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://testnet.snowtrace.io/"]
        }]
    }).catch((error: any): void => {
        console.log(error)
    })

}
