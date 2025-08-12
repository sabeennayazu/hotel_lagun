import dynamic from 'next/dynamic';


const Navbar = dynamic(() => import('@/components/Navbar'));
const Hero = dynamic(() => import('@/components/Hero'));
const About = dynamic(() => import('@/components/About'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />   
      <Footer />
    </main>
  );
}
