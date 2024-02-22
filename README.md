# Red Packet

This repo contains a set of code, including EVM smart contract files and a NextJS web app, that powered https://redpacket.magic.link

Magic Link Red Packet is a Next.js web application that allows users to send and receive cryptocurrency "red packets" via EVM smart contracts on Base blockchain. With Magic wallets, users can create red packets with a specified amount of cryptocurrency and share them with others via a unique share link.

## Features

Create Red Packets: Users can create digital red packets with a specified amount of cryptocurrency.
Share via Link URL: Each red packet generates a unique link that can be shared with friends or family.
Claim Red Packets: Recipients can claim their share by accessing the magic link. This creates a new Magic wallet for the email used, and all of the claim processes and blockchain transactions are gas-subsidized by Alchemy's Account Abstraction + Paymaster

## Getting started

### Prerequisite

Node.js 20+

### Services needed to be set up

1. Magic dedicated app (https://dashboard.magic.link)
2. Alchemy Base App (https://dashboard.alchemy.com/apps)
3. Alchemy Gas Manager (https://dashboard.alchemy.com/gas-manager)

### Local environment setup

- Install [ni](https://github.com/antfu/ni), [bun](https://bun.sh/)

```bash
npm i -g @antfu/ni bun
```

- Install dependencies

```bash
ni
```

- Set environmental variables in .env.local

cp .env.example .env.local
Fill out .env.local with your own values
You could use `0xd92830984DfE878CB43E12D5B9Fe9c71Cb40C62b` as the red packet factory smart contract, or you could deploy your own (the instructions at the end of this file)

- Run the project

```bash
nr dev
```

- Open http://localhost:3009

## Red Packet Factory Smart Contract

While there is already a deployed factory contract on Base chain, you may want to modify and create your own version of this contract. For example, there is a possibility to make each user's receiving amount a random number, instead of TOTAL / # PACKETS (see CHOICE: line in RedPacket.sol).

Once you have your own files to deploy, you can follow the following steps:

- Set SEED phrase of your wallet to want deploy contract in scripts/deploy.ts

- Run the deploy script

```bash
nlx tsx scripts/deploy.ts
```

- Set contractAddress for getRedPacketFactoryAddress in src/config/client.ts (use the deployed contract's address from the output of the previous step)

Make sure that the top of deploy.ts file looks like this, if you're deploying to Base

const network: NETWORK = 'base'
const file = 'RedPacketFactory.sol'
const contractName = 'RedPacketFactory'

- NOTE: deployed Red Packet smart contracts have "expire()" function to reclaim all unclaimed packets and return the remaining ETH back to the creator. You can access this via the app at /reclaim page as well

# License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Other legal considerations

In deploying and using this repo, particularly if you plan to incorporate sweepstakes elements (where the amount a claimer wins is randomized), it is crucial to seek legal counsel. Some features can introduce complexities related to compliance with gambling laws, financial regulations, and digital asset taxation that vary significantly across jurisdictions.

### Factors to consider

- Compliance with Local Laws: Sweepstakes and any form of monetary distribution can be subject to strict regulations that differ by country and state. Legal experts can help ensure your implementation complies with all relevant laws, including those related to gambling and sweepstakes.

- Smart Contract and Transaction Regulations: The use of EVM smart contracts for transactions involves considerations around security, privacy, and financial regulations. Legal professionals can provide guidance on best practices and regulatory compliance.

- Gas Management Strategies: Implementing throttles and maximums to manage gas costs effectively involves financial decisions that could have legal implications. Legal counsel can offer advice on structuring these mechanisms in a compliant and efficient manner.

We strongly recommend consulting with legal professionals experienced in cryptocurrency, blockchain technology, and digital finance laws before launching your own platform. This will help ensure that your application operates within legal boundaries and avoids potential legal issues. The guidance provided here is not a substitute for professional legal advice. Your use of this repo must be in compliance with all applicable laws and regulations.
