import express from 'express';
import { getAllRoutes, getRouteById, createRoute, updateRoute, deleteRoute, searchRoutes } from '../controllers/busRouteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllRoutes);
router.get('/search', searchRoutes);
router.get('/:id', getRouteById);

router.use(protect);
router.post('/', createRoute);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

export default router;