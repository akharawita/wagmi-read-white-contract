import React, { useState } from "react";

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import ABI1 from "./abis/ABI_1.json";
import { ethers } from "ethers";

const Trade = () => {
  const [token, setToken] = useState(0);
  const [value, setValue] = useState("1");

  const { data } = useContractRead({
    address: "0x6a4E0396D2a7f18FDeFCE810f20f656473Fe1D59",
    abi: ABI1,
    functionName: "getOnlyLossPosition",
  });

  const { data: dataPosition } = useContractRead({
    address: "0x6a4E0396D2a7f18FDeFCE810f20f656473Fe1D59",
    abi: ABI1,
    functionName: "getPosition",
    args: [0],
  });

  const { config } = usePrepareContractWrite({
    address: "0x6a4E0396D2a7f18FDeFCE810f20f656473Fe1D59",
    abi: ABI1,
    functionName: "openPosition",
    args: [token, ethers.utils.parseUnits(value, 18)],
  });
  const { data: dataForWrite, write } = useContractWrite(config);

  const handleOpenPosition = () => {
    write?.();
  };

  if (!data) return <div>No Data.</div>;

  console.log({
    dataForWrite,
  });

  return (
    <div>
      <button onClick={handleOpenPosition}>Open Position Click!</button>

      {value}
      <input
        type="number"
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />

      <select
        value={token}
        onChange={(event) => {
          setToken(event.target.value);
        }}
      >
        <option value={0}>BTC</option>
        <option value={1}>ETH</option>
      </select>

      <h1>Loss Positions</h1>
      {data.map((value, index) => {
        return (
          <div key={index}>
            <div>Address: {value.owner}</div>
            <div>Amount: {Number(value.amount) / 1e18} -</div>
            <div>realizePL: {ethers.utils.formatUnits(value.realizePL, 8)}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Trade;
