# NEARFLIX
Simple Decentralize User Authorization App, it checks if User Exists it gives access to main page if not so it not allowed to login, and also gets NEAR Token to create account if no NEAR Token not allowed to create account.

## Requirments
- Install Node.js 
- Install Yarn `npm install --global yarn` OR `npm i -g yarn`
- Install NEAR CLI `npm install --global near-cli`
- Get NEAR testnet wallet. [NEAR TESTNET WALLET](https://wallet.testnet.near.org/)

## Deploy
To Deploy your project you have to login to NEAR Testnet Account, Run codes in Terminal.
- Run `near login`, and follow the instructions it gives you.
- Add this code in package.json file under "scripts:" to make eaasy Build & Deploy  `"deploy": "yarn build:release && near dev-deploy ./build/release/simple.wasm"`
- Set variable dev-id to CONTRACT.`export CONTRACT=dev###-###` & `echo $CONTRACT`

## Usage

- Try to create User account without --amount and with no name.
`near call $CONTRACT newUser '{"name":""}' --accountId <'YOUR-TESTNET-NAME'> --amount 1` // Errorr no name
`near call $CONTRACT newUser '{"name":"lal"}' --accountId <'YOUR-TESTNET-NAME'>` // Errorr no amount attached
`near call $CONTRACT newUser '{"name":"lal"}' --accountId <'YOUR-TESTNET-NAME'> --amount 1` //Success

- View All Users.
`near view $CONTRACT usersList`

- Login with User Id
`near call $CONTRACT userLogin '{"userId":###}' --accountId <'YOUR-TESTNET-NAME'>`
`near call $CONTRACT userLogin '{"userId":###1}' --accountId <'YOUR-TESTNET-NAME'>` // wrong User Id it gives errorr to login

- Delete User
`near call $CONTRACT deleteUser '{"userId":##}' --accountId l<'YOUR-TESTNET-NAME'>`
`near call $CONTRACT userLogin '{"userId":##}' --accountId <'YOUR-TESTNET-NAME'>` // Test if User can Login


## The file system

```sh
├── README.md                          # this file
├── as-pect.config.js                  # configuration for as-pect (AssemblyScript unit testing)
├── asconfig.json                      # configuration for AssemblyScript compiler (supports multiple contracts)
├── package.json                       # NodeJS project manifest
├── scripts
│   ├── 1.dev-deploy.sh                # helper: build and deploy contracts
│   ├── 2.use-contract.sh              # helper: call methods on ContractPromise
│   ├── 3.cleanup.sh                   # helper: delete build and deploy artifacts
│   └── README.md                      # documentation for helper scripts
├── src
│   ├── as_types.d.ts                  # AssemblyScript headers for type hints
│   ├── simple                         # Contract 1: "Simple example"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for contract 1
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for contract 1
│   ├── singleton                      # Contract 2: "Singleton-style example"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for contract 2
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for contract 2
│   ├── tsconfig.json                  # Typescript configuration
│   └── utils.ts                       # common contract utility functions
└── yarn.lock                          # project manifest version lock
```

## Loom Video Link
- [Loom Video Part I](https://www.loom.com/share/0d361fff8a9f4a378b143abdaafb3ad3)
- [Loom Video Part II](https://www.loom.com/share/e49443543af64dd493c6f0129f79c9fb)