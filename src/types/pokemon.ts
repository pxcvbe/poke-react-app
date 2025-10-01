export type NamedAPIResource = { 
    name: string; 
    url: string 
}

export type PokemonListResponse = { 
    count: number; 
    next: string|null; 
    previous: string|null; 
    results: NamedAPIResource[] 
}

export type PokemonType = { 
    slot: number; 
    type: NamedAPIResource 
}

export type PokemonStat = { 
    base_stat: number; 
    effort: number; 
    stat: NamedAPIResource 
}

export type PokemonSprites = { 
    front_default: string | null; 
    other?: { 
        'official-artwork'?: { 
            front_default: string | null 
        } 
    } 
}

export type PokemonDetail = { 
    id: number; 
    name: string; 
    height: number; 
    weight: number; 
    types: PokemonType[]; 
    stats: PokemonStat[]; 
    sprites: PokemonSprites 
}
