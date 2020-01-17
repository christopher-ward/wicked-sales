require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql =
  `select "productId",
         "name",
         "price",
         "image",
         "shortDescription"
    from "products"`;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (isNaN(productId)) {
    next(new ClientError(`${productId} is not an integer`, 400));
  }
  const sql = `
  select *
    from "products"
    where "productId" = $1`;
  const reqParams = [productId];
  db.query(sql, reqParams)
    .then(result => {
      if (!result.rows[0]) {
        next(new ClientError(`No information at id ${productId} in database`, 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }
  const sql = `select "c"."cartItemId",
         "c"."price",
         "p"."productId",
         "p"."image",
         "p"."name",
         "p"."shortDescription"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
   where "c"."cartId" = $1`;
  const param = [req.session.cartId];
  db.query(sql, param)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart/', (req, res, next) => {
  const productId = req.body.productId;
  if (isNaN(req.body.productId)) {
    return next(new ClientError(`ID ${req.body.productId} is not an integer`, 400));
  } else if (!req.body.productId) {
    return next(new ClientError('Require a product ID', 400));
  }
  const sql = `
  select "price"
    from "products"
    where "productId" = $1`;
  const param = [productId];
  db.query(sql, param)
    .then(price => {
      if (price.rows.length === 0) {
        throw (new ClientError(`There is no price at ID ${productId}`, 400));
      }
      if (req.session.cartId) {
        return {
          cartId: req.session.cartId,
          price: price.rows[0].price
        };
      }
      const sql = `
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"`;
      return db.query(sql)
        .then(carts => {
          return {
            cartId: carts.rows[0].cartId,
            price: price.rows[0].price
          };
        });
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"`;
      const params = [req.session.cartId, parseInt(productId), result.price];
      return db.query(sql, params)
        .then(result => {
          return result.rows[0];
        });
    })
    .then(result => {
      const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1`;
      const param = [result.cartItemId];
      return db.query(sql, param)
        .then(result => {
          res.status(201).json(result.rows[0]);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
