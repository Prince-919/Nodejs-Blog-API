const pageNotFound = (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} - page not found`,
  });
};

export default pageNotFound;
