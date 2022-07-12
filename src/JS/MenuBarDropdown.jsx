import "../CSS/MenuBarDropdown.css"
import DropdownEntree from "./DropdownEntree";
import * as CONSTS from "./Constants/MapOverlays";

const DropDown = (props) => {

    let options = []

    for(const map in props.content) {
        options.push(
            <DropdownEntree 
                name={map}
                key={map}
                switchStyle={props.switchStyle}
            />
        )
    }

    return (

        <div className="dropdown">
            <button className="dropbtn" >{props.title}</button>
                <div className="dropdown-content">
                    {options}
                </div>
        </div>
        

    )
}
export default DropDown;