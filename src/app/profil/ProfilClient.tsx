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

    const handleBrisanje = async () => {
        if(!confirm("Da li ste sigurni da želite da obrišete svoj nalog?")) return;
        try{
            const res = await fetch("/api/auth/profil-brisanje/" , {
                method: "DELETE",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({userID: userID}),
            });

            if(!res.ok){
                const errorData = await res.json();
                alert(errorData.error || "Brisanje nije uspešno!");
                return;
            }
            const data = await res.json();
            
            if(data.success){
                alert("Nalog je uspešno obrisan!");
                handleLogout();
            }

        }catch(err){
            console.error(err);
            alert("Greška prilikom brisanja korisnika!");
        }
    };

    return(
        <main className="min-h-screen bg-purple-100 font-sans">
            <div className="py-16 text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-800 text-pink-600">KORISNIČKI PROFIL</h1>
            
                <KorisnikInfo k={k} />

                <button
                    onClick={handleBrisanje}
                    className="mt-2 text-lg bg-purple-600 hover:bg-pink-500 text-white py-1 px-3 rounded"
                >
                    Obriši nalog</button>
            </div>
        </main>

    )
}