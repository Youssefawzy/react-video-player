import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";

export const ControlContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const IconButton = styled("div")(({ theme }) => ({
  position: "relative",
  color: "#9556cc",
  "&:hover": { color: "#fff" },
  "&:hover .quality-options": {
    display: "block",
  },
}));

export const PrettoSlider = styled(Slider)(({ theme }) => ({
  width: "100%",
  color: "#9556CC",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: 0,
    marginLeft: 5,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "inherit",
    },
  },
  "& .MuiSlider-track": {
    height: 5,
    borderRadius: 4,
    width: "100%",
  },
  "& .MuiSlider-rail": {
    height: 5,
    borderRadius: 4,
  },
}));

export const VolumeSlider = styled(Slider)(({ theme }) => ({
  width: "100px",
  color: "#9556CC",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#9556CC",
    border: "2px solid currentColor",
    marginTop: 0,
    marginLeft: 5,
  },
  "& .MuiSlider-track": {
    height: 5,
    borderRadius: 4,
  },
  "& .MuiSlider-rail": {
    height: 5,
    borderRadius: 4,
  },
}));

export const QualityOptions = styled("div")({
  display: "none",
  position: "absolute",
  top: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
});

export const Option = styled("div")(({ isSelected }) => ({
  padding: "8px 12px",
  cursor: "pointer",
  color: isSelected ? "#fff" : "#9556CC",
  backgroundColor: isSelected ? "#9556CC" : "transparent",
  "&:hover": {
    backgroundColor: isSelected ? "#7c4d99" : "#f0f0f0",
  },
}));
