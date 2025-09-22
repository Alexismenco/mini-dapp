import { useEffect, useState } from 'react';

export default function App() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const tonConnectUI = new window.TON_CONNECT_UI.TonConnectUI({
      manifestUrl: 'http://localhost:5173/tonconnect-manifest.json',
      buttonRootId: 'ton-connect-button'
    });

    tonConnectUI.onStatusChange((w) => {
      setWallet(w);
    });
  }, []);

  return (
    <div>
      <div id="ton-connect-button"></div>
      {wallet && <button>Pagar Ahora</button>}
    </div>
  );
}
