// Licencing is needed to use basemaps commercially

export const map_tiles = {
    "Open Street Map":      { "attribution": "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
                              "url": "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            },
    "CartoDB Positron":     { "attribution": "&copy; <a href='https://carto.com/'>Carto</a>",
                              "url": 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                            },
    "CartoDB Dark matter":  { "attribution": "&copy; <a href='https://carto.com/'>Carto</a>",
                              "url": 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                            },
}
