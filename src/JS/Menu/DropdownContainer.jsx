const DropdownContainer = (props) => {
    return (
        <div className="dropdown-container menuitem" key={props.children}>
            <button className="dropdown-button" >{props.name}</button>
                <div className="dropdown-content">
                    <ul className="no-bullets">
                    {props.options}
                    </ul>
                </div>
        </div>
    )
}

export default DropdownContainer