import { useEffect, useState } from "react";
import { connectWallet, getAccount } from "../utils/wallet";

const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      const activeAccount = await getAccount();
      setAccount(activeAccount);
    })();
  }, []);

  const onConnectWallet = async () => {
    await connectWallet();
    const activeAccount = await getAccount();
    setAccount(activeAccount);
  };

  return (
    <div className="navbar fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          BoltzX
        </a>
        <div className="d-flex">
          <button onClick={onConnectWallet} className="btn wallet btn-outline-info">
            {account!=="" ? account : 'CONNECT WALLET'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
