import React from 'react';
import { Route, Routes } from 'react-router';
import { RecoilRoot } from 'recoil';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { Dashboard } from './pages/dashboard/dashboard';
import Details from './pages/details/details';
import { Home } from './pages/home/home';
import { SignIn } from './pages/sign-in/sign-in';

export const App = (): React.ReactElement => (
  <RecoilRoot>
    <div>
      <Header />
      <main id="mainSection" className="usa-section">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/details/:id" element={<Details />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  </RecoilRoot>
);
