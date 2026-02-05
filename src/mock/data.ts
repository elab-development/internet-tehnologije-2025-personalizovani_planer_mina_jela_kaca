import { FullPlaner, ostaliProizvodi, vrstaStranicaenum } from "@/shared/types";

export const mockPlaneri: FullPlaner[] = [
    {id: 1, naziv: "planer A", naslovnaStrana: "planer za bilje", brojStranica: 40, dizajnKorica: "viticaste", 
        bojaStranica:"plava", vrstaKalendara: "americki", vrstaStranica: vrstaStranicaenum.kocke, createdAt: new Date("2026-02-3")
    },
    {id: 2, naziv: "planer B", naslovnaStrana: "planer za dnevnik", brojStranica: 60, dizajnKorica: "nesto", 
        bojaStranica:"plava", vrstaKalendara: "kineski", vrstaStranica: vrstaStranicaenum.linije, createdAt: new Date("2026-02-3")
    }
]

export const mockProizvodi: ostaliProizvodi[] = [
    {id: 11,
    naziv: "stikeri 1",
    vrstaProizvoda: "Stiker",
    cena: 150
    },
    {id: 12,
    naziv: "stikeri 2",
    vrstaProizvoda: "Stiker",
    cena: 150
    },
    {id: 21,
    naziv: "hemijska 1",
    vrstaProizvoda: "hemijska",
    cena: 200
    }
]