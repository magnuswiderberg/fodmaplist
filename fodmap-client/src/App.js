import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Layout from './layout/Layout';
import BrowsePage from './pages/BrowsePage';

import Items from './data/fodmap_items.json';

export default function App() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BrowsePage items={Items} language="sv" />} />
          <Route path="en" element={<BrowsePage items={Items} language="en" />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}
