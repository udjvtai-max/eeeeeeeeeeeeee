import senxLogo from "@/assets/senx-logo.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Game Servers", href: "/games" },
  { name: "VPS", href: "/vps-pricing" },
  { name: "Web Hosting", href: "/web-hosting-pricing" },
  { name: "Domain", href: "/domain-pricing" },
  { name: "SenX Support", href: "/forum" },
  { name: "Status", href: "/status" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isLoading } = useAuth();

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      if (location.pathname !== "/") {
        window.location.href = href;
      } else {
        const element = document.querySelector(href.replace("/", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={senxLogo} alt="senX Cloud" className="h-10 w-auto" />
            <span className="text-sm font-heading">
              sen<span className="text-primary">X</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.href.startsWith("/#") ? (
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors font-pixel text-lg py-2 px-1"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-muted-foreground hover:text-primary transition-colors font-pixel text-lg py-2 px-1 ${
                      location.pathname === link.href ? "text-primary" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://discord.gg/senxcloud"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-pixel text-muted-foreground hover:text-primary transition-colors"
            >
              Join Discord
            </a>
            {!isLoading && (
              <>
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="px-4 py-2 font-pixel text-sm border-2 border-border hover:border-primary"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      className="px-4 py-2 font-pixel text-sm border-2 border-border hover:border-primary"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <Link
              to="/pricing/minecraft"
              className="px-5 py-2.5 bg-primary text-primary-foreground font-heading text-xs hover:bg-primary/90 transition-colors border-2 border-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t-2 border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.href.startsWith("/#") ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors font-pixel text-lg"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors font-pixel text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              {!isLoading && (
                <>
                  {user ? (
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="font-pixel text-sm border-2 border-border hover:border-primary"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full font-pixel text-sm border-2 border-border hover:border-primary"
                      >
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <Link
                to="/pricing/minecraft"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-heading text-xs text-center hover:bg-primary/90 transition-colors border-2 border-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;