import { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import moment from "moment";

export type RangoFecha = { fechaInicio: string; fechaFin: string };

type FiltroFechaVentasProps = {
  onChange?: (rangoFechas: RangoFecha) => void;
};

export default function FiltroFechaVentas({ onChange }: FiltroFechaVentasProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [label, setLabel] = useState("Últimos 30 días");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const today = new Date();
  const formatDate = (d: Date): string => d.toISOString().split("T")[0];

  const agregarRango = (inicio: string, fin: string, etiqueta: string) => {
    const nuevo = { fechaInicio: inicio, fechaFin: fin };
    setLabel(etiqueta);
    onChange?.(nuevo);
    handleClose();
  };

  const handleCustomRange = () => {
    if (customStart && customEnd && customStart <= customEnd) {
      const customStartFormatted = moment(customStart).format("DD/MM/YYYY");
      const customEndFormatted = moment(customEnd).format("DD/MM/YYYY");
      agregarRango(customStart, customEnd, `${customStartFormatted} - ${customEndFormatted}`);
    }
  };

  useEffect(() => {
    if (customStart && customEnd) {
      agregarRango(customStart, customEnd, `${customStart} - ${customEnd}`);
    }
  }, []);

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          textTransform: "none",
          color: "var(--text-secondary)",
          fontSize: "0.875rem",
          gap: 1,
        }}
      >
        {label}
        <span className="material-icons-outlined text-xl">expand_more</span>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            const f = formatDate(today);
            agregarRango(f, f, "Hoy");
          }}
        >
          Hoy
        </MenuItem>
        <MenuItem
          onClick={() => {
            const start = new Date();
            start.setDate(today.getDate() - 6);
            agregarRango(formatDate(start), formatDate(today), "Últimos 7 días");
          }}
        >
          Últimos 7 días
        </MenuItem>
        <MenuItem
          onClick={() => {
            const start = new Date();
            start.setDate(today.getDate() - 29);
            agregarRango(formatDate(start), formatDate(today), "Últimos 30 días");
          }}
        >
          Últimos 30 días
        </MenuItem>
        <MenuItem
          onClick={() => {
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            agregarRango(formatDate(start), formatDate(today), "Este mes");
          }}
        >
          Este mes
        </MenuItem>

        <Divider />

        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" sx={{ color: "var(--text-secondary)" }}>
            Rango personalizado
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
            <input
              type="date"
              className="rounded border px-2 py-1 text-sm"
              value={customStart}
              onChange={(e) => setCustomStart(moment(e.target.value).format("YYYY-MM-DD"))}
            />
            <input
              type="date"
              className="rounded border px-2 py-1 text-sm"
              value={customEnd}
              onChange={(e) => setCustomEnd(moment(e.target.value).format("YYYY-MM-DD"))}
            />
            <Button
              size="small"
              onClick={handleCustomRange}
              sx={{
                textTransform: "none",
                fontSize: "0.75rem",
                alignSelf: "flex-end",
              }}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}
