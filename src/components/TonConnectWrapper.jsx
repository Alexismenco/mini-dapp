import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function CreateTokenForm({ wallet, tonConnectUI }) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState(9);
  const [image, setImage] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  // ⚡ Reemplaza con el bytecode compilado del contrato
  const CONTRACT_CODE_B64 = "BASE64_CODE_DEL_CONTRATO";

  const deployContract = async () => {
    if (!tonConnectUI) return;

    try {
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [
          {
            address:
              "0:0000000000000000000000000000000000000000000000000000000000000000",
            amount: "2000000000", // 2 TON para gas
            payload: CONTRACT_CODE_B64, // payload compilado
          },
        ],
      });

      console.log("Contrato desplegado:", tx);

      setTxHash(tx.boc);
      setContractAddress(tx.address || "0:SIMULADO");
      setPaymentConfirmed(true);

      // Guardar en Supabase
      await saveToken(tx.address || "0:SIMULADO");
    } catch (err) {
      console.error(err);
    }
  };

  const saveToken = async (address) => {
    const { error } = await supabase.from("tokens").insert([
      {
        name,
        symbol,
        supply,
        decimals,
        image_url: image ? URL.createObjectURL(image) : null,
        owner_wallet: wallet || "WALLET_CONECTADA",
        contract_address: address,
        liquidity_added: false,
      },
    ]);
    if (error) console.error(error);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-metallicGray/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700">
      <h2 className="text-2xl font-orbitron font-bold mb-5 text-neonBlue text-center">
        Crear Token TON
      </h2>

      {/* Nombre */}
      <input
        className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonBlue text-white focus:ring-2 focus:ring-neonBlue"
        placeholder="Nombre del token"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Símbolo */}
      <input
        className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonPurple text-white focus:ring-2 focus:ring-neonPurple"
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
        className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-neonGreen text-white focus:ring-2 focus:ring-neonGreen"
        placeholder="Cantidad total"
        value={supply}
        onChange={(e) => setSupply(e.target.value.replace(/[^0-9]/g, ""))}
      />

      {/* Decimales */}
      <input
        type="number"
        min="0"
        max="18"
        className="w-full p-3 mb-3 rounded-xl bg-black/50 border border-gray-600 placeholder-white text-white focus:ring-2 focus:ring-neonBlue"
        placeholder="Decimales (ej: 9)"
        value={decimals}
        onChange={(e) => setDecimals(e.target.value.replace(/[^0-9]/g, ""))}
      />

      {/* Imagen */}
      <div className="relative w-full mb-4">
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 text-white"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && (
          <div className="mt-2 relative">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-20 h-20 rounded-lg object-cover border border-gray-500"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Botón de Crear */}
      <div className="flex flex-col items-center">
        {wallet && !paymentConfirmed && tonConnectUI && (
          <button
            onClick={deployContract}
            className="px-6 py-3 rounded-xl bg-neonBlue text-white font-bold shadow-lg hover:bg-neonPurple transition"
          >
            Crear ahora
          </button>
        )}

        {paymentConfirmed && (
          <p className="text-neonGreen font-orbitron text-center mt-4">
            ✅ Token desplegado <br />
            Dirección: {contractAddress} <br />
            TxHash: {txHash}
          </p>
        )}
      </div>
    </div>
  );
}
