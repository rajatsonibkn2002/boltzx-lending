import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
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
      setBalance(lenders[activeAccount]/1000000 || 0);
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
    <div className="box h-100">
      <Navbar />
      <div className="content">
        <div className="d-flex align-items-center h-100 btns">
          <button onClick={onLendMoney} className="btn-lend btn-primary btn-lg">
            { lendLoading === true ? "LOADING..." : "LEND" }
          </button>
          <div className="balance">Balance: {balance} Tez</div>
          <button onClick={onWithDrawMoney} className="btn-withdraw btn-primary btn-lg">
            { withdrawLoading === true ? "LOADING..." : "WITHDRAW" }
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
