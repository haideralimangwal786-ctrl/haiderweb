import Logo from "./Logo";


const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <Logo size="sm" showTagline={false} className="justify-center mb-4" />

        <p className="text-sm">
          © {new Date().getFullYear()} HaiderWeb.io — All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;