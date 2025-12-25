import senxLogo from "@/assets/senx-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t-2 border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img src={senxLogo} alt="senX Cloud" className="h-12 w-auto" />
              <span className="text-xl font-heading">
                sen<span className="text-primary">X</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-md font-pixel text-lg">
              Premium BDIX game server hosting with ultra-low latency. Experience lag-free gaming 
              with our enterprise-grade infrastructure.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2.5 bg-card border-2 border-border hover:border-primary transition-colors text-lg"
              >
                📘
              </a>
              <a
                href="#"
                className="p-2.5 bg-card border-2 border-border hover:border-primary transition-colors text-lg"
              >
                🐦
              </a>
              <a
                href="https://discord.gg/Wphjzp73CH"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-card border-2 border-border hover:border-primary transition-colors text-lg"
              >
                💬
              </a>
              <a
                href="#"
                className="p-2.5 bg-card border-2 border-border hover:border-primary transition-colors text-lg"
              >
                📺
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xs mb-4">&gt; LINKS</h4>
            <ul className="space-y-3 font-pixel text-lg">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#games" className="text-muted-foreground hover:text-primary transition-colors">
                  Game Servers
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Server Status
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-heading text-xs mb-4">&gt; PAYMENT</h4>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-card border-2 border-border">
                <span className="text-sm font-pixel text-primary">bKash</span>
              </div>
              <div className="px-3 py-1.5 bg-card border-2 border-border">
                <span className="text-sm font-pixel text-primary">Nagad</span>
              </div>
              <div className="px-3 py-1.5 bg-card border-2 border-border">
                <span className="text-sm font-pixel">Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t-2 border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-pixel">
            © {new Date().getFullYear()} senX Cloud. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm font-pixel">
            Made with ❤️ by Ehteshamul Haque Rian
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
