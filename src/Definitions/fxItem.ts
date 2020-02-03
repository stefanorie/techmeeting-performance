export interface IFloraXchangeItem {
    ID: number;
    Code: string;
    Naam: string;
    Potmaat: string;
    PotmaatNumeriek: number;
    Hoogte: string;
    VbnProductCode: string;
    VbnProductNaam: string;
    ArtikelGroepNaam: string;
    ArtikelGroep: IArtikelGroep;
    Eigenschappen: IEigenschap[];
    Beladingen: IBelading[];
    Fotos?: IFoto[];
    AanbodRegels: IAanbodRegel[];
}

interface IArtikelGroep {
    ID: number;
    Code: string;
    Naam: string;
}

interface IEigenschap {
    ID: number;
    ArtikelInfoID: number;
    EigenschapCode: string;
    EigenschapNaam: string;
    Waarde: string;
}

interface IBelading {
    ID: number;
    ArtikelInfoID: number;
    FustCode: string;
    FustOmschrijving: string;
    LadingDrager: string;
    Omschrijving: string;
    AantalStuksPerFust: number;
    AantalFustPerLaag: number;
    AantalLagerPerDrager: number;
}

interface IFoto {
    ID: number;
    ArtikelInfoID: number;
    UrlThumb50: string;
    UrlThumb220: string;
    UrlThumb360: string;
    UrlThumb600: string;
    UrlOrigineel: string;
}

interface IAanbodRegel {
    ID: number;
    ArtikelInfoID: number;
    AantalStuks: number;
    PeriodeOmschrijving: string;
    StartDatum: string;
    EindDatum: string;
}
