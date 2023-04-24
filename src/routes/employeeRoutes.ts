import { Router } from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController';

const router = Router();

router.post('/', createEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
