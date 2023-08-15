import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Map as MapboxMap } from "@parsimap/react-mapbox-gl";
import mapboxgl, { GeoJSONSource, Marker } from "mapbox-gl";
import { FeatureCollection } from "geojson";

import { Backdrop, Box, CircularProgress } from "@mui/material";

import { userLocationCoordinatesChanged } from "../../features/mapViewSlice";
import { RootState } from "../../app/store";


import Toolbar from "../Toolbar";

import {
  COMPLAINTS_LAYERS,
  getCoverageOperatorCodeTextLayer,
  getCoverageSymbolOperatorCodeTextLayer,
  getCoverageVillageOperatorCodeTextLayer,
  getCovidLayer,
  MARKER_URLS
} from "./map.constants";
import { OPERATOR_CATALOG } from "../../common/constants";
import LogoSection from "../LogoSection/LogoSection";
import { ICoordinates } from "../../interfaces/ICoordinates";
import { getOperatorCode } from "../../common/getOperatorCode";

/**
 * adds a single image to map component for further uses
 * @param url path to the image
 * @param map the map component which the image is added to
 */
async function addImage(url: string, map: mapboxgl.Map) {
  return new Promise((resolve, reject) => {
    const imageName = url.split("/").slice(-1)[0].split(".")[0].replace("marker", "");
    map.loadImage(url, (error, result) => {
      if (error) {
        reject(error);
      }

      map.addImage(imageName, result as ImageBitmap);
      resolve(undefined);
    });
  });
}

/**
 * adds the complaints source and related features to the map component
 * @param map the map component which the complaints source will be added to
 * @param complaintGeoJson a feature collection of complaints including complaints' info and their positions
 */
async function addComplaintsSourceAndFeatures(map: mapboxgl.Map, complaintGeoJson: FeatureCollection) {
  for (const markerUrl of MARKER_URLS) {
    await addImage(markerUrl, map);
  }
  map.addSource("complaints", {
    type: "geojson",
    data: complaintGeoJson,
    cluster: true,
    clusterRadius: 50,
    clusterMaxZoom: 15
  });
  COMPLAINTS_LAYERS.forEach(layer => map.addLayer(layer));
}


/**
 * creates the innerHTML for complaints popup with the given information
 * @param date the data complaint was issued
 * @param service the service type which the complaint is issued for
 * @param subject the subject of complaint
 * @param type the type of complaint
 */
function getComplaintsPopupInnerHtml(date: string, service: string, subject: string, type: string) {
  return `
          <div class="complaints-popup-wrapper">
            <div class="complaints-popup-header">مشخصات شکایت</div>
                <div class="complaints-popup-grid-item">
                    <div class="complaints-popup-title">تاریخ ثبت</div>
                    <div class="complaints-popup-content">${date}</div>
                </div>
                <div class="complaints-popup-grid-item">
                    <div class="complaints-popup-title">سرویس</div>
                    <div class="complaints-popup-content">${service}</div>
                    </div>
                <div class="complaints-popup-grid-item">
                    <div class="complaints-popup-title">نوع</div>
                    <div class="complaints-popup-content">${subject}</div>
                </div>
                <div class="complaints-popup-grid-item">
                    <div class="complaints-popup-title">موضوع</div>
                    <div class="complaints-popup-content">${type}</div>
                </div>
          </div>
        `
    ;
}


/**
 * the Map component wrapper
 */
function Map() {

  /**
   * holds the loading state of map component
   */
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  /**
   * if the change in map's lng/lat is caused by click, the center of map should not change; otherwise it should
   */
  const changeByClick = useRef<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  /**
   * holds the map object for further uses e.g. event handlers
   */
  const [map, setMap] = useState<mapboxgl.Map>();

  const { operator, generation, currentTab } = useSelector((state: RootState) => state.app);
  const { userLocationCoordinates } = useSelector((state: RootState) => state.mapView);
  const { complaintGeoJson } = useSelector((state: RootState) => state.mapView);

  /**
   * keeps track of the complaints popup
   */
  const complaintsPopupRef = useRef<mapboxgl.Popup>();

  /**
   * the previous marker should be removed before a new one is added
   */
  const markerRef = useRef<Marker>();

  /**
   * this ref keeps track of the initial lng/lat that is given to map component
   */
  const mapCoordinatesRef = useRef<ICoordinates>();

  /**
   * adds a marker to the map in the given coordinates
   * @param coordinates lng/lat of marker's position
   */
  function addMarker(coordinates: [number, number]) {
    if (!map) return;
    if (markerRef.current)
      markerRef.current.remove();
    const markerElement = document.createElement("div");
    markerElement.className = "search-result-marker";
    // TODO: ask what is the offset
    markerRef.current = new mapboxgl.Marker(markerElement).setOffset([0, -39.5 / 2]).setLngLat(coordinates).addTo(map);
  }

  /**
   * sets the user's location in store
   * @param e
   */
  function mapClickHandler(e: mapboxgl.MapMouseEvent) {
    changeByClick.current = true;
    const { lng, lat } = e.lngLat;
    dispatch(userLocationCoordinatesChanged({ lng, lat }));
  }

  /**
   * handles the tasks that are dependent of map load
   * @param e the map load event
   */
  function mapLoadHandler(e: mapboxgl.MapboxEvent<undefined>) {

    const newMap = e.target;

    function addOperatorsMapLayer() {
      OPERATOR_CATALOG.filter(x => x.operatorCode !== -1).forEach(({ operatorCode, generation }) => {
        const operatorCodeText = "operator" + operatorCode;
        const url = process.env.REACT_APP_HOST_URL + "styles/tile-json/" + operatorCode + ".json";
        newMap.addLayer(getCoverageOperatorCodeTextLayer(operatorCodeText, url));
        newMap.addLayer(getCoverageVillageOperatorCodeTextLayer(operatorCodeText));
        newMap.addLayer(getCoverageSymbolOperatorCodeTextLayer(operatorCodeText, generation!));
      });
    }

    addOperatorsMapLayer();

    setIsMapLoaded(true);
    setMap(newMap);
  }


  /**
   * this effect sets the initial lng/lat for the map only for once. note that handling this with states will result in map center reset every time click event is triggered
   */
  useEffect(() => {
    if (!mapCoordinatesRef.current)
      mapCoordinatesRef.current = userLocationCoordinates;
  }, [userLocationCoordinates]);

  /**
   * if the lng/lat change was caused by a click, the `flyTo` method should not be invoked as it will change the center and results in map pop.
   * on the other hand if the lng/lat change was due to a search, `flyTo` should be invoked. also note that marker should be updated on lng/lat change
   */
  useEffect(() => {
    if (!map) return;

    if (!changeByClick.current) {
      map.flyTo({
        zoom: map.getZoom(),
        center: userLocationCoordinates
      });
    } else {
      changeByClick.current = false;
    }
    addMarker([userLocationCoordinates.lng, userLocationCoordinates.lat]);
  }, [map, userLocationCoordinates]);


  /**
   * handles the complaints source and layers config; if the source is already added to the map, it should not be added again
   */
  useEffect(() => {
    if (!map) return;

    const source = map.getSource("complaints") as GeoJSONSource | undefined;

    if (source) source.setData(complaintGeoJson);
    else addComplaintsSourceAndFeatures(map, complaintGeoJson).then();

  }, [complaintGeoJson, map]);


  /**
   * adds a popup to the map whenever a click event is being triggered on `unclustered-point-image-complaints` layer
   */
  useEffect(() => {
    if (!map) return;

    function handleComplaintsClick(e: mapboxgl.MapMouseEvent) {
      const currentComplaint = e.target.queryRenderedFeatures(e.point, {
        layers: ["unclustered-point-image-complaints"]
      })[0];
      const { date, service, subject, type }: any = currentComplaint.properties;
      complaintsPopupRef.current = new mapboxgl.Popup().setLngLat(e.lngLat).setHTML(getComplaintsPopupInnerHtml(date, service, subject, type)).addTo(map!);
    }

    map.on("click", "unclustered-point-image-complaints", handleComplaintsClick);
    return () => {
      map.off("click", "unclustered-point-image-complaints", handleComplaintsClick);
    };
  }, [map]);


  /**
   * the complaints popup should be removed when the tab has changed to something other than Complaints
   */
  useEffect(() => {
    if (currentTab !== "Complaints") {
      complaintsPopupRef.current?.remove();
    }
  }, [currentTab]);


  /**
   * this effect hides/reveals the coverage related layers
   */
  useEffect(() => {
    if (!map) return;

    function setOperatorMapLayerVisible(operatorCode: number) {
      const operatorCodeText = "operator" + operatorCode;
      map!.setLayoutProperty(operatorCodeText, "visibility", "visible");
      map!.setLayoutProperty(operatorCodeText + "village", "visibility", "visible");
      map!.setLayoutProperty(operatorCodeText + "gen", "visibility", "visible");
    }

    function clearCoverageQuality() {
      OPERATOR_CATALOG.forEach(({ operatorCode }) => {
        const operatorCodeText = "operator" + operatorCode;
        if (!map!.getLayer(operatorCodeText)) return;
        map!.setLayoutProperty(operatorCodeText, "visibility", "none");
        map!.setLayoutProperty(operatorCodeText + "village", "visibility", "none");
        map!.setLayoutProperty(operatorCodeText + "gen", "visibility", "none");
      });
    }

    clearCoverageQuality();
    if (generation && currentTab === "Coverage") {
      setOperatorMapLayerVisible(getOperatorCode(operator!.id, generation));
    }
  }, [map, generation, operator, currentTab]);


  /**
   * this effect adds the covid layer to the map
   */
  useEffect(() => {
    if (!map) return;

    function fetchCovidMetadata() {
      return fetch("/covid-metadata.json").then(res => res.json());
    }

    async function addCovidSource() {
      const data = await fetchCovidMetadata();
      const covidGeoJson: FeatureCollection = {
        features: [],
        type: "FeatureCollection"
      };

      for (const item of data) {
        covidGeoJson.features.push({
          type: "Feature",
          properties: { title: "مرکز درمانی کرونا\n(" + item.title + ")" },
          geometry: { type: "Point", coordinates: [item.lng, item.lat] }
        });
      }

      await addImage("/images/covid-logo.png", map!);

      map!.addLayer(getCovidLayer(covidGeoJson));
    }

    addCovidSource().then();

  }, [map]);

  return (
    <>
      {isMapLoaded && <>
        <LogoSection />
        <Toolbar zoomHandlers={{
          handleZoomIn: (map?.zoomIn)?.bind(map),
          handleZoomOut: (map?.zoomOut)?.bind(map),
          getZoom: (map?.getZoom)?.bind(map)
        }} mapReady={!!map} />
      </>}

      <Box sx={{ width: "100vw", height: "100vh" }}>
        {!!token && (
          <MapboxMap
            onLoad={mapLoadHandler}
            onClick={mapClickHandler}
            zoom={15}
            lng={mapCoordinatesRef.current?.lng ?? 51.4468}
            lat={mapCoordinatesRef.current?.lat ?? 35.7395}
            cdnUrl={process.env.REACT_APP_CDN_URL}
            baseApiUrl={process.env.REACT_APP_GIS_CRA_API_URL}
            token={token}
          />
        )}
        <Backdrop open={!isMapLoaded}>
          <CircularProgress color={"inherit"} />
        </Backdrop>
      </Box>
    </>
  )
    ;
}

export default Map;
