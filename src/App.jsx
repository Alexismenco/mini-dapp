import { useState, useEffect } from 'react';
import CreateTokenForm from './components/CreateTokenForm';
import TokenDashboard from './components/TokenDashboard';
import { TonConnectUI } from '@tonconnect/ui';


// Eliminamos import { tonConnect } desde utils, creamos la instancia aquí
function Banner() {
  return (
    <div className="w-full h-32 mb-6 relative overflow-hidden rounded-b-3xl shadow-2xl"
         style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7, #10b981)', backgroundSize: '300% 100%', animation: 'gradientShift 10s ease infinite' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white drop-shadow-[0_0_15px_rgba(0,245,255,0.8)]">
          💎 Pump Your TON Token – ¡Crea, Lanza y Distribuye!
        </h2>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-white/60 rounded-full animate-float"
               style={{
                 top: `${Math.random()*100}%`,
                 left: `${Math.random()*100}%`,
                 animationDelay: `${Math.random()*5}s`,
                 animationDuration: `${5 + Math.random()*5}s`
               }} />
        ))}
      </div>

      <style>
        {`
          @keyframes gradientShift {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }

          @keyframes float {
            0% {transform: translateY(0);}
            50% {transform: translateY(-20px);}
            100% {transform: translateY(0);}
          }

          .animate-float { animation: float 6s ease-in-out infinite; }
        `}
      </style>
    </div>
  )
}
function App() {
  const [wallet, setWallet] = useState(null);
  const [tonConnectUI, setTonConnectUI] = useState(null);

  useEffect(() => {
    const tonConnectInstance = new TonConnectUI({
      manifestUrl: 'https://www.tonpulse.fun/tonconnect-manifest.json',
    });

    tonConnectInstance.onStatusChange((walletInfo) => {
      setWallet(walletInfo ? walletInfo.account.address : null);
    });

    setTonConnectUI(tonConnectInstance);
  }, []);

const handleWalletButton = async () => {
  if (!tonConnectUI) return;

  if (wallet) {
    tonConnectUI.disconnect();
  } else {
    await tonConnectUI.connectWallet();
  }
};


  return (
    <div className="min-h-screen bg-metallicDark flex flex-col items-center p-6">
      <Banner />

      <header className="w-full flex justify-between items-center max-w-6xl mb-10">
        <h1 className="text-4xl font-orbitron font-bold text-neonBlue">TON Token Creator</h1>
        <button
          onClick={handleWalletButton}
          className="py-2 px-4 rounded-xl bg-gradient-to-r from-neonGreen via-neonBlue to-neonPurple text-black font-orbitron font-bold shadow-lg hover:scale-105 transform transition duration-300"
        >
          {wallet ? 'Desconectar Wallet' : 'Conectar Wallet'}
        </button>
      </header>

      {/* Pasamos props */}
      <CreateTokenForm wallet={wallet} tonConnectUI={tonConnectUI} />

      {wallet && <TokenDashboard wallet={wallet} />}
    </div>
  );
}

export default App;
