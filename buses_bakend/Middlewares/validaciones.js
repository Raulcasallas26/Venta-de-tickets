import { validationResult } from 'express-validator';


export function validarResultados(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json(errors),
        msj="hay un error en las validaciones";
    }

    next();
  }


export default validarResultados;