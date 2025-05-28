import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { About } from './pages/about/about';
import { CaseDetails } from './pages/case-details/case-details';
import { ContactUs } from './pages/contact-us/contact-us';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { SearchResults } from './pages/search-results/search-results';
import { SignIn } from './pages/sign-in/sign-in';

const queryClient = new QueryClient();

export const App = (): React.ReactElement => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <main id="mainSection" className="usa-section">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases/:id" element={<CaseDetails />} />
          <Route path="/results" element={<SearchResults />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </QueryClientProvider>
);
