import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { IEditServiceRadioGroupProps } from "../../interfaces/IEditServiceRadioGroupProps";

function EditServiceRadioGroup({ services, operators, setInfo, info }: IEditServiceRadioGroupProps) {
  return <>
    <Typography sx={{ mt: 1, mb: 1, fontWeight: "bold" }}>سرویس مورد نظر خود را انتخاب کنید.</Typography>
    <Divider />
    <FormControl>
      <RadioGroup
        value={info.serviceId}
        onChange={(_, value) => setInfo(prev => ({
          ...prev,
          serviceId: +value,
          // we should change the selected operator after a change in service as an operator and service may have no relation to each other. on service change, the default-selected operator is set to the first one
          operatorId: +value === info.serviceId ? info.operatorId : operators.filter(operator => operator.serviceId === +value)[0].id
        }))}
      >
        {
          services.map(({ name, id }) => {
            return <FormControlLabel key={id} value={id} control={<Radio size={"small"} />}
                                     label={<Typography sx={{ fontSize: "0.8rem" }}>{name}</Typography>} />;
          })
        }
      </RadioGroup>
    </FormControl>
  </>;
}

export default EditServiceRadioGroup;