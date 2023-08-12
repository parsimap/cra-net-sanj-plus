import React from "react";

import { IService } from "./IService";
import { IOperator } from "./IOperator";
import { TTab } from "../types/TTab";
import { ITabInfo } from "./ITabInfo";

export interface IDrawerProps {
  service: IService | null;
  operator: IOperator | null;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: TTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<TTab>>;
  tabs: ITabInfo[];
  areaInfo: any; // TODO: set areainfo type in createApi slice
}