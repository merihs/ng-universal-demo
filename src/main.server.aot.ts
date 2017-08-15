// the following line is a temporary fix (see https://github.com/angular/angular/issues/18199)
(global as any).XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
 * This file should be temporary
 * See https://github.com/angular/angular-cli/pull/5194
 */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { ROUTES } from './routes';
import { Api } from './api/api';
import { enableProdMode, ReflectiveInjector } from '@angular/core';

import { PostService } from './api/post.service';

enableProdMode();
const app = express();

let injector = ReflectiveInjector.resolveAndCreate([
  PostService
]);
const api = injector.resolveAndInstantiate(Api);

const port = 8000;
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory,
  providers: [ PostService ]
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist', { index: false }));

ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.get('/posts', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  let list = api.getPosts().subscribe(data => {
    res.json(data);
  });;
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(8000, () => {
  console.log(`Listening at ${baseUrl}`);
});
