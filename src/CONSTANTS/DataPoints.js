const PANO_DIR = "./PanoJSON/"

export const data_points = {
    "GSM Radio Frequencies" : { "type" : "tiles",
                                "uri" : "http://0.0.0.0:8882/tiles/{x}/{y}/{z}.png"},
    "PANO 1" : { "type" : "markers",
                "uri" : PANO_DIR + "demo-output.json"},
    "PANO 2" : { "type" : "markers",
                "uri" : PANO_DIR + "demo-output-1.json"},
    "PANO 3" : { "type" : "markers",
                "uri" : PANO_DIR + "demo-output-2.json"},
}