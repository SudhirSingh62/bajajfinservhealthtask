// Name: Sudhir Singh
// Roll Number: YOURROLL

const expressServer = require('express');
const corsMiddleware = require('cors');
const bfhlEndpoints = require('./routes/bfhl');

const application = expressServer();
const LISTEN_PORT = process.env.PORT || 3000;

application.use(corsMiddleware());
application.use(expressServer.json());

application.use('/bfhl', bfhlEndpoints);

application.listen(LISTEN_PORT, () => {
  console.log(`Express engine active on port ${LISTEN_PORT}`);
});
