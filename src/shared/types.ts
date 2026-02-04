export const enum vrstaStranicaenum{
    linije,
    kocke, 
    tacke,
    prazno
}

export interface FullPlaner{
    id: number;
    naziv: string;
    naslovnaStrana: string;
    brojStranica: number;
    dizajnKorica: string;
    bojaStranica: string;
    vrstaKalendara: Date;
    vrstaStranica: vrstaStranicaenum;
    createdAt: Date;
}