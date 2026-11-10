import { Router } from 'express';
import { getAllVacationPackages, getVacationPackageById, createVacationPackage, updateVacationPackage, deleteVacationPackage } from '../Controller/vactionPackages.Controller.js';
import { vacationPackageSchema, updateVacationPackageSchema } from '../Validations/vactionPackages.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();

router.get('/', getAllVacationPackages);
router.get('/:id', getVacationPackageById);
router.post('/', addVacationPackage);
router.put('/:id', updateVacationPackage);

const validateVacationPackage = validateBody(vacationPackageSchema);