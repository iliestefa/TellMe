import { Router } from 'express';
import { CompanyController } from '../controllers/companyController';
import {
  createCompanyValidation,
  updateCompanyValidation,
} from '../middlewares/validators/companyValidator';
import { handleValidationErrors } from '../middlewares/validationResult';

const router = Router();

router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getById);
router.post(
  '/',
  createCompanyValidation,
  handleValidationErrors,
  CompanyController.create,
);

router.put(
  '/:id',
  updateCompanyValidation,
  handleValidationErrors,
  CompanyController.update,
);

router.delete('/:id', CompanyController.delete);

export default router;

