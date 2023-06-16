import React from 'react';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Route, Routes } from 'react-router';
import { SignIn } from './pages/sign-in/sign-in';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { RecoilRoot } from 'recoil';

export const App = (): React.ReactElement => (
  <RecoilRoot>
    <div>
      <Header />
      <main id="mainSection" className="usa-section">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </RecoilRoot>
);
