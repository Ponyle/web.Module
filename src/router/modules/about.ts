const about1: AuthRoute.Route = {
  name: 'about',
  path: '/about',
  component: 'self',
  meta: {
    title: '工作台',

    keepAlive: true,
    singleLayout: 'basic',

    icon: 'fluent:book-information-24-regular',
    order: 1
  }
};

export default about1;
