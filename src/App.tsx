import { SideNavigation } from '@metrostar/comet-uswds';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Dashboard } from './pages/dashboard/dashboard';
import Details from './pages/details/details';
import { Home } from './pages/home/home';
import { SearchResults } from './pages/search-results/search-results';
import { SignIn } from './pages/sign-in/sign-in';

const queryClient = new QueryClient();

export const App = (): React.ReactElement => {
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Conditionally render the Header and SideNavigation */}
      {location.pathname !== '/signin' && (
        <>
          <Header />
          <SideNavigation
            ariaLabel="Secondary navigation"
            id="side-navigation-2"
            items={[
              {
                anchor: (
                  <a
                    className="usa-current"
                    href="/"
                    onClick={function Xs() {}}
                  >
                    Browse
                  </a>
                ),
                items: [
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Tools
                      </a>
                    ),
                  },
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Clusters
                      </a>
                    ),
                  },
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Data Sources
                      </a>
                    ),
                  },
                ],
              },
              {
                anchor: (
                  <a className="" href="/" onClick={function Xs() {}}>
                    Navigation Link
                  </a>
                ),
                items: [
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Navigation Link
                      </a>
                    ),
                  },
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Navigation Link
                      </a>
                    ),
                  },
                  {
                    anchor: (
                      <a className="" href="/" onClick={function Xs() {}}>
                        Navigation Link
                      </a>
                    ),
                  },
                ],
              },
            ]}
          />
        </>
      )}
      <main
        id="mainSection"
        className="usa-section"
        style={
          location.pathname !== '/signin'
            ? { paddingLeft: '264px' }
            : { paddingBlock: '0' }
        }
      >
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/results" element={<SearchResults />} />
          </Route>
        </Routes>
      </main>
      {location.pathname !== '/signin' && <Footer />}
    </QueryClientProvider>
  );
};
