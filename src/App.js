import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import { lendMoneyOperation, withdrawMoneyOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import { getAccount } from "./utils/wallet";

const App = () => {
  const [balance, setBalance] = useState(0);
  const [lendLoading, setLendLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const storage = await fetchStorage();
      const activeAccount = await getAccount();
      const lenders = storage.data.lenders
      setBalance(lenders[activeAccount] || 0);
    })();
  }, []);

  const updateBalance = async () => {
    const storage = await fetchStorage();
    const activeAccount = await getAccount();
    return storage.data.lenders[activeAccount]
  }

  const onLendMoney = async () => {
    try{
      setLendLoading(true);
      await lendMoneyOperation();
      setBalance(await updateBalance());
      alert("Transaction Confirmed!");
    } catch(err){
      alert("Transaction Failed: ", err.message);
    }
    setLendLoading(false);
  };

  const onWithDrawMoney = async () => {
    try {
      setWithdrawLoading(true);
      await withdrawMoneyOperation();
      setBalance(await updateBalance());
      alert("Transaction Confirmed!");
    } catch (err) {
      alert("Transaction Failed: ", err.message);
    }
    setWithdrawLoading(false);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="py-1">Your Balance: {balance} Mutez</div>
        <button onClick={onLendMoney} className="btn btn-primary btn-lg">
          { lendLoading === true ? "Loading..." : "Lend Money" }
        </button>
        <button onClick={onWithDrawMoney} className="btn btn-primary btn-lg">
          { withdrawLoading === true ? "Loading..." : "Withdraw Money" }
        </button>
      </div>
    </div>
  );
};

export default App;
