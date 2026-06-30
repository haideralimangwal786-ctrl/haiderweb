const Logo = ({ size = "md", showTagline = false, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`font-bold ${size === "sm" ? "text-xl" : "text-2xl"} tracking-tight`}>
        HaiderWeb<span className="text-indigo-600">.io</span>
      </div>
      {showTagline && (
        <span className="text-sm opacity-80 mt-1">Web Developer</span>
      )}
    </div>
  );
};

export default Logo;