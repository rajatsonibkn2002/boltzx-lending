import { tezos } from "./tezos";

export const lendMoneyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1CXeshbqQRP9J2AkxNph9MgKMmuJfNGu6a");
        const op = await contract.methods.lend_money().send({amount: Number(prompt("Enter Amount (in Tez)")), mutez: false});
        await op.confirmation(1);
    } catch(err) {
        throw err;
    }
};

export const withdrawMoneyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1CXeshbqQRP9J2AkxNph9MgKMmuJfNGu6a");
        const op = await contract.methods.withdraw_money().send();
        await op.confirmation(1);
    } catch(err) {
        throw err;
    }
};
