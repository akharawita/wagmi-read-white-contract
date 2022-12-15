import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import ABI from "./abis/ABI.json";

import Profile from "./Profile";
import { ethers } from "ethers";

function App() {
  const { address, isConnected } = useAccount();

  // Read Contract
  const { data } = useContractRead({
    address: "0x9c44e4f71dc14c63F2cd7eA062Db9D60e2Da403d",
    abi: ABI,
    functionName: "getPositions",
    args: [address],
    enabled: isConnected,
    watch: true,
  });

  // White Contract
  const { config } = usePrepareContractWrite({
    address: "0x9c44e4f71dc14c63F2cd7eA062Db9D60e2Da403d",
    abi: ABI,
    functionName: "openPosition",
    args: [0, 100000000],
    enabled: isConnected,
  });
  const { write, isLoading: whiteIsLoading } = useContractWrite(config);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Profile />
        </div>

        <button disabled={!write} onClick={() => write?.()}>
          Open Position{whiteIsLoading ? "...." : null}
        </button>

        <div>Positions</div>
        <div>
          {data &&
            data.map((d) => (
              <div key={d[0]}>
                <div>Amount: {ethers.utils.formatUnits(d.amount, 8)}</div>
                <div>Price: {ethers.utils.formatUnits(d.entryPrice, 8)}</div>
                <hr />
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
