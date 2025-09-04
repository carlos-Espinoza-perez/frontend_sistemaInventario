import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import type { IButtonHeaderFilter } from "../../../interface/GenInterface";

const FilterButtons = (props: IButtonHeaderFilter) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(props.selectedOption || "Todas");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option: string | null) => {
    if (option) setSelectedWarehouse(option);
    setAnchorEl(null);
  };


  return (
    <>
      <button
        onClick={handleClick}
        className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-full border border-[var(--outline)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-container-high)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      >
        <span>{props.label}: {selectedWarehouse}</span>
        <span className="material-icons-outlined text-base">arrow_drop_down</span>
      </button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(null)}
        MenuListProps={{ className: "text-xs" }} // Tamaño pequeño como en tu diseño
        PaperProps={{
          style: {
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        {props.options.map((option) => (
          <MenuItem key={option.label + option.value} onClick={() => {
            handleClose(option.label);
            if (props.onChange)
              props.onChange(option);
          }}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterButtons;
