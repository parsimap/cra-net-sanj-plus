export interface IZoomToolbarProps {
  handleZoomChange: (mode: "in" | "out") => void;
  zoom: number;
}