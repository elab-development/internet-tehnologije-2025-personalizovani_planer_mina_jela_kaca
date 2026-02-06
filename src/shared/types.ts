export const enum vrstaStranicaenum{
    linije,
    kocke, 
    tacke,
    prazno
}

export enum vrstaProizvoda{
    planer,
    perplaner,
    hemijska,
    stikeri
}

export enum dizajnKoricaenum{
    roze,
    plava,
    zelena,
    flamingo,
    slon,
    cvece,
    braon,
    bez,
    crna
}

export interface dizajnKorica{
    id: number;
    cena: number;
}

export interface FullPlaner{
    id: number;
    naziv: string;
    naslovnaStrana: string;
    brojStranica: number;
    dizajnKorica: string;
    bojaStranica: string;
    vrstaKalendara: String;
    vrstaStranica: vrstaStranicaenum;
    createdAt: Date;
}

export interface ostaliProizvodi{
    id: number;
    naziv: string;
    vrstaProizvoda: vrstaProizvoda;
    cena: number;
}

export enum vrstaKalendara{
    americki,
    evropski,
    kineski,
    bezkalendara
}

