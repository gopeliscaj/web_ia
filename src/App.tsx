import { CartProvider } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Story from '@/components/Story';
import Artisans from '@/components/Artisans';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

export default function App() {
  useReveal();

  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-crema-50">
        <Nav />
        <main>
          <Hero />
          <Catalog />
          <Story />
          <Artisans />
          <Stats />
          <Testimonials />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
