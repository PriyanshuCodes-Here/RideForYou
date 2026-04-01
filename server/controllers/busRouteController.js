import BusRoute from '../models/BusRoute.js';

export const getAllRoutes = async (req, res) => {
  try {
    const { origin, destination, busType } = req.query;
    const filter = { isActive: true };
    if (origin) filter.origin = { $regex: origin, $options: 'i' };
    if (destination) filter.destination = { $regex: destination, $options: 'i' };
    if (busType) filter.busType = busType;

    const routes = await BusRoute.find(filter).sort({ routeNumber: 1 });
    res.status(200).json({ routes, count: routes.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch routes', error: error.message });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const route = await BusRoute.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json({ route });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch route', error: error.message });
  }
};

export const createRoute = async (req, res) => {
  try {
    const route = await BusRoute.create(req.body);
    res.status(201).json({ message: 'Route created', route });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create route', error: error.message });
  }
};

export const updateRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json({ message: 'Route updated', route });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update route', error: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  try {
    const route = await BusRoute.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.status(200).json({ message: 'Route deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete route', error: error.message });
  }
};

export const searchRoutes = async (req, res) => {
  try {
    const { q } = req.query;
    const routes = await BusRoute.find({
      isActive: true,
      $or: [
        { routeNumber: { $regex: q, $options: 'i' } },
        { routeName: { $regex: q, $options: 'i' } },
        { origin: { $regex: q, $options: 'i' } },
        { destination: { $regex: q, $options: 'i' } },
      ],
    });
    res.status(200).json({ routes, count: routes.length });
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};