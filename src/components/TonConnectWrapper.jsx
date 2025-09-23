export default function TonConnectWrapper({ tonConnectUI, walletAddress, onDeployed }) {
  // ⚡ Payload compilado de tu smart contract
  const CONTRACT_CODE_B64 = "BASE64_CODE_DEL_CONTRATO";

  const deployContract = async () => {
    if (!tonConnectUI || !walletAddress) {
      console.error("TonConnectUI o walletAddress no definido");
      return;
    }

    try {
      const tx = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [
          {
            address: walletAddress, // enviamos a nuestra propia wallet
            amount: "2000000000",  // nanoTON para gas
            payload: CONTRACT_CODE_B64,
          },
        ],
      });

      console.log("✅ Contrato desplegado:", tx);

      console.log("Wallet address que se enviará:", walletAddress);

      onDeployed({
        txHash: tx.boc,
        contractAddress: tx.address || "0:SIMULADO",
      });
    } catch (err) {
      console.log("Wallet address que se enviará:", walletAddress);

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
