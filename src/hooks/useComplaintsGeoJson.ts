import { useEffect, useMemo } from "react";
import { IComplaintDetailResult } from "../interfaces/IComplaintDetailResult";

import { FeatureCollection } from "geojson";

import { useLazyComplaintDetailQuery } from "../features/craHostServiceApiSlice";
import { IUseComplaintsGeoJsonProp } from "../interfaces/IUseComplaintsGeoJsonProp";

/**
 * given an array of complaints details, this function creates a FeatureCollection object
 * @param data an array of complaints detail
 * @param operatorId the current operator id
 */
// TODO: error loading the layers
function getFeatureCollection(data: IComplaintDetailResult[], operatorId: number) {
  const geoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: []
  };

  for (const datum of data) {
    const uniqueId = new Date().getTime();

    geoJson.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [datum.long, datum.lat]
      },
      properties: {
        operatorId,
        markerId: uniqueId,
        date: datum.date,
        service: datum.service,
        type: datum.complaintType,
        subject: datum.complaintSubject
      }
    });
  }

  return geoJson;
}

/**
 * a custom hook that generates a memoized FeatureCollection required to show complaints layer on map
 * @param province current province in which the complaints layer is about to be added to map
 * @param operator the user's current operator
 */
export const useComplaintsGeoJson = ({ province, operator }: IUseComplaintsGeoJsonProp): FeatureCollection => {
  const [trigger, { data }] = useLazyComplaintDetailQuery();

  useEffect(() => {
    if (!province || !operator) {
      return;
    }

    trigger({ provinceId: province.id, operatorId: String(operator.id) });
  }, [province, operator, trigger]);


  return useMemo(() => {
    if (!data) {
      return {
        type: "FeatureCollection",
        features: []
      };
    }

    return getFeatureCollection(data, operator!.id);
  }, [data, operator]);
};