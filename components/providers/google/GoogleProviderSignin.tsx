import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from '@mui/material/Button';
interface IProps {
  onClick: () => Promise<undefined>;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color:"#224870",
  backgroundColor: "white",
  borderRadius:'4',
  '&:hover': {
    backgroundColor: "white",
    color:"#44CFCB",
    border: '2px solid',
    borderColor:"white"
  },
}));

export default function GoogleProviderSignin(props: IProps) {
  return (
    <ColorButton variant="contained"{...props}>
      Connect
    </ColorButton>
  );
}
