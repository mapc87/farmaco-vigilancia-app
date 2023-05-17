export interface KarchLassagna {
    items:       Item[];
    total:       number;
    analisis:    string;
}

export interface Item {
    nombre:     string;
    puntuacion: number;
    categorias?: Categoria[];
    categoriaSeleccionada? : string; 
}

export interface Categoria {
    nombre:     string;
    puntuacion: number;
    seleccionada: boolean
}

