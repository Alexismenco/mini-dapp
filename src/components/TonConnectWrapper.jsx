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
          amount: "2000000000",
          payload: CONTRACT_CODE_B64,
          // NO address al desplegar
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
