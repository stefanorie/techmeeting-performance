export enum ShoeType {
    SNEAKER = 'SNEAKER',
    FANCY = 'FANCY',
}

export interface IShoeColors {
    base: string;
    laces: string;
    logo: string;
    sole: string;
    nose: string;
    back: string;
    heel: string;
    inside: string;
}

export interface IShoeSize {
    size: number;
    region: 'EU' | 'UK' | 'ASIA' | 'WESTLAND';
    length: number; // in centimeters
    width: number; // in centimeters
    height: number; // in centimeters
    weight: number; // in grams
}

export interface IShoe {
    id: string;
    shoeType: ShoeType;
    name: string;
    fabric: string;
    mainColor: string;
    specificColors: IShoeColors;
    availableSizes: IShoeSize[];
    defaultPrice: number;
}
