import React, { Component } from "react";
import { useMap } from "react-leaflet";
import L, { LeafletMouseEvent, Map } from "leaflet";
import switchComponent from "./App"

class UIButton extends React.Component {
  helpDiv;
   constructor(props)
    {
        super(props);
        this.toggleMap = props.toggleMap;
    }

  createButtonControl() {
    const MapHelp = L.Control.extend({
      onAdd: (map) => {
        const helpDiv = L.DomUtil.create("button", "");
        this.helpDiv = helpDiv;
        helpDiv.innerHTML = this.props.title;

        helpDiv.addEventListener("click", () => {
          //switchComponent(this.props.component)
          this.toggleMap("Pano");
        });

        return helpDiv;
      }
    });
    return new MapHelp({ position: this.props.position });
  }

  componentDidMount() {
    const { map } = this.props;
    const control = this.createButtonControl();
    control.addTo(map);
  }

  componentWillUnmount() {
    this.helpDiv.remove();
  }

  render() {
    return null;
  }
}

function withMap(Component) {
  return function WrappedComponent(props) {
    const map = useMap();
    return <Component {...props} map={map} />;
  };
}

export default withMap(UIButton);
