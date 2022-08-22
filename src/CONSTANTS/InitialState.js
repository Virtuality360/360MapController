import * as datapoints from "./DataPoints"
import * as maps from "./MapTiles"

const MenuItems = [
    {"name": "MapStyle",
    "type": "single",
    "select": "button",
    "children": Object.keys(maps.map_tiles),
    },
    {"name": "DataPoints",
    "type": "multi",
    "select": "checkbox",
    "children": Object.keys(datapoints.data_points),
    },
]

export const panoButton = [{"name": "Back",
"type": "button",
"onClick": {"type": "changeDisplay",
            "newState": "map"}
}]

export const initialState = {
    "displayState": "map",
    "mapState": {
        "center": [0,0],
        "zoom": 0,
        "style": "Open Street Map",
        "overlays": [],
        "mapRef": null,
    },
    "pannellumState": {
        "width": "100%",
        "height": "100%",
        "image": null,
        "pitch": 0,
        "yaw": 0,
        "hfov": 110,
        "hotspots": [],
        "jsonPath": "",
        //"onLoad": () => {console.log("panorama loaded")},
    },
    "menuState": {
        "menuItems": MenuItems,
        "active": {"Map": new Set(["Open Street Map"]), "DataPoints": new Set([]) }
    },
}