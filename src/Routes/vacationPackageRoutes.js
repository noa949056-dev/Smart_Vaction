import { Router } from 'express';
import { 
  getAllVacationPackages, 
  getVacationPackageById, 
  createVacationPackage, 
  updateVacationPackage, 
  deleteVacationPackage 
} from '../Controller/vacationPackages.Controller.js';
import { 
  vacationPackageSchema, 
  updateVacationPackageSchema 
} from '../Validations/vacationPackages.validate.js';
import { validateBody } from '../middlewares/validateJoi.middleware.js';

const router = Router();


const validateCreateVacationPackage = validateBody(vacationPackageSchema);
const validateUpdateVacationPackage = validateBody(updateVacationPackageSchema);

// נתיבי הראוטר
router.get('/', getAllVacationPackages);
router.get('/:id', getVacationPackageById);
router.post('/', validateCreateVacationPackage, createVacationPackage);
router.put('/:id', validateUpdateVacationPackage, updateVacationPackage);
router.delete('/:id', deleteVacationPackage);

export default router;