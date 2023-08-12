import MUIskeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

function Skeleton() {
  return <>
    <Stack direction={"column"} spacing={1}>
      <MUIskeleton variant={"text"} height={"50px"} animation={"pulse"} />
      <MUIskeleton variant={"text"} height={"50px"} animation={"pulse"} />
      <MUIskeleton variant={"rounded"} height={"200px"} animation={"pulse"} />
      <MUIskeleton variant={"rounded"} height={"200px"} animation={"pulse"} />
    </Stack>
  </>;
}

export default Skeleton;