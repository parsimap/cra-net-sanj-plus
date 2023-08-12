import React from "react";

export interface IEditProps {
  areaInfo: any,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
}