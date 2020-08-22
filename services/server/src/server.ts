import { server } from './app';

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log(
    `⚡️  Server listening in ${process.env.NODE_ENV} mode on http://localhost:3001`
  );
});
