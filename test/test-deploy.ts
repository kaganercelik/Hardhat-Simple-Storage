const { ethers } = require('hardhat')
const { expect, assert } = require('chai')
import { SimpleStorage, SimpleStorage__factory } from '../typechain-types'

describe('SimpleStorage', () => {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage

    beforeEach(async () => {
        simpleStorageFactory = (await ethers.getContractFactory(
            'SimpleStorage'
        )) as SimpleStorage__factory

        simpleStorage = await simpleStorageFactory.deploy()
    })

    it('Should start with a favorite number of 0', async () => {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = 0
        assert.equal(currentValue.toString(), expectedValue.toString())
    })

    it('Should update when store is called with a value', async () => {
        const newValue = 42
        const txResponse = await simpleStorage.store(newValue)
        txResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), newValue.toString())
    })

    it('Should add person and its favorite number', async () => {
        let name = 'kagan'
        let favoriteNumber = 13
        const txResponse = await simpleStorage.addPerson(name, favoriteNumber)
        txResponse.wait(1)
        assert.equal(
            await simpleStorage.getPersonsFavoriteNumber(name),
            favoriteNumber
        )
    })
})
