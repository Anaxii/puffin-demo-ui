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
import {KYC_URL} from "./constants/Global";
import {GetDomain, GetDomains} from "./helpers/domain";

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
  const [name, setName] = useState("")
  const [domains, setDomains] = useState([])
  const [balances, setBalances] = useState({
    avax: BigInt(0),
    pfn: BigInt(0),
    fuji_wavax: BigInt(0),
    pfn_wavax: BigInt(0)
  })


  const [refreshTimer, setRefreshTimer] = useState(null)

  const updateBalances = async () => {
    let _domains = await GetDomains(account)
    setDomains(_domains)
    let _name = await GetDomain(account)
    setName(_name)
    let _balances = await GetBalances(account)
    setBalances(_balances)
  }

  const refreshData = async () => {
    if (!account)
      return

    if (account && provider && web3)
      await updateBalances()

    if ((!_disconnect && status != "") || status == "approved")
      return


    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          wallet_address: account.toLowerCase(),
        })
    };

    if (!account.toLowerCase())
      return

    fetch(KYC_URL + '/status', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.status == "nonExist") {
          setPage("signUp")
        }
        setStatus(data.status)
      }).catch((err) => {
      return false
    });

  }

  useEffect(() => {
    if (!account) {
      // setWindowAccount()
    }
    if (provider) {

      setWeb3Data()
      provider.on("accountsChanged", (accounts) => {
        refreshData()
        setWeb3Data()
      });
      // provider.on("chainChanged", async (chainId) => {
      //   setCurrentChainID(parseInt(chainId))
      //   setWeb3Data()
      // });
      provider.on("accountsChanged", async (accounts) => {
        updateBalances()
      });
    }
  }, [provider])


  useEffect(() => {
    if (provider) {
      refreshData()
      const timer = window.setInterval(() => {
        refreshData()
      }, 10000);
      return () => {
        window.clearInterval(timer);
      };
    }
  }, [account, provider, web3])

  const setWeb3Data = async () => {
    if (!provider)
      return
    let _web3 = await new Web3(provider);
    let _account = await _web3.eth.getAccounts();

    setAccount(_account[0])
    setWeb3(_web3)

    await refreshData()
  }

  const disconnect = async () => {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER")
    setDisconnect(true)
    setProvider(null)
    setWeb3(null)
    setStatus("")
    setAccount("")
    setReady(false)
  }

  return (
    <div className="App">
      <Web3Context.Provider value={{web3, provider, account, refreshData, updateBalances, domains, GetAllowance}}>
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
        {status == "" || status == "denied" || status == "nonExist" || _disconnect ?
          <div>
            <div style={{borderRadius: "0.25px"}}>
              <Container component="main" maxWidth="xs">
                <img width={"100%"} src={header}/>

              </Container>

            </div>
            {page == "signIn" &&
            <SignIn account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                    connecting={connecting} loadingMessage={loadingMessage} chainID={currentChainID} setPage={setPage}
                    setStatus={setStatus} setDisconnect={setDisconnect} setWeb3Data={setWeb3Data}/>
            }
            {page == "signUp" &&
            <SignUp account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                    connecting={connecting} loadingMessage={loadingMessage} chainID={currentChainID} setPage={setPage}
                    setStatus={setStatus} setDisconnect={setDisconnect}/>
            }

          </div>
          :
          <div>
            <Navigation account={account} balances={balances}/>
            {status == "pending" ?
              <div>
                <Pending setStatus={setStatus} account={account} setShowLoadingModal={setShowLoadingModal}/>
              </div>
              :
              <div>
                <Approved disconnect={disconnect} name={name} account={account} setProvider={setProvider}
                          setWeb3={setWeb3} setConnecting={setConnecting}
                          connecting={connecting} chainID={currentChainID} status={status} setStatus={setStatus}
                          balances={balances}/>
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
