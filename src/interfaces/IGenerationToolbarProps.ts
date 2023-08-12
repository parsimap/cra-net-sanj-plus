import { TGeneration } from "../types/TGeneration";

export interface IGenerationToolbarProps {
  generation: TGeneration | undefined;
  changeGenerationHandler: (generation: TGeneration) => void;
}
