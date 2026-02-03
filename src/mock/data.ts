import { FullPlaner } from "@/shared/types";


export const mockPlaneri: FullPlaner[] = [
    {id: 1, naziv: "planer A", naslovnaStrana: "planer za bilje", brojStranica: 40, dizajnKorica: "viticaste", 
        bojaStranica:"plava", vrstaKalendara: new Date("2024-01-17"), vrstaStranica: "linije", createdAt: new Date("2026-02-3")
    },
    {id: 2, naziv: "planer B", naslovnaStrana: "planer za dnevnik", brojStranica: 60, dizajnKorica: "nesto", 
        bojaStranica:"plava", vrstaKalendara: new Date("2024-01-17"), vrstaStranica: "linije", createdAt: new Date("2026-02-3")
    }
]
