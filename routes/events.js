/*
    EVENT Routers
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// Todas las peticiones deben validar su JWT
router.use(validarJWT);
// Todas tienen que pasar por la validacion del JWT
// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
// msg: crear evento

router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "fecha de inicio es obligatoria").custom(isDate),
    check("end", "fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//Borrar evento

router.delete("/:id", eliminarEvento);

module.exports = router;
