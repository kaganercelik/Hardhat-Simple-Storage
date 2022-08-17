import 'hardhat-gas-reporter'
import './tasks/block-number'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'
import '@nomiclabs/hardhat-etherscan'
import 'solidity-coverage'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'

/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL =
    process.env.RINKEBY_RPC_URL || 'https://eth-rinkeby/example'
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey'
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'key'
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || 'key'

module.exports = {
    solidity: '0.8.8',
    defaultNetwork: 'hardhat',
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: 'gas-report.json',
        noColors: true,
        currency: 'USD',
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: 'MATIC',
    },
}
