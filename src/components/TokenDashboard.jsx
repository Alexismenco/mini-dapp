import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function TokenDashboard({ wallet }) {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        const fetchTokens = async () => {
            const { data, error } = await supabase
                .from('tokens')
                .select('*')
                .eq('owner_wallet', wallet);
            if (!error) setTokens(data);
        };
        fetchTokens();
    }, [wallet]);

    return (
        <div className="p-6 max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-orbitron font-bold mb-6 text-neonPurple text-center">Mis Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tokens.map(t => (
                    <div key={t.id} className="p-4 rounded-3xl bg-metallicGray/80 border border-gray-700 shadow-2xl hover:scale-105 transition transform">
                        <h3 className="text-xl font-orbitron font-bold text-neonBlue">{t.name} ({t.symbol})</h3>
                        <p className="text-white mt-1">Supply: {t.supply}</p>
                        <p className="text-white mt-1 break-all">Contrato: {t.contract_address}</p>
                        <p className={`mt-1 font-bold ${t.liquidity_added ? 'text-neonGreen' : 'text-gray-400'}`}>Liquidez agregada: {t.liquidity_added ? 'Sí' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
