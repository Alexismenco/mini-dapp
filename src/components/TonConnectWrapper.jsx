import TonWeb from 'tonweb';

export default function TonConnectWrapper({ tonConnectUI, walletAddress, onDeployed }) {
  // ⚡ Payload compilado de tu smart contract en base64
  const CONTRACT_CODE_B64 = "BASE64_REAL_DEL_CONTRATO";

  const deployContract = async () => {
    if (!tonConnectUI || !walletAddress) {
      console.error("TonConnectUI o walletAddress no definido");
      return;
    }

    try {
      // Convertimos el payload a bytes para que TON Connect lo acepte
      const payloadBytes = Uint8Array.from(atob(CONTRACT_CODE_B64), c => c.charCodeAt(0));

      const tx = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600, // 10 minutos
        messages: [
          {
            address: walletAddress,
            amount: "2000000000", // nanoTON
            payload: btoa(String.fromCharCode(...payloadBytes)), // payload en base64 compatible navegador
          },
        ],
      });

      console.log("✅ Contrato desplegado:", tx);

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
