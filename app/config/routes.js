import About from 'Views/About';
import Home from 'Views/Home';
import Test from 'Views/Test';
import _ from 'lodash';

/*
 *routes
 */
const Routes = [
  {
    exact: true,
    path: '/',
    component: Home,
    order: 1,
    title: 'Home',
  },
  {
    exact: false,
    path: '/about',
    component: About,
    order: 2,
    title: 'About',
  },
  {
    exact: false,
    path: '/test',
    component: Test,
    order: 3,
    title: 'Test',
  }
]

/*
 *routes sorted by order
 */
const routes = _.sortBy(Routes, 'order');

export default routes;
