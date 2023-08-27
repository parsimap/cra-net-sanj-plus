import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

import { IEditOperatorRadioGroupProps } from "../../interfaces/IEditOperatorRadioGroupProps";

function EditOperatorRadioGroup({ operators, setInfo, info }: IEditOperatorRadioGroupProps) {
  return <>
    <Typography sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>اپراتور مورد نظر خود را انتخاب کنید.</Typography>
    <Divider />
    <FormControl>
      <RadioGroup
        value={info.operatorId}
        onChange={(_, value) => setInfo(prev => ({ ...prev, operatorId: +value }))}
      >
        {
          operators.filter(operator => operator.serviceId === info.serviceId).map(({ name, id }) => {
            return <FormControlLabel key={id} value={id} control={<Radio size={"small"} />}
                                     label={<Typography sx={{ fontSize: "0.8rem" }}>{name}</Typography>} />;
          })
        }
      </RadioGroup>
    </FormControl>
  </>;
}

export default EditOperatorRadioGroup;