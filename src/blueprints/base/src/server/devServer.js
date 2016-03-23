import compression from 'compression';
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import { routes } from '../routes';
import config from '../../webpack.config.dev';

const PORT = process.env.PORT || 3000;

const renderApp = (props, res) => {
  const markup = renderToString(<RouterContext {...props} />);
  const html = createPage(markup);

  write(html, 'text/html', res);
};

var app = express();
var compiler = webpack(config);

app.use(compression());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

