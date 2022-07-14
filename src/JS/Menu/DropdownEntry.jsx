const DropdownEntry = (props) => {

    function handleClick() {
        console.log(props.name)
        let style = props.name
        //props.switchStyle(style)
    }

    return (
        <button onClick={handleClick}>{props.name}</button>
    )

}

export default DropdownEntry