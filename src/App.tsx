import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '@/lib/layout';
import Routings from '@/lib/router/Routings';

import { QueryParamsProvider } from './lib/context/QueryContext';

const App = () => (
  <QueryParamsProvider>
    <Router>
      <Layout>
        <Routings />
      </Layout>
    </Router>
  </QueryParamsProvider>
);

export default App;
