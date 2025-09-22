import { useState } from 'react';
import TonConnectWrapper from './TonConnectWrapper';
import { supabase } from '../utils/supabaseClient';

export default function CreateTokenForm({wallet, tonConnectUI}) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [decimals, setDecimals] = useState(9);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handlePaymentSuccess = (boc) => {
    setTxHash(boc);
    setPaymentConfirmed(true);
    // Guardar token en Supabase después del pago
    saveToken();
  };

  const saveToken = async () => {
    const { error } = await supabase.from('tokens').insert([{
      name,
      symbol,
      supply,
      decimals,
      owner_wallet: "WALLET_CONECTADA", // luego podemos obtener dinámicamente
      contract_address: "0:SIMULADO",
      liquidity_added: false
    }]);
    if (error) console.error(error);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-metallicGray/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-orbitron font-bold mb-5 text-neonBlue text-center">Crear Token TON</h2>
      <input className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonBlue text-white focus:ring-2 focus:ring-neonBlue" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonPurple text-white focus:ring-2 focus:ring-neonPurple" placeholder="Símbolo" value={symbol} onChange={e => setSymbol(e.target.value)} />
      <input className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonGreen text-white focus:ring-2 focus:ring-neonGreen" placeholder="Cantidad total" value={supply} onChange={e => setSupply(e.target.value)} />
      <input className="w-full p-3 mb-4 rounded-xl bg-black/50 border border-gray-600 placeholder-white text-white focus:ring-2 focus:ring-neonBlue" placeholder="Decimales" value={decimals} onChange={e => setDecimals(e.target.value)} />
      
      {wallet && !paymentConfirmed && tonConnectUI && (
        <TonConnectWrapper
          toWallet="DIRECCION_DEL_RECIBO"
          amountNano={3e9}
          memo={`Pago token ${name || 'SIN-NOMBRE'}`}
          onPaid={handlePaymentSuccess}
          tonConnectUI={tonConnectUI}
        />
      )}

      {paymentConfirmed && <p className="text-neonGreen font-orbitron text-center mt-4">¡Pago confirmado! TxHash: {txHash}</p>}
    </div>
  )
}

