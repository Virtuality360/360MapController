import { Pannellum } from 'pannellum-react';
import { useEffect, useState } from 'react';

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
    }, [])
    useEffect(() => {               /** This will fire on load and when json updates */
        if(json === null) {return}  /** so we need to make sure that json is populated */
        setHotspots(getHotspots(id, json))
    }, [json])
    useEffect(() => {
        let tmp = []
        for (const hotspot of hotspots) {
            const spot = <Pannellum.Hotspot
                            type="custom"
                            pitch={hotspot.Pitch}
                            yaw={hotspot.Yaw}
                            handleClick={() => props.dispatcher({   "type": "movePano",
                                                                    "image": "./Images/" + hotspot.Path,
                                                                    "pitch": hotspot.Pitch,
                                                                    "yaw": hotspot.Yaw,
                                                                    "hotspots": getHotspots(id, json),
                                                                })} />
            tmp.push(spot)
        }
        setPnlmspots(tmp)
    }, [hotspots])

    return (
        // autoload was not working in props for some reason
        <Pannellum {...props.state} autoLoad key={props.state.image}>
            {pnlmspots}
        </Pannellum>
    )
}

export default PannellumHost