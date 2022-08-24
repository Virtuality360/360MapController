import { useEffect, useState } from 'react';
import { Pannellum } from "@karianpour/pannellum-react";
import "@karianpour/pannellum-react/es/pannellum/css/video-js.css";
import "@karianpour/pannellum-react/es/pannellum/css/pannellum.css";
import "@karianpour/pannellum-react/es/pannellum/css/style-textInfo.css";

async function loadJSON(JSONpath) {
    const response = await fetch(JSONpath)
    if(!response.ok) {throw new Error (`Error fetching panojson ${response.status}`)}
    const json = await response.json()

    return json
}

function getHotspots(currentImageID, JSON) {
    for(const img of JSON.Images) {
        if(currentImageID === img.ImageId) {
            return img.Hotspots
        }
    }
    return []
}

const PannellumHost = (props) => {

    const [json, setJSON] = useState(null)
    const [id] = useState(props.state.image.split("/").at(-1))
    const [hotspots, setHotspots] = useState([])
    const [pnlmspots, setPnlmspots] = useState([])

    useEffect(() => {               /** Fires on load */
        loadJSON(props.state.jsonPath).then(r => setJSON(r))
    }, [props.state.jsonPath])
    useEffect(() => {               /** This will fire on load and when json updates */
        if(json === null) {return}  /** so we need to make sure that json is populated */
        setHotspots(getHotspots(id, json))
    }, [json, id])
    useEffect(() => {
        let tmp = []
        for (const hotspot of hotspots) {
            const spot = <Pannellum.Hotspot
                            type="custom"
                            pitch={hotspot.Pitch}
                            yaw={hotspot.Yaw}
                            key={hotspot.Path}
                            handleClick={() => props.dispatcher({   "type": "movePano",
                                                                    "imgPath": "./Images/" + hotspot.Path,
                                                                    "pitch": hotspot.Pitch,
                                                                    "yaw": hotspot.Yaw,
                                                                    "hotspots": getHotspots(id, json),
                                                                })} />
            tmp.push(spot)
        }
        setPnlmspots(tmp)
    }, [hotspots,id,json,props])

    return (
        // autoload was not working in props for some reason
        <Pannellum {...props.state} autoLoad key={props.state.image}>
            {pnlmspots}
        </Pannellum>
    )
}

export default PannellumHost