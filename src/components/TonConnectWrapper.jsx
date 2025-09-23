import { useEffect, useState } from 'react';

export default function App() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const tonConnectUI = new window.TON_CONNECT_UI.TonConnectUI({
      manifestUrl: 'https://www.tonpulse.fun/tonconnect-manifest.json',
      buttonRootId: 'ton-connect-button'
    });

    tonConnectUI.onStatusChange((w) => {
      setWallet(w);
    });
  }, []);

  return (
    <div className='mx-auto text-neonBlue'>
      <div id="ton-connect-button"></div>
      {wallet && <button>Pagar Ahora</button>}
    </div>
  );
}
