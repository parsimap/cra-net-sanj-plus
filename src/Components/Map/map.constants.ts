import mapboxgl, { AnyLayer } from "mapbox-gl";
import { COVERAGE_LAYER_STOPS } from "../../common/constants";
import { TGeneration } from "../../types/TGeneration";
import { FeatureCollection } from "geojson";

export const MARKER_URLS = [
  "/images/marker10.png", "/images/marker11.png",
  "/images/marker12.png", "/images/marker2.png",
  "/images/marker21.png", "/images/marker26.png",
  "/images/marker27.png", "/images/marker43.png",
  "/images/marker51.png", "/images/marker63.png",
  "/images/marker64.png", "/images/marker71.png",
  "/images/marker74.png", "/images/marker75.png",
  "/images/marker76.png", "/images/marker83.png"
];

export const COMPLAINTS_LAYERS: mapboxgl.AnyLayer[] = [{
  id: "clusters",
  type: "circle",
  source: "complaints",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1"
    ],
    "circle-radius": [
      "step",
      ["get", "point_count"],
      20,
      100,
      30,
      750,
      40
    ]
  }
}, {
  id: "cluster-count",
  type: "symbol",
  source: "complaints",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12
  }
}, {
  id: "unclustered-point-image-complaints",
  source: "complaints",
  filter: ["!", ["has", "point_count"]],
  type: "symbol",
  layout: {
    "icon-image": "{operatorId}"
  }
}];

export const COMPLAINTS_LAYER_ID = COMPLAINTS_LAYERS.map(layer => layer.id);


export const getCoverageOperatorCodeTextLayer = (operatorCodeText: string, url: string): AnyLayer => ({
  id: operatorCodeText,
  type: "circle",
  source: { type: "vector", url },
  "source-layer": "drive-test-data",
  layout: { visibility: "none" },
  paint: {
    "circle-radius": {
      base: 1.5,
      stops: [
        [12, 1.5],
        [19, 22]
      ]
    },
    "circle-color": {
      property: "point-value",
      stops: [
        [0, COVERAGE_LAYER_STOPS[0]],
        [1, COVERAGE_LAYER_STOPS[1]],
        [2, COVERAGE_LAYER_STOPS[2]],
        [3, COVERAGE_LAYER_STOPS[3]]
      ]
    }
  },
  filter: ["!=", "point-value", 5]
});


export const getCoverageVillageOperatorCodeTextLayer = (operatorCodeText: string): AnyLayer => ({
  id: operatorCodeText + "village",
  type: "circle",
  source: operatorCodeText,
  "source-layer": "drive-test-data",
  layout: { visibility: "none" },
  paint: {
    "circle-radius": {
      base: 1.5,
      stops: [
        [12, 15],
        [19, 22]
      ]
    },
    "circle-color": "#1976D2"
  },
  filter: ["==", "point-value", 5]
});


export const getCoverageSymbolOperatorCodeTextLayer = (operatorCodeText: string, generation: TGeneration): AnyLayer => ({
  type: "symbol",
  id: operatorCodeText + "gen", source: operatorCodeText,
  "source-layer": "drive-test-data",
  layout: {
    "text-field": generation,
    "text-optional": true,
    "text-size": [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      12,
      15,
      20,
      20
    ]
  },
  paint: { "text-color": "#fff" },
  filter: ["==", "point-value", 5]
});


export const getCovidLayer = (covidGeoJson: FeatureCollection): AnyLayer => ({
  id: "chc-symbol",
  type: "symbol",
  source: { type: "geojson", data: covidGeoJson },
  layout: {
    "icon-image": "covid-logo",
    "icon-size": 0.1,
    "text-field": "{title}",
    "text-font": ["IranYekanWeb Bold"],
    "text-size": 12,
    "text-offset": [0, 1.1],
    "icon-offset": [0, -256]
  },
  paint: {
    "text-color": "rgb(232,68,68)",
    "text-halo-color": "#fff",
    "text-halo-blur": 0.2,
    "text-halo-width": 1
  }
});