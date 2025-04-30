module.exports = (req, res, next) => {
  if ((req.user && req.user.role === 'mediator') || req.postalCircleId) {
    return next();
  }
  return res.status(403).json({ message: 'Access denied. Mediators and Postal Circles only.' });
};
