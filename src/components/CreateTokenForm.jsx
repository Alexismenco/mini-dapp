import { useState } from 'react';
import TonConnectWrapper from './TonConnectWrapper';
import { supabase } from '../utils/supabaseClient';
import { X } from 'lucide-react';

export default function CreateTokenForm({ wallet, tonConnectUI }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [decimals, setDecimals] = useState(9);
  const [image, setImage] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handlePaymentSuccess = (boc) => {
    setTxHash(boc);
    setPaymentConfirmed(true);
    saveToken();
  };

  const saveToken = async () => {
    const { error } = await supabase.from('tokens').insert([{
      name,
      symbol,
      supply,
      decimals,
      image_url: image ? URL.createObjectURL(image) : null,
      owner_wallet: wallet || "WALLET_CONECTADA",
      contract_address: "0:SIMULADO",
      liquidity_added: false
    }]);
    if (error) console.error(error);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-orbitron font-bold mb-5 text-neonBlue text-center">
        🚀 Crear Token TON
      </h2>

      {/* Nombre */}
      <input
        className="w-full p-3 mb-3 rounded-xl bg-black/60 border border-gray-600 placeholder-neonBlue text-white focus:ring-2 focus:ring-neonBlue"
        placeholder="Nombre del token"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Símbolo */}
      <input
        className="w-full p-3 mb-3 rounded-xl bg-black/60 border border-gray-600 placeholder-neonPurple text-white focus:ring-2 focus:ring-neonPurple"
        placeholder="Símbolo (ej: TON)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        maxLength={10}
      />

      {/* Cantidad total */}
      <input
        type="number"
        min="1"
        step="1"
        className="w-full p-3 mb-3 rounded-xl bg-black/60 border border-gray-600 placeholder-neonGreen text-white focus:ring-2 focus:ring-neonGreen"
        placeholder="Cantidad total"
        value={supply}
        onChange={(e) => setSupply(e.target.value.replace(/[^0-9]/g, ''))}
      />

      {/* Decimales */}
      <input
        type="number"
        min="0"
        max="18"
        className="w-full p-3 mb-4 rounded-xl bg-black/60 border border-gray-600 placeholder-white text-white focus:ring-2 focus:ring-neonBlue"
        placeholder="Decimales (ej: 9)"
        value={decimals}
        onChange={(e) => setDecimals(e.target.value.replace(/[^0-9]/g, ''))}
      />

      {/* Imagen del token */}
      <div className="mb-4">
        {!image ? (
          <label className="block w-full p-3 text-center rounded-xl border-2 border-dashed border-gray-500 text-gray-400 cursor-pointer hover:border-neonBlue hover:text-neonBlue transition">
            📷 Subir imagen del token
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border border-gray-600 shadow-lg"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-md"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Wallet + pago */}
      <div className="flex flex-col items-center">
        {wallet && !paymentConfirmed && tonConnectUI && (
          <TonConnectWrapper
            toWallet="DIRECCION_DEL_RECIBO"
            amountNano={3e9}
            memo={`Pago token ${name || 'SIN-NOMBRE'}`}
            onPaid={handlePaymentSuccess}
            tonConnectUI={tonConnectUI}
          />
        )}

        {paymentConfirmed && (
          <p className="text-neonGreen font-orbitron text-center mt-4">
            ✅ Pago confirmado – Smart Contract desplegado <br />
            <span className="text-xs break-all">{txHash}</span>
          </p>
        )}
      </div>
    </div>
  );
}
