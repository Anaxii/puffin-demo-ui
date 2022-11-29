import './App.css';
import SignUp from "./components/SignUp/SignUp.tsx";
import SignIn from "./components/SignIn/SignIn.tsx";
import Pending from "./components/Pending/Pending.tsx";

import Web3Modal from 'web3modal'
import {Web3Context} from "./helpers/context.tsx"
import {ToastContainer} from 'react-toastify';
import LoadingModal from "./components/LoadingModal/LoadingModal.tsx";
import {useEffect, useState} from 'react';
import Web3 from "web3";
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./components/Navigation/Navigation";
import Approved from "./components/Approved/Approved";

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


  const [refreshTimer, setRefreshTimer] = useState(null)

  useEffect(() => {
  }, [_disconnect])

  const refreshData = async () => {
    if (!provider  || !account) {
      setStatus("")
      return
    }

    // if (_disconnect)
    //   return
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          wallet_address: account.toLowerCase(),
        })
    };
    fetch('http://localhost:8080/status', requestOptions)
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
    console.log(provider, account, status, page)
    if (provider && account && web3 && !ready) {
      setConnecting(false)
      setReady(true)
      refreshData()

      setRefreshTimer(setInterval(refreshData, 10000))
    }
  }, [account, provider, web3])

  const setWeb3Data = async () => {
    let _web3 = await new Web3(provider);
    let chainID = await _web3.eth.getChainId()
    if (window.ethereum != undefined) {
      chainID =  Number(window.ethereum.chainId)
    }
    setCurrentChainID(chainID)
    setLoadingMessage("Loading account")
    let _account = await _web3.eth.getAccounts();
    console.log(_account)


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
      <Web3Context.Provider value={{web3, provider, account, refreshData}}>
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
            <Navigation account={account} disconnect={disconnect} />
            {status == "pending" ?
            <div>
              <Pending setShowLoadingModal={setShowLoadingModal} />
            </div>
            :
              <div>
                <Approved account={account} setProvider={setProvider} setWeb3={setWeb3} setConnecting={setConnecting}
                          connecting={connecting} chainID={currentChainID} setStatus={setStatus} />
              </div>
            }
          </div>
        }

        {showLoadingModal && <LoadingModal/>}
      </Web3Context.Provider>

    </div>
  );
}

export default App;
