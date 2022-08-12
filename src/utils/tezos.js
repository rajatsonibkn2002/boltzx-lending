import { wallet } from "./wallet";

import { TezosToolkit } from "@taquito/taquito";
export const tezos = new TezosToolkit("https://jakartanet.smartpy.io");

tezos.setWalletProvider(wallet)
