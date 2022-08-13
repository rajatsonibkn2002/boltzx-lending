import { tezos } from "./tezos";

export const lendMoneyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1CXeshbqQRP9J2AkxNph9MgKMmuJfNGu6a");
        const op = await contract.methods.lend_money().send({amount: Number(prompt("Enter Amount (in Tez)")), mutez: false});
        await op.confirmation(1);
    } catch(err) {
        console.log(err)
        if(err.description.includes("aborted by the user")) {
            throw new Error("Operation aborted by the user!")
        }
        else if(err.data[0].id.includes("balance_too_low")){
            throw new Error("Not Enough Balance!")
        }
        else{
            throw err.data[1].with.string;
        }
        
    }
};

export const withdrawMoneyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1CXeshbqQRP9J2AkxNph9MgKMmuJfNGu6a");
        const op = await contract.methods.withdraw_money().send();
        await op.confirmation(1);
    } catch(err) {
        if(err.description.includes("aborted by the user")) {
            throw new Error("Operation aborted by the user!")
        }else{
            throw err.data[1].with.string;
        }
    }
};
