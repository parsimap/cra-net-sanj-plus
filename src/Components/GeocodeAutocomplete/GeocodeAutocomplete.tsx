import * as React from "react";
import {memo, PropsWithChildren, useCallback, useEffect, useRef, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import IGeolocationPlace from "../../interfaces/IGeocodePlace";
import IGeocodePlace from "../../interfaces/IGeocodePlace";
import GeocodeOption from "./GeocodeOption";
import {autocompleteClasses, IconButton} from "@mui/material";
import AutocompleteTextField from "./AutocompleteTextField";
import {ViewPort} from "@parsimap/react-mapbox-gl";
import SearchIcon from "@mui/icons-material/Search";
import {useLazyGeocodeQuery} from "../../features/craApiSlice";
import {useAppDispatch} from "../../app/hooks";

export interface IGeocodeAutocomplete {
  token: string;
  mapViewPort: ViewPort;
  value: IGeolocationPlace | null;
  onError?: (stateCode: number) => void;
  onChange: (newValue: IGeolocationPlace | null) => void;
}

interface INoOptions {
  type: NoOptionsType;
  accuracyRadius: number;
}

type NoOptionsType = "no-result" | "postcode-error";

const useGeocodeAutocomplete = ({
                                  token,
                                  value,
                                  mapViewPort,
                                  onChange,
                                }: IGeocodeAutocomplete) => {
  const dispatch = useAppDispatch();
  const timeoutRef = useRef<number>();
  const prevInputValue = useRef<string>();
  const [inputValue, setInputValue] = useState("");
  const [trigger, {data, isFetching}] = useLazyGeocodeQuery();
  const [options, setOptions] = useState<IGeolocationPlace[]>([]);
  const [noOptions, setSetNoOptions] = useState<INoOptions>({
    type: "no-result",
    accuracyRadius: 0,
  });


  useEffect(() => {
    if (!data) return;

    if (data.status_code === 100) {
      let newOptions: IGeolocationPlace[] = [];

      /**
       * Whether the geocode service has result, to avoid from lost current value
       * is selected, it is necessary to add in the newOptions as first member.
       * This is added to list and the warning no show anymore. It is taken to
       * account that added value not show in the popover list.
       */
      if (value) {
        newOptions = [value];
      }

      newOptions = [...newOptions, ...data.result].filter(
        (val, idx, self) => self.findIndex((x) => x.title === val.title) === idx
      );

      if (!newOptions.length) {
        setSetNoOptions({type: "no-result", accuracyRadius: 0});
      }

      setOptions(newOptions);
    } else if ([108, 109].includes(data.status_code)) {
      const first = data.result[0];
      const options: IGeocodePlace[] = [
        {
          ...first,
          postalCodeError: {accuracyRadius: first.last_item_type!},
        },
      ];
      setOptions(options);
      // if (!data.result.length) {
      //   setSetNoOptions({ type: "postcode-error", accuracyRadius: 0 });
      // } else {
      //   setSetNoOptions({
      //     type: "postcode-error",
      //     accuracyRadius: data.result[0].last_item_type!,
      //   });
      // }
    } else if (data.status_code !== 104) {
      // dispatch(appActions.pmiTokenCreated(""));
    }
  }, [data, dispatch, value]);

  const fetchGeocode = useCallback(() => {
    if (!mapViewPort) return;
    if (inputValue === "" || prevInputValue.current === inputValue) return;
    prevInputValue.current = inputValue;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      trigger({
        address: inputValue,
        token,
        zoom: mapViewPort.zoom,
        lng: mapViewPort.lng,
        lat: mapViewPort.lat,
      });
    }, 200);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [inputValue, mapViewPort, token, trigger]);

  useEffect(() => {
    fetchGeocode();
  }, [fetchGeocode, inputValue]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: IGeolocationPlace | null) => {
      setOptions(newValue ? [newValue, ...options] : options);
      onChange(newValue);
    },
    [onChange, options]
  );

  const handleSearchClick = useCallback(() => {
    fetchGeocode();
  }, [fetchGeocode]);

  const handleInputChange = useCallback((_: any, newValue: string) => {
    setInputValue(newValue);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && options.length) {
        if (isFetching) return;
        /**
         * This code is useful when the user try to select the first item in the list
         * with press the key enter.
         *
         * At the first time whether options variable length equals to 1, the suitable
         * member is that belong to index zero, because it's the first time and there isn't
         * any options' member at the list.
         * The first member is the last value so to show the current location it
         * needs to choose the next member that is exactly the first item which be
         * shown in the popover component as options value.
         */
        onChange(options.length > 1 ? options[1] : options[0]);
      }
    },
    [isFetching, onChange, options]
  );

  return {
    value,
    options,
    inputValue,
    isFetching,
    handleChange,
    handleKeyDown,
    handleInputChange,
    handleSearchClick,
    noOptions,
  };
};

const InputEndAdornment = memo(
  (props: PropsWithChildren<{ reactNode: React.ReactNode }>) => {
    // eslint-disable-next-line react/prop-types
    const root = props.reactNode as JSX.Element;
    const elements = React.Children.toArray(root.props.children);

    // eslint-disable-next-line react/prop-types
    React.Children.forEach(props.children, (child, key) => {
      if (React.isValidElement(child))
        elements.push(React.cloneElement(child, {key}));
    });

    return React.cloneElement(root, {}, elements);
  }
);

const GeocodeAutocomplete = (props: IGeocodeAutocomplete) => {
  const {
    value,
    options,
    inputValue,
    handleChange,
    handleKeyDown,
    handleSearchClick,
    handleInputChange,
  } = useGeocodeAutocomplete(props);

  return (
    <Autocomplete<IGeolocationPlace>
      autoComplete
      size={"small"}
      value={value}
      options={options}
      popupIcon={false}
      includeInputInList
      filterSelectedOptions
      inputValue={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      noOptionsText={"نتیجه‌ای یافت نشد"}
      onInputChange={handleInputChange}
      filterOptions={(x) => x}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      renderOption={(props, option) => (
        <GeocodeOption {...props} option={option}/>
      )}
      sx={{
        [`& .${autocompleteClasses.endAdornment}`]: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      renderInput={(params) => (
        <AutocompleteTextField
          {...params}
          label={"موقعیت خود را جستجو کنید."}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputEndAdornment reactNode={params.InputProps.endAdornment}>
                <IconButton
                  size={"small"}
                  sx={{mt: -0.5}}
                  onClick={handleSearchClick}
                >
                  <SearchIcon/>
                </IconButton>
              </InputEndAdornment>
            ),
          }}
        />
      )}
    />
  );
};

InputEndAdornment.displayName = "InputEndAdornment";

export default GeocodeAutocomplete;
