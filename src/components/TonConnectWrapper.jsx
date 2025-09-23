import TonWeb from 'tonweb';

export default function TonConnectWrapper({ tonConnectUI, walletAddress, onDeployed }) {
  // ⚡ Reemplaza con tu contrato compilado en base64 para mainnet
  const CONTRACT_CODE_B64 = "BASE64_REAL_DEL_CONTRATO";

  const deployContract = async () => {
    if (!tonConnectUI || !walletAddress) {
      console.error("TonConnectUI o walletAddress no definido");
      return;
    }

    try {
      // Construimos la transacción
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutos de validez
        messages: [
          {
            address: walletAddress, // enviamos a nuestra propia wallet
            amount: "2000000000",   // nanoTON para gas, ajustar según contrato
            payload: CONTRACT_CODE_B64,
          },
        ],
      });

      console.log("✅ Contrato desplegado:", tx);

      // Avisamos al componente padre
      onDeployed({
        txHash: tx.boc,
        contractAddress: tx.address || "0:SIMULADO",
      });

    } catch (err) {
      console.error("❌ Error al desplegar:", err);
    }
  };

  return (
    <button
      onClick={deployContract}
      className="px-6 py-3 rounded-xl bg-neonBlue text-white font-bold shadow-lg hover:bg-neonPurple transition"
    >
      Crear ahora
    </button>
  );
}
