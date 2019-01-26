console.log('Web3 Plugin')

import Web3 from 'web3'
// import Vue from 'vue'

const web3 = ({ app }, inject) =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      console.log('Window Loaded.')
      if (window.ethereum) {
        console.log('Injected web3 detected in modern browser.')
        const web3 = new Web3(window.ethereum)
        try {
          // Request account access if needed
          await window.ethereum.enable()
          // Acccounts now exposed
          resolve(web3)
        } catch (error) {
          reject(error)
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3
        console.log('Injected web3 detected on legacy browser.')
        resolve(web3)
      }
      // Fallback to localhost.
      else {
        const provider = new Web3.providers.HttpProvider(
          'http://127.0.0.1:8545'
        )
        const web3 = new Web3(provider)
        window.web3 = web3
        console.log('No web3 instance injected, using Local web3.')
        resolve(web3)
      }
    })
  })
    .then(res => {
      // Vue.prototype.$web3 = res
      inject('web3', res)
      console.log('App', app)

      console.log('Web3 Injected!', res.version)
    })
    .catch(err => {
      console.log('Error Injecting Web3.', err)
    })

export default web3
