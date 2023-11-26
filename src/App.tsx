import { BrowserRouter as Router } from 'react-router-dom';

import { PaginationProvider } from '@/lib/context/PaginationContext';
import Layout from '@/lib/layout';
import Routings from '@/lib/router/Routings';

import { QueryParamsProvider } from './lib/context/QueryContext';

const App = () => (
  <QueryParamsProvider>
    <PaginationProvider>
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </PaginationProvider>
  </QueryParamsProvider>
);

export default App;
