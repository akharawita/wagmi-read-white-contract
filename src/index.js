import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { bscTestnet } from "wagmi/chains";

const { provider, webSocketProvider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain === 97) {
          return {
            http: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          };
        }
        return {
          http: "https://data-seed-prebsc-2-s2.binance.org:8545/",
        };
      },
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
