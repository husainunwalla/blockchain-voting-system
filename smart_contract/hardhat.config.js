//https://eth-ropsten.alchemyapi.io/v2/sSw5XVo_FopDhPlQ-v68x7znBvFGQX27
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/sSw5XVo_FopDhPlQ-v68x7znBvFGQX27',
      accounts: ['93623697573dd5751fd6371eadf425068a9328ea03571ddc80d6143893130f9c']
    }
  }
}