import React, { Component, Button } from 'react';
import { render } from 'react-dom';
import { Pannellum } from "pannellum-react";
import { Images } from "./CairoPanoConfig.json";

class PannellumReact extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { id: 0 };
  }

  handleClick()
  {
    this.setState({id: (this.state.id + 1)});
    console.log("handledClick")
    console.log(this.state.id)
  }; 

  useEffect()
  {
      let imageEffect = Images[this.state.id].ImageSrc
  };

  hanldeClickImage(evt, args)
  {
    console.log(args.name);
    console.log("handleClickImage")
    console.log(this.state.id)
    this.setState({id: (this.id + 1)});
  };

  render() {
    console.log(this.state.id);

    return(
      <div>
        <Pannellum
            width="100%"
            height="1000px"
            image={this.imageEffect}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            onLoad={() => {
                console.log("panorama loaded");
            }}
        >
        <Pannellum.Hotspot
          type="custom"
          pitch={0}
          yaw={0}
          handleClick={(evt, args) => this.hanldeClickImage(evt, args)}
        />
        </Pannellum>

      </div>
    )
  }
}

export default PannellumReact;

 
