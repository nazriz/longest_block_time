const { ethers } = require("ethers");
const network = "homestead";

const provider = ethers.getDefaultProvider(network, {
    etherscan: 'API_KEY'
    // infura: 'API_KEY'
});

async function getBlock(startBlock, endBlock) {
    const obj = {}

    for (let i = startBlock; i <= endBlock; i++) {
        let x = 0
        x = i
        x -= 1
        const block1 = await provider.getBlock(x)
        const block2 = await provider.getBlock(i)
        const block1Num = block1.number
        const block2Num = block2.number
        console.log(`${block1Num}: ${block1.timestamp}`)
        console.log(`${block2Num}: ${block2.timestamp}`)
        const difference = (block2.timestamp % block1.timestamp)
        console.log(difference)
        obj[block2Num] = difference
        let remainingBlocks = (endBlock - i)
        console.log(`Remaining Blocks: ${remainingBlocks}`)
    }

    const startBlockStr = startBlock.toString();
    const endBlockStr = endBlock.toString();
    const blockTimesRange = startBlockStr + "-" + endBlockStr
    const fs = require('fs');

    const data = JSON.stringify(obj);

    fs.writeFile(blockTimesRange + '.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("BlockTimes data has been saved")
    });
}




let blockTimes = getBlock(0, 5000);
console.log(blockTimes)

let blockTimes2 = getBlock(5000, 10000);
console.log(blockTimes2)

let blockTimes3 = getBlock(10000, 15000);
console.log(blockTimes3)

let blockTimes4 = getBlock(15000, 20000);
console.log(blockTimes4)

let blockTimes5 = getBlock(20000, 25000);
console.log(blockTimes5)
