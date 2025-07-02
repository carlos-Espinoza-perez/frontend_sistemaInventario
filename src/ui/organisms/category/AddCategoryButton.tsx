import { useState } from "react";
import { Modal, Box, Typography, Backdrop, Fade } from "@mui/material";
import { axiosPrivate } from "../../../services/AxiosInstance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const AddCategoryButton = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    if (!name) {
      alert("Por favor, rellena todos los campos");
      return;
    }


    axiosPrivate
      .post(
        "/categories",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setOpen(false);
        alert("Categoría creada con éxito");
      });
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex flex-col items-center justify-center gap-2 rounded-lg bg-[var(--surface-color)] p-4 text-center shadow-sm hover:bg-gray-50"
        type="button"
      >
        <span className="material-icons-outlined text-[var(--primary-color)]">
          category
        </span>
        <p className="text-sm font-medium text-[var(--text-primary)]">
          Agregar categoria
        </p>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              mb={3}
              textAlign={"center"}
            >
              Agregar nueva categoría
            </Typography>

            <div>
              <label
                htmlFor="name"
                className="block text-[var(--text-primary)] text-base font-medium leading-tight mb-1"
              >
                Nombre
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ingresar nombre"
                className="form-input block w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] border border-[var(--border-color)] bg-white h-14 placeholder:text-[var(--text-secondary)] px-4 text-base font-normal leading-normal"

                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <button
              onClick={handleSave}
              className="flex w-full items-center justify-center rounded-lg h-12 px-5 mt-3 bg-[var(--primary-color)] text-white text-base font-semibold leading-normal tracking-wide hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:ring-opacity-50 transition-colors duration-200 ease-in-out">
              <span className="material-icons mr-2">save</span>
              Guardar categoría
            </button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AddCategoryButton;
