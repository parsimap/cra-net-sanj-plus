import { Map as MapboxMap } from "@parsimap/react-mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useTokenQueryWrapper } from "../../hooks/useTokenQueryWrapper";
import mapboxgl, { GeoJSONSource, MapDataEvent, MapSourceDataEvent } from "mapbox-gl";
import { mapZoomChanged, userLocationCoordinatesChanged } from "../../features/appSlice";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../app/store";
import Toolbar from "../Toolbar";
import { FeatureCollection } from "geojson";
// import a from '../../../public/images/'

const MARKER_URLS = [
  "images/marker10.png", "images/marker11.png",
  "images/marker12.png", "images/marker2.png",
  "images/marker21.png", "images/marker26.png",
  "images/marker27.png", "images/marker43.png",
  "images/marker51.png", "images/marker63.png",
  "images/marker64.png", "images/marker71.png",
  "images/marker74.png", "images/marker75.png",
  "images/marker76.png", "images/marker83.png"
];


const addImage = async (url: string, map: mapboxgl.Map) => new Promise((resolve) => {
  const imageName = url.split("/").slice(-1)[0].split(".")[0].replace("marker", "");

  map.loadImage(url, (error, result) => {
    if (error) {
      return;
    }

    map.addImage(imageName, result as ImageBitmap);
    resolve(undefined);
  });
});


async function addSourceAndFeatures(map: mapboxgl.Map, complaintGeoJson: FeatureCollection) {
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
  map.addLayer({
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
  });
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "complaints",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-size": 12
    }
  });
  // map.addLayer({
  //   id: "unclustered-point",
  //   type: "circle",
  //   source: "complaints",
  //   filter: ["!", ["has", "point_count"]],
  //   paint: {
  //     "circle-color": "#11b4da",
  //     "circle-radius": 4,
  //     "circle-stroke-width": 1,
  //     "circle-stroke-color": "#fff"
  //   }
  // });

  map.addLayer({
    id: "unclustered-point-image",
    source: "complaints",
    filter: ["!", ["has", "point_count"]],
    type: "symbol",
    layout: {
      "icon-image": "{operatorId}"
    }
  });


}

function updateMarkers(map: mapboxgl.Map) {

  // let map = e.target;
  // let { markers, markersOnScreen } = AnonymousContext
  //
  // var newMarkers = {}
  // if (map.getSource()"")


  const features = map.querySourceFeatures("complaints", {
    filter: ["!", ["has", "point_count"]]
  });


  if (!features.length) {
    return;
  }

  // features = features.filter(x => x?.properties?.point_count);


  // if (features.length) {
  //   // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
  //   // and add it to the map if it's not there already
  //   for (var i = 0; i < features.length; i++) {
  //     var coords = features[i].geometry.coordinates
  //     var props = features[i].properties
  //     var {
  //       operatorId,
  //       markerId,
  //       complaintIsCreated,
  //       cluster: isCluster,
  //     } = props
  //
  //     if (isCluster) continue
  //
  //     var marker = markers[markerId]
  //
  //     if (!marker) {
  //       let complaintPopup = document.createElement('div')
  //       complaintPopup.className =
  //         'report-complaint-popup' + (!complaintIsCreated ? '' : ' --created')
  //       ReactDOM.render(<ComplaintPopupContent {...props} />, complaintPopup)
  //       var popup = new window.parsimap.Popup({ offset: 10 }).setDOMContent(
  //         complaintPopup
  //       )
  //       var el = document.createElement('div')
  //       el.className =
  //         'complaint-marker operator' +
  //         operatorId +
  //         (!complaintIsCreated ? '' : ' --created')
  //       marker = markers[markerId] = new window.parsimap.Marker({
  //         element: el,
  //       })
  //         .setLngLat(coords)
  //         .setPopup(popup)
  //
  //       el.onclick = () => (
  //         (AnonymousContext.pointerEnable = false),
  //           map.once('click', () => (AnonymousContext.pointerEnable = true))
  //       )
  //     }
  //     newMarkers[markerId] = marker
  //
  //     if (!markersOnScreen[markerId]) marker.addTo(map)
  //   }
  //   // for every marker we've added previously, remove those that are no longer visible
  //   for (markerId in markersOnScreen) {
  //     if (!newMarkers[markerId]) markersOnScreen[markerId].remove()
  //   }
  //   AnonymousContext.markersOnScreen = newMarkers
  // }
}

function Map() {
  /**
   * holds the loading state of map component
   */
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const changeByClick = useRef<boolean>(false);
  const token = useTokenQueryWrapper();
  const dispatch = useDispatch();
  const [map, setMap] = useState<mapboxgl.Map>();
  const moveTimeout = useRef<number>();
  const { userLocationCoordinates, mapZoom } = useSelector((state: RootState) => state.app);
  const { complaintGeoJson } = useSelector((state: RootState) => state.mapView);

  function mapClickHandler(e: mapboxgl.MapMouseEvent) {
    changeByClick.current = true;
    const { lng, lat } = e.lngLat;
    dispatch(userLocationCoordinatesChanged({ lng, lat }));
  }

  function mapLoadHandler(e: mapboxgl.MapboxEvent<undefined>) {
    const newMap = e.target;
    setIsMapLoaded(true);
    setMap(newMap);

  }

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!changeByClick.current) {
      map.flyTo({
        zoom: map.getZoom(),
        center: userLocationCoordinates
      });
    } else {
      changeByClick.current = false;
    }
  }, [map, userLocationCoordinates]);


  useEffect(() => {
    if (!map) {
      return;
    }

    function handleMoveEnd() {
      dispatch(mapZoomChanged(map!.getZoom()));
    }

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [dispatch, map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const source = map.getSource("complaints") as GeoJSONSource | undefined;

    if (source) {
      source.setData(complaintGeoJson);
    } else {
      addSourceAndFeatures(map, complaintGeoJson).then();
    }
  }, [complaintGeoJson, map]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (moveTimeout.current) {
      clearTimeout(moveTimeout.current);
    }


    function handleMove(e: MapDataEvent) {
      setTimeout(() => updateMarkers(e.target), 100);
    }

    function handleData(e: MapSourceDataEvent) {
      if (e.sourceId !== "complaints" || !e.isSourceLoaded) {
        return;
      }

      updateMarkers(e.target);
    }

    map.on("move", handleMove);
    map.on("data", handleData);

    return () => {
      map.off("move", handleMove);
      map.off("data", handleData);
    };
  }, [map]);

  return (
    <>
      <Toolbar zoomHandlers={{
        handleZoomIn: (map?.zoomIn)?.bind(map),
        handleZoomOut: (map?.zoomOut)?.bind(map),
        getZoom: (map?.getZoom)?.bind(map)
      }} />
      <Box sx={{ width: "100vw", height: "100vh" }}>
        {!!token && (
          <MapboxMap
            onLoad={mapLoadHandler}
            onClick={mapClickHandler}
            zoom={15}
            lng={51.4468}
            lat={35.7395}
            cdnUrl={process.env.REACT_APP_CDN_URL}
            baseApiUrl={process.env.REACT_APP_GIS_CRA_API_URL}
            token={token}
            onViewPortChange={(viewPort) => {
            }}
          />
        )}
        <Backdrop open={!isMapLoaded}>
          <CircularProgress />
        </Backdrop>
      </Box>
    </>
  );
}

export default Map;
