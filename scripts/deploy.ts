import { ethers, run, network } from 'hardhat'
import 'dotenv/config'

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    )

    console.log('Deploying the contract...')
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log('The contract address is:', simpleStorage.address)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log('Waiting for block confirmation...')
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is : ${currentValue}`)

    //  Update the value

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is : ${updatedValue}`)
}

async function verify(contractAddress: string, args: any[]) {
    console.log('Verifying the contract...')
    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (err: any) {
        if (err.message.toLowerCase().includes('already verified')) {
            console.log('The contract is already verified')
        } else {
            console.error(err)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
