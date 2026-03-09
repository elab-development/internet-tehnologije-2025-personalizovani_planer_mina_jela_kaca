"use client"
import { useRouter } from "next/navigation";
import KorisnikInfo from "@/components/KorisnikInfo";
import { useAuth } from "@/components/AuthProvider";
    
export default function ProfilClient({k, userID}: any){    
    
    const router = useRouter();
    const {logout} = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    const handle = async () => {
        if(!confirm("Da li ste sigurni da želite da se odjavite?")) return;
        handleLogout();
    };

    return(
        <main className="min-h-screen bg-purple-100 font-sans">
            <div className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 text-pink-600">KORISNIČKI PROFIL</h1>
            
                <KorisnikInfo k={k} />

                <button
                    onClick={handle}
                    className="mt-2 text-lg bg-purple-600 hover:bg-pink-500 text-white py-1 px-3 rounded"
                >
                    Odjavite se</button>
            </div>
        </main>

    )
}