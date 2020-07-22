module.exports = (title, body, scripts) =>
`<!DOCTYPE html>
<!--suppress ALL -->
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <link type="text/css" rel="stylesheet" href="style.css"/>
</head>
<body class="proxy__body">
${body}
${scripts}
</body>
</html>`