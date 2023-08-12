export interface IToolbarProps {
  zoomHandlers: {
    handleZoomIn: Function | undefined,
    handleZoomOut: Function | undefined,
    getZoom: Function | undefined,
  };
}
