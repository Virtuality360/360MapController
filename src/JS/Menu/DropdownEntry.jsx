const DropdownEntry = (props) => {

    function handleClick() {
        console.log(props.name)
        let style = props.name
        props.switchStyle(style)
    }

    return (
        <div onClick={handleClick} className="ddEntry">{props.name}</div>
    )

}

export default DropdownEntry