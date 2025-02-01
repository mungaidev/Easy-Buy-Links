import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AdminPage } from './pages/AdminPage';
import { AboutUs } from './pages/AboutUs';
import { SearchPage } from './pages/SearchPage';
import { ProductProvider } from './context/ProductContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Chatbot } from './components/Chatbot';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './main.tsx';

function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductProvider products={products}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </div>
          <Footer />
          <ScrollToTop />
          <Chatbot />
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;