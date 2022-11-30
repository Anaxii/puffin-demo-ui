/* global BigInt */

import './App.css';
import SignUp from "./components/SignUp/SignUp.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";
import Pending from "./components/Pending/Pending.tsx";
import GetAllowance from "./helpers/Allowance"
import {Web3Context} from "./helpers/context.tsx"
import {ToastContainer} from 'react-toastify';
import LoadingModal from "./components/LoadingModal/LoadingModal.tsx";
import {useEffect, useState} from 'react';
import Web3 from "web3";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./components/Navigation/Navigation";
import Approved from "./components/Approved/Approved";
import {Copyright} from "./components/Copyright/Copyright";
import * as React from "react";
import {GetBalances} from "./helpers/Balances";
import header from "./assets/pfnheader.png";
import Container from "@mui/material/Container";
import {ThemeProvider} from "@mui/material/styles";

function App() {

  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState("")
  const [web3, setWeb3] = useState(null)
  const [ready, setReady] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [currentChainID, setCurrentChainID] = useState(1)
  const [loadingMessage, setLoadingMessage] = useState("Loading account")
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [status, setStatus] = useState("")
  const [page, setPage] = useState("signIn")
  const [_disconnect, setDisconnect] = useState(false)
  // eslint-disable-next-line no-undef
  const [balances, setBalances] = useState({
    avax: BigInt(0),
    pfn: BigInt(0),
    fuji_wavax: BigInt(0),
    pfn_wavax: BigInt(0)
  })


  const [refreshTimer, setRefreshTimer] = useState(null)

  useEffect(() => {
  }, [_disconnect])

  const updateBalances = async () => {
    let _balances = await GetBalances(account)
    setBalances(_balances)
    console.log(_balances)
  }

  const refreshData = async () => {
    if (!provider || !account) {
      setStatus("")
      return
    }

    await updateBalances()
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          wallet_address: account.toLowerCase(),
        })
    };
    fetch('https://kyc-testnet.thepuffin.network/status', requestOptions)
      .then(response => response.json())
      .then(data => {
        setStatus(data.status)
      }).catch((err) => {
      console.log(err)
      return false
    });

  }

  useEffect(() => {
    if (provider) {

      setWeb3Data()
      provider.on("accountsChanged", (accounts) => {
        disconnect()
        setDisconnect(true)
        setStatus("")

      });
      // provider.on("chainChanged", async (chainId) => {
      //   setCurrentChainID(parseInt(chainId))
      //   setWeb3Data()
      // });
      provider.on("accountsChanged", (accounts) => {
        console.log("account changed")
        setShowLoadingModal(true)
        setWeb3Data()
      });
    }
  }, [provider])

  useEffect(() => {
    if (provider && account && web3 && !ready) {
      setConnecting(false)
      setReady(true)
      refreshData()

      setRefreshTimer(setInterval(refreshData, 10000))
    }
  }, [account, provider, web3])

  const setWeb3Data = async () => {
    let _web3 = await new Web3(provider);
    // let chainID = await _web3.eth.getChainId()
    // if (window.ethereum != undefined) {
    //   chainID = Number(window.ethereum.chainId)
    // }
    // setCurrentChainID(chainID)
    setLoadingMessage("Loading account")
    let _account = await _web3.eth.getAccounts();

    setAccount(_account[0])
    setWeb3(_web3)

    await refreshData()

    setShowLoadingModal(false)
  }

  const disconnect = async () => {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
    setDisconnect(true)
    clearInterval(refreshTimer)
    setProvider(null)
    resetData()
  }

  const resetData = () => {
    setWeb3(null)
    setStatus("")
    setAccount("")
    setReady(false)
  }

  return (
    <div className="App">
      <Web3Context.Provider value={{web3, provider, account, refreshData, updateBalances, GetAllowance}}>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {status == "" || status == "denied" || _disconnect ?
          <div>
            <div style={{borderRadius: "0.25px"}}>
              <Container component="main" maxWidth="xs">
                <img width={"100%"} src={header}/>

              </Container>

            </div>
            {page == "signIn" &&
            <SignIn account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                    connecting={connecting} loadingMessage={loadingMessage} chainID={currentChainID} setPage={setPage}
                    setStatus={setStatus} setDisconnect={setDisconnect}/>
            }
            {page == "signUp" &&
            <SignUp account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                    connecting={connecting} loadingMessage={loadingMessage} chainID={currentChainID} setPage={setPage}
                    setStatus={setStatus} setDisconnect={setDisconnect}/>
            }

          </div>
          :
          <div>
            <Navigation account={account} disconnect={disconnect} balances={balances}/>
            {status == "pending" ?
              <div>
                <Pending setShowLoadingModal={setShowLoadingModal}/>
              </div>
              :
              <div>
                <Approved account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                          connecting={connecting} chainID={currentChainID} setStatus={setStatus} balances={balances}/>
              </div>
            }
          </div>
        }

        {showLoadingModal && <LoadingModal/>}
        <Copyright sx={{mt: 5}}/>

      </Web3Context.Provider>

    </div>
  );
}

export default App;
