const Web3 = require('web3');
const Client = require("../abi/PuffinClient.json")
const Users = require("../abi/PuffinUsers.json")

export async function GetClientInfo(contractAddress: string, usersAddress: string, rpcURL: string) {
    const avaxWeb3 = new Web3(new Web3.providers.HttpProvider(
        rpcURL
    ));

    let clientContract = new avaxWeb3.eth.Contract(Client, contractAddress);
    let usersContract = new avaxWeb3.eth.Contract(Users, usersAddress);

    let epoch = await clientContract.methods.epoch().call();
    let users = await usersContract.methods.count().call();
    let isCurrent = await clientContract.methods.isCurrent().call();
    let paymentToken = await clientContract.methods.paymentToken().call();
    let paymentTokenPerUser = await clientContract.methods.paymentTokenPerUser().call();

    return {epoch, users, isCurrent, paymentToken, paymentTokenPerUser}
}
