var path = require("path");

module.exports = htmlRoutes;
function htmlRoutes(application) 
{
  application.get("/survey", function(request, result)
  {
    result.sendFile(path.join(__dirname, "/../public/survey.html"));
  });

  application.use(function(request, result)
  {
    result.sendFile(path.join(__dirname, "/../public/home.html"));
  });
};