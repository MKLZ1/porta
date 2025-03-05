import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/porta/", // Reemplaza <NOMBRE_DEL_REPOSITORIO> con el nombre de tu repo
});
