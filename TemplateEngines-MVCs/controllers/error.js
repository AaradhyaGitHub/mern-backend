exports.get404Page = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "Not Found :(",
    path: req.url // Pass the requested URL path here
  });
};
