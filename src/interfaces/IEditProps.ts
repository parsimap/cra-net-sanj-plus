import React from "react";

export interface IEditProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
  token: string
}