var express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var cors = require('cors');

var app = express();

app.use(cors());

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

var keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/secured', keycloak.protect('realm:myrole'), function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Secret message!');
});

app.get('/public', function (req, res) {
  res.setHeader('content-type', 'text/plain');
  res.send('Public message!');
});

app.get('/', function (req, res) {
  res.send('<html><body><ul><li><a href="/public">Public endpoint</a></li><li><a href="/secured">Secured endpoint</a></li></ul></body></html>');
});

app.listen(3000, function () {
  console.log('Started at port 3000');
});
FROM node
COPY package.json .
RUN npm install
COPY app.js .
COPY keycloak.json .
EXPOSE 3000
CMD [ "npm", "start" ]
{
  "realm": "myrealm",
  "bearer-only": true,
  "auth-server-url": "${env.KC_URL:http://192.168.56.5:8080/auth}",
  "resource": "service-nodejs"
}

ls

0 info it worked if it ends with ok
1 verbose cli [ '/usr/bin/node', '/usr/bin/npm', 'start' ]
2 info using npm@3.5.2
3 info using node@v8.10.0
4 verbose run-script [ 'prestart', 'start', 'poststart' ]
5 info lifecycle keycloak-example-service@0.0.1~prestart: keycloak-example-service@0.0.1
6 silly lifecycle keycloak-example-service@0.0.1~prestart: no script for prestart, continuing
7 info lifecycle keycloak-example-service@0.0.1~start: keycloak-example-service@0.0.1
8 verbose lifecycle keycloak-example-service@0.0.1~start: unsafe-perm in lifecycle true
9 verbose lifecycle keycloak-example-service@0.0.1~start: PATH: /usr/share/npm/bin/node-gyp-bin:/home/student/Keycloak/workshop3/backend/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
10 verbose lifecycle keycloak-example-service@0.0.1~start: CWD: /home/student/Keycloak/workshop3/backend
11 silly lifecycle keycloak-example-service@0.0.1~start: Args: [ '-c', 'node app.js' ]
12 silly lifecycle keycloak-example-service@0.0.1~start: Returned: code: 1  signal: null
13 info lifecycle keycloak-example-service@0.0.1~start: Failed to exec start script
14 verbose stack Error: keycloak-example-service@0.0.1 start: `node app.js`
14 verbose stack Exit status 1
14 verbose stack     at EventEmitter.<anonymous> (/usr/share/npm/lib/utils/lifecycle.js:232:16)
14 verbose stack     at emitTwo (events.js:126:13)
14 verbose stack     at EventEmitter.emit (events.js:214:7)
14 verbose stack     at ChildProcess.<anonymous> (/usr/share/npm/lib/utils/spawn.js:24:14)
14 verbose stack     at emitTwo (events.js:126:13)
14 verbose stack     at ChildProcess.emit (events.js:214:7)
14 verbose stack     at maybeClose (internal/child_process.js:925:16)
14 verbose stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
15 verbose pkgid keycloak-example-service@0.0.1
16 verbose cwd /home/student/Keycloak/workshop3/backend
17 error Linux 5.4.0-84-generic
18 error argv "/usr/bin/node" "/usr/bin/npm" "start"
19 error node v8.10.0
20 error npm  v3.5.2
21 error code ELIFECYCLE
22 error keycloak-example-service@0.0.1 start: `node app.js`
22 error Exit status 1
23 error Failed at the keycloak-example-service@0.0.1 start script 'node app.js'.
23 error Make sure you have the latest version of node.js and npm installed.
23 error If you do, this is most likely a problem with the keycloak-example-service package,
23 error not with npm itself.
23 error Tell the author that this fails on your system:
23 error     node app.js
23 error You can get information on how to open an issue for this project with:
23 error     npm bugs keycloak-example-service
23 error Or if that isn't available, you can get their info via:
23 error     npm owner ls keycloak-example-service
23 error There is likely additional logging output above.
24 verbose exit [ 1, true ]

{
  "name": "keycloak-example-service",
  "version": "0.0.1",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "keycloak-connect": "^11.0.0",
    "express": "^4.17.1",
    "express-session": "^1.17.1",
    "cors": "^2.8.5"
  }
}
