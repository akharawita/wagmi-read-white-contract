import React, { useEffect, useState } from "react";

import { useAccount, useBalance, useProvider, useBlockNumber } from "wagmi";

import Trade from "./Trade";

const AccountDetail = () => {
  // const provider = useProvider();
  // const [bb, setBb] = useState();

  // const { data: dataBlockNumber } = useBlockNumber();

  const { address, isConnected, isConnecting } = useAccount();

  const { data } = useBalance({
    address,
  });

  // useEffect(() => {
  //   const getBB = async () => {
  //     return await provider.getBlockNumber();
  //   };

  //   getBB().then((v) => {
  //     setBb(v);
  //   });
  // }, [provider, dataBlockNumber]);

  if (isConnecting) return <div>Loading.......</div>;

  if (!isConnected) return <div>Please connect wallet.</div>;

  return (
    <div>
      <h1>Account Detail.</h1>
      <div>My Address: {address}</div>
      <div>
        Balance: {data?.formatted ?? 0} {data?.symbol}
      </div>

      <hr />
      <Trade />
    </div>
  );
};

export default AccountDetail;
