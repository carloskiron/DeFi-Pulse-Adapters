/*==================================================
  Modules
  ==================================================*/

  const sdk = require('../../sdk');
  const _ = require('underscore');
  const BigNumber = require('bignumber.js');

/*==================================================
  Settings
  ==================================================*/

  // currently only works on v2, recent time frame (post MCD transition)
  const addressV2 = '0x498b3BfaBE9F73db90D252bCD4Fa9548Cd0Fd981';

/*==================================================
  Main
  ==================================================*/

  async function run(timestamp, block) {
    let wallets = (await sdk.api.util.getLogs({
      target: addressV2,
      topic: 'Created(address,address,address)',
      decodeParameter: 'address',
      fromBlock: 0,
      toBlock: block
    })).output;

    let balances = (await sdk.api.cdp.getAssetsLocked({
      block,
      targets: wallets
    })).output;

    return (await sdk.api.util.toSymbols(balances)).output;
  }

/*==================================================
  Exports
  ==================================================*/

  module.exports = {
    name: 'InstaDApp',
    token: null,
    category: 'Lending',
    contributesTo: ['Maker', 'Compound'],
    start: 1543622400,  // 12/01/2018 @ 12:00am (UTC)
    run
  }