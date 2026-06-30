import { BrowserRouter, Routes, Route } from "react-router-dom";




import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;