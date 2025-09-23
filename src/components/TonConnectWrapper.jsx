export default function TonConnectWrapper({ tonConnectUI, onDeployed }) {
  // ⚡ Aquí deberías poner el payload compilado de tu smart contract
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
            payload: CONTRACT_CODE_B64,
          },
        ],
      });

      console.log("✅ Contrato desplegado:", tx);

      // Avisamos al padre que ya se desplegó
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
