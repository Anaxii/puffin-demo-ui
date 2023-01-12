// 'https://kyc-testnet.thepuffin.network' 'http://localhost:8080'
let prod = false
export const KYC_URL = prod ? 'https://kyc-testnet.thepuffin.network/kyc' : "http://localhost:8080/kyc"
export const ACCOUNT_URL = prod ? 'https://kyc-testnet.thepuffin.network/users' : "http://localhost:8081/users"
export const CLIENT_URL = prod ? 'https://kyc-testnet.thepuffin.network/clients' : "http://localhost:8082/clients"
