import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { INavigateProps } from "../../interfaces/INavigateProps";

function Redirect({ path }: INavigateProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return <></>;
}

export default Redirect;