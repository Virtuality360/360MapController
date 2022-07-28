import "../../CSS/MenuBarDropdown.css"
import DropdownEntry from "./DropdownEntry";

const DropDown = (props) => {

    let options = []

    for(const property in props.content) {
        options.push(
            <DropdownEntry 
            name={property}
            key={property}
            switchStyle={props.switchStyle}/>
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