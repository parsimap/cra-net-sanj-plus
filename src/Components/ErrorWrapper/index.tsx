import { Alert, Snackbar } from "@mui/material";

import { IErrorWrapperProps } from "../../interfaces/IErrorWrapperProps";

function ErrorWrapper({ error }: IErrorWrapperProps) {
  return <Snackbar open={true}>
    <Alert severity={"error"}>
      {error}
    </Alert>
  </Snackbar>;
}

export default ErrorWrapper;