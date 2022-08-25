import { useEffect, useState } from 'react';
import { Pannellum } from "@karianpour/pannellum-react";
import "@karianpour/pannellum-react/es/pannellum/css/video-js.css";
import "@karianpour/pannellum-react/es/pannellum/css/pannellum.css";
import "@karianpour/pannellum-react/es/pannellum/css/style-textInfo.css";

/**
 * Enables fetching a json file from a predifined path
 * @param {*} JSONpath 
 * @returns a json file
 */
async function loadJSON(JSONpath) {
    const response = await fetch(JSONpath)
    if(!response.ok) {throw new Error (`Error fetching panojson ${response.status}`)}
    const json = await response.json()
    return json
}

/**
 * Loop through a json file to find the current image
 * then return the hotspot information assosiciated with that image
 * @param {*} currentImageID the current image
 * @param {*} JSON the json file we are working on
 * @returns an array of hotspot information
 */
function getHotspots(currentImageID, JSON) {
    for(const img of JSON.Images) {
        if(currentImageID === img.ImageId) {
            return img.Hotspots
        }
    }
    return []   /** No match found */
}

const PannellumHost = (props) => {

    const [json, setJSON] = useState(null)                              /** {"Images: {...}"} */
    const [id, setID] = useState(props.state.image.split("/").at(-1))   /** xxx-000.jpg */
    const [hotspots, setHotspots] = useState([])                        /** [{...},{...},...] */
    const [pnlmspots, setPnlmspots] = useState([])                      /** [<>,<>,...] */

    /** Whenever the props.json updates, make sure this component uses it */
    useEffect(() => {
        loadJSON(props.state.jsonPath).then(r => setJSON(r))
    }, [props.state.jsonPath])

    useEffect(() => {
        //console.log("props.state.image")
        setID(props.state.image.split("/").at(-1))
    }, [props.state.image])

    /** Load the hotspots after the json is loaded into the hook*/
    useEffect(() => {
        if(json === null) {return}  /** Make sure that json is populated */
        setHotspots(getHotspots(id, json))
    }, [json, id])
    
    /** Whenever hotspots changes, update the state
     *  and load the hostpot into pannellum
     */
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