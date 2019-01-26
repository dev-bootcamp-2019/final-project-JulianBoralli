/* eslint-disable */
const TheToken = artifacts.require('TheToken')

contract('TheToken', function(accounts) {

  let theToken
  const admin = accounts[0]
  const alice = accounts[1]
  const bob = accounts[2]
  const charlie = accounts[3]
  let owner;

  beforeEach(async () => {
    // theToken = await TheToken.deployed()
    theToken = await TheToken.new(0, 'The', 18, 'THE', { from: accounts[0] });
    owner = await theToken.owner()
  });

  it("should define correct initial values", async() => {
    const totalSupply = await theToken.totalSupply()
    const name = await theToken.name()
    const symbol = await theToken.symbol()
    const decimals = await theToken.decimals()

    assert.equal(totalSupply.toNumber(), 0, 'the initial totalSupply should be 0')
    assert.equal(name, 'The', 'the name should be set to: The')
    assert.equal(symbol, 'THE', 'the symbol should be set to: THE')
    assert.equal(decimals, 18, 'the decimals set to: 18')
  })

  it("should have an owner with a balance of 0", async() => {
    const ownerBalance = await theToken.balanceOf(owner)

    assert.equal(admin, owner, 'the owner address should match admin address')
    assert.equal(ownerBalance.toNumber(), 0, 'the owner initial balance should be zero')
  })

  it("should be managed and idCounter set to 1", async() => {
    const idCounter = await theToken.idCounter()

    assert.equal(idCounter.toNumber(), 1, 'the staged transfer idCounter should be set to 1')
  })

  it("should revert a transfer without enough balance", async() => {
    let errorMessage = ''
    try {
      await theToken.transfer(bob, 100)
    } catch(err) {
      errorMessage = err.toString()
    }
    assert.isTrue(errorMessage.includes('revert'), 'the transfer error message shoudl contain revert')
  })

  it("should allow a user to give someone an allowance", async() => {
    let allowance = await theToken.allowance(alice, bob)
    assert.equal(allowance.toNumber(), 0, 'the initial allowance should be 0')

    await theToken.approve(bob, 100, {from: alice})

    allowance = await theToken.allowance(alice, bob)
    assert.equal(allowance.toNumber(), 100, 'the initial allowance should be 100')
  })

  it("should let an approved user transfer tokens", async() => {
    await theToken.approve(bob, 100, {from: alice})
    await theToken.buyTokens(alice, 100)
    let allowance = await theToken.allowance(alice, bob)
    let aliceBalance = await theToken.balanceOf(alice)
    let charlieBalance = await theToken.balanceOf(charlie)

    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    assert.equal(charlieBalance.toNumber(), 0, 'charlie initial balance should be 0')
    assert.equal(allowance.toNumber(), 100, 'the initial allowance should be 100')

    await theToken.transferFrom(alice, charlie, 100, {from: bob})

    allowance = await theToken.allowance(alice, bob)
    aliceBalance = await theToken.balanceOf(alice)
    charlieBalance = await theToken.balanceOf(charlie)
    
    assert.equal(aliceBalance.toNumber(), 0, 'alice new balance should be 0')
    assert.equal(charlieBalance.toNumber(), 100, 'charlie new balance should be 100')
    assert.equal(allowance.toNumber(), 0, 'the new allowance should be 0')
  })

  // Minted Interface Tests

  it("should allow the owner to mint new tokens", async() => {
    let ownerBalance = await theToken.balanceOf(owner)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 0, 'the initial totalSupply should be 0')
    assert.equal(ownerBalance.toNumber(), 0, 'the owner initial balance should be 0')
 
    await theToken.mintTokens(100)
    ownerBalance = await theToken.balanceOf(owner)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the new totalSupply should be 100')
    assert.equal(ownerBalance.toNumber(), 100, 'the new owner balance should be 100')
  })

  it("should allow the owner to burn tokens", async() => {
    await theToken.mintTokens(100)
    let ownerBalance = await theToken.balanceOf(owner)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(ownerBalance.toNumber(), 100, 'the owner initial balance should be 100')
 
    await theToken.burnTokens(100)
    ownerBalance = await theToken.balanceOf(owner)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 0, 'the new totalSupply should be 0')
    assert.equal(ownerBalance.toNumber(), 0, 'the new owner balance should be 0')
  })

  // Marketed Interface Tests

  it("should not allow someone, other than the owner, to call buyTokens", async() => {
    let aliceBalance = await theToken.balanceOf(alice)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(aliceBalance.toNumber(), 0, 'alice initial balance should be 0')
    assert.equal(totalSupply.toNumber(), 0, 'the initial totalSupply should be 0')

    try {
      await theToken.buyTokens(alice, 100, {from: bob})
    } catch (err) {
      errorMessage = err.toString()
      // console.log('errorMessage',errorMessage)
    }
    aliceBalance = await theToken.balanceOf(alice)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 0, 'the totalSupply should be 0')
    assert.equal(aliceBalance.toNumber(), 0, 'the new alice balance should be 0')
  })

  it("should allow a buyer to buy tokens", async() => {
    let aliceBalance = await theToken.balanceOf(alice)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 0, 'the initial totalSupply should be 0')
    assert.equal(aliceBalance.toNumber(), 0, 'alice initial balance should be 0')
    
    await theToken.buyTokens(alice, 100)
    aliceBalance = await theToken.balanceOf(alice)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the new totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'the new alice balance should be 100')
  })

  it("should not allow someone, other than the owner, to call sellTokens", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')

    try {
      await theToken.sellTokens(alice, 100, {from: bob})
    } catch (err) {
      errorMessage = err.toString()
      // console.log('errorMessage',errorMessage)
    }
    aliceBalance = await theToken.balanceOf(alice)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the totalSupply should still be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice balance should still be 100')
  })

  it("should allow a seller to sell tokens", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    
    await theToken.sellTokens(alice, 100)
    aliceBalance = await theToken.balanceOf(alice)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 0, 'the new totalSupply should be 0')
    assert.equal(aliceBalance.toNumber(), 0, 'the new alice balance should be 0')
  })

  it("should not allow a seller to sell tokens in case of emergency", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    
    await theToken.protectContract(true)
    try {
      await theToken.sellTokens(alice, 100)
    } catch (err) {
      // console.log('Error', err.toString())
      errorMessage = err.toString()
    }
    assert.isTrue(errorMessage.includes('emergency'), 'the transfer error message should contain emergency')

    aliceBalance = await theToken.balanceOf(alice)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the totalSupply should still be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice balance should still be 100')
  })
  
  it("should allow transfers of tokens", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let bobBalance = await theToken.balanceOf(bob)
    let totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    assert.equal(bobBalance.toNumber(), 0, 'bob initial balance should be 0')
    
    await theToken.transfer(bob, 100, {from: alice})
    
    aliceBalance = await theToken.balanceOf(alice)
    bobBalance = await theToken.balanceOf(bob)
    totalSupply = await theToken.totalSupply()
    
    assert.equal(totalSupply.toNumber(), 100, 'the new totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 0, 'the new alice balance should be 0')
    assert.equal(bobBalance.toNumber(), 100, 'the new bob balance should be 100')
  })

  it("should allow users to stage a transfer.", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let ownerBalance = await theToken.balanceOf(owner)
    let totalSupply = await theToken.totalSupply()
    let stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    assert.equal(ownerBalance.toNumber(), 0, 'owner initial balance should be 0')
    assert.equal(stagedTransfer[0], 0x0, 'stagedTransfer from field should be 0x0')
    assert.equal(stagedTransfer[1], 0x0, 'stagedTransfer to field should be 0x0')
    assert.equal(stagedTransfer[2], 0, 'stagedTransfer value field should be 0')
    
    await theToken.stageTransfer(bob, 100, {from: alice})
    
    aliceBalance = await theToken.balanceOf(alice)
    ownerBalance = await theToken.balanceOf(owner)
    totalSupply = await theToken.totalSupply()
    stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the new totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 0, 'the new alice balance should be 0')
    assert.equal(ownerBalance.toNumber(), 100, 'the new owner balance should be 100')
    assert.equal(stagedTransfer[0], alice, 'stagedTransfer from field should be alice address')
    assert.equal(stagedTransfer[1], bob, 'stagedTransfer to field should be bob address')
    assert.equal(stagedTransfer[2], 100, 'stagedTransfer value field should be 100')
  })

  it("should not allow users to stage a transfer, without enough funds.", async() => {
    await theToken.buyTokens(alice, 100)
    let aliceBalance = await theToken.balanceOf(alice)
    let ownerBalance = await theToken.balanceOf(owner)
    let totalSupply = await theToken.totalSupply()
    let stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice initial balance should be 100')
    assert.equal(ownerBalance.toNumber(), 0, 'owner initial balance should be 0')
    assert.equal(stagedTransfer[0], 0x0, 'stagedTransfer from field should be 0x0')
    assert.equal(stagedTransfer[1], 0x0, 'stagedTransfer to field should be 0x0')
    assert.equal(stagedTransfer[2], 0, 'stagedTransfer value field should be 0')
    
    try {
      await theToken.stageTransfer(bob, 101, {from: alice})
    } catch (err) {
      // console.log('Error', err.toString())
    }
    
    aliceBalance = await theToken.balanceOf(alice)
    ownerBalance = await theToken.balanceOf(owner)
    totalSupply = await theToken.totalSupply()
    stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the totalSupply should be 100')
    assert.equal(aliceBalance.toNumber(), 100, 'alice balance should still be 100')
    assert.equal(ownerBalance.toNumber(), 0, 'the owner balance should be still be 0')
    assert.equal(stagedTransfer[0], 0x0, 'stagedTransfer from field should still be 0x0')
    assert.equal(stagedTransfer[1], 0x0, 'stagedTransfer to field should still be 0x0')
    assert.equal(stagedTransfer[2], 0, 'stagedTransfer value field should still be 0')
  })

  it("should allow the owner to commit a transfer.", async() => {
    await theToken.buyTokens(alice, 100)
    await theToken.stageTransfer(bob, 100, {from: alice})
    let ownerBalance = await theToken.balanceOf(owner)
    let aliceBalance = await theToken.balanceOf(alice)
    let bobBalance = await theToken.balanceOf(bob)
    let totalSupply = await theToken.totalSupply()
    let stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(ownerBalance.toNumber(), 100, 'owner initial balance should be 100')
    assert.equal(aliceBalance.toNumber(), 0, 'alice initial balance should be 0')
    assert.equal(bobBalance.toNumber(), 0, 'bob initial balance should be 0')
    assert.equal(stagedTransfer[0], alice, 'stagedTransfer from field should be alice address')
    assert.equal(stagedTransfer[1], bob, 'stagedTransfer to field should be bob address')
    assert.equal(stagedTransfer[2], 100, 'stagedTransfer value field should be 100')
    
    await theToken.commitTransfer(1)
    
    ownerBalance = await theToken.balanceOf(owner)
    aliceBalance = await theToken.balanceOf(alice)
    bobBalance = await theToken.balanceOf(bob)
    totalSupply = await theToken.totalSupply()
    stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the totalSupply should still be 100')
    assert.equal(ownerBalance.toNumber(), 0, 'the new owner balance should be 0')
    assert.equal(aliceBalance.toNumber(), 0, 'alice balance should be 0')
    assert.equal(bobBalance.toNumber(), 100, 'bob balance should be 100')
    assert.equal(stagedTransfer[0], 0x0, 'stagedTransfer from field should be 0x0')
    assert.equal(stagedTransfer[1], 0x0, 'stagedTransfer to field should be 0x0s')
    assert.equal(stagedTransfer[2], 0, 'stagedTransfer value field should be 0')
  })

  it("should revert a commit of a transfer that does not exist.", async() => {
    await theToken.buyTokens(alice, 100)
    await theToken.stageTransfer(bob, 100, {from: alice})
    
    try {
      await theToken.commitTransfer(2)
    } catch (err) {
      // console.log('Error', err.toString())
      errorMessage = err.toString()
    }
    assert.isTrue(errorMessage.includes('revert'), 'the transfer error message shoudl contain revert')
  })

  it("should only allow the owner to commit a transfer.", async() => {
    await theToken.buyTokens(alice, 100)
    await theToken.stageTransfer(bob, 100, {from: alice})
    
    try {
      await theToken.commitTransfer(1, {from: charlie})
    } catch (err) {
      // console.log('Error', err.toString())
      errorMessage = err.toString()
    }
    assert.isTrue(errorMessage.includes('revert'), 'the transfer error message shoudl contain revert')
  })

  it("should allow the owner to revert a transfer.", async() => {
    await theToken.buyTokens(alice, 100)
    await theToken.stageTransfer(bob, 100, {from: alice})
    let ownerBalance = await theToken.balanceOf(owner)
    let aliceBalance = await theToken.balanceOf(alice)
    let bobBalance = await theToken.balanceOf(bob)
    let totalSupply = await theToken.totalSupply()
    let stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the initial totalSupply should be 100')
    assert.equal(ownerBalance.toNumber(), 100, 'owner initial balance should be 100')
    assert.equal(aliceBalance.toNumber(), 0, 'alice initial balance should be 0')
    assert.equal(bobBalance.toNumber(), 0, 'bob initial balance should be 0')
    assert.equal(stagedTransfer[0], alice, 'stagedTransfer from field should be alice address')
    assert.equal(stagedTransfer[1], bob, 'stagedTransfer to field should be bob address')
    assert.equal(stagedTransfer[2], 100, 'stagedTransfer value field should be 100')
    
    await theToken.revertTransfer(1)
    
    ownerBalance = await theToken.balanceOf(owner)
    aliceBalance = await theToken.balanceOf(alice)
    bobBalance = await theToken.balanceOf(bob)
    totalSupply = await theToken.totalSupply()
    stagedTransfer = await theToken.stagedTransfers(1)
    
    assert.equal(totalSupply.toNumber(), 100, 'the totalSupply should still be 100')
    assert.equal(ownerBalance.toNumber(), 0, 'the new owner balance should be 0')
    assert.equal(aliceBalance.toNumber(), 100, 'alice balance should be 0')
    assert.equal(bobBalance.toNumber(), 0, 'bob balance should be 100')
    assert.equal(stagedTransfer[0], 0x0, 'stagedTransfer from field should be 0x0')
    assert.equal(stagedTransfer[1], 0x0, 'stagedTransfer to field should be 0x0s')
    assert.equal(stagedTransfer[2], 0, 'stagedTransfer value field should be 0')
  })

})


