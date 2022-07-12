# V360 - 360MapController

## Installation

In the project directory, run:

#### ` npm i --force`

## Running

### For Development

Run:

#### ` npm run start`

This will open up a new webpage in your browser and load the map.

To run as an electron app, run :

#### ` npm run dev`

### For Production

Run:

#### ` npm run build`

## Changing the JSON

If you would like to change what the map and pano viewer points to, you are able to add your own JSON

Place the JSON under ./src/PanoConfig/

If your JSON points to locally stored images, place the images under ./public/images/

If your JSON is named something different then the originally loaded JSON, you will have to go into both ./src/JS/map.jsx & ./src/JS/PannellumReact.jsx and change the imported json at the top.
