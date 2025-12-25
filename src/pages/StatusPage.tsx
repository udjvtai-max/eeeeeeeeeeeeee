import { useEffect, useState } from "react";
import { Activity, Clock, Server, Zap, RefreshCw, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServerNode {
  name: string;
  location: string;
  status: "operational" | "degraded" | "down";
  latency: number;
  load: number;
  uptime: number;
}

const generateRandomMetrics = (): ServerNode[] => [
  {
    name: "BDIX Node 1",
    location: "Dhaka, Bangladesh",
    status: "operational",
    latency: Math.floor(Math.random() * 10) + 5,
    load: Math.floor(Math.random() * 30) + 40,
    uptime: 99.99,
  },
  {
    name: "BDIX Node 2",
    location: "Dhaka, Bangladesh",
    status: "operational",
    latency: Math.floor(Math.random() * 8) + 8,
    load: Math.floor(Math.random() * 25) + 35,
    uptime: 99.97,
  },
  {
    name: "Minecraft Cluster",
    location: "BDIX Network",
    status: "operational",
    latency: Math.floor(Math.random() * 5) + 3,
    load: Math.floor(Math.random() * 40) + 30,
    uptime: 99.98,
  },
  {
    name: "FiveM Cluster",
    location: "BDIX Network",
    status: Math.random() > 0.9 ? "degraded" : "operational",
    latency: Math.floor(Math.random() * 12) + 6,
    load: Math.floor(Math.random() * 35) + 45,
    uptime: 99.95,
  },
  {
    name: "Palworld Cluster",
    location: "BDIX Network",
    status: "operational",
    latency: Math.floor(Math.random() * 7) + 4,
    load: Math.floor(Math.random() * 20) + 25,
    uptime: 99.99,
  },
  {
    name: "Bot Hosting (US)",
    location: "US East",
    status: "operational",
    latency: Math.floor(Math.random() * 50) + 120,
    load: Math.floor(Math.random() * 25) + 20,
    uptime: 99.96,
  },
];

const StatusPage = () => {
  const [servers, setServers] = useState<ServerNode[]>(generateRandomMetrics());
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setServers(generateRandomMetrics());
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setServers(generateRandomMetrics());
      setLastUpdated(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-primary";
      case "degraded":
        return "text-yellow-500";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle;
      case "degraded":
        return AlertTriangle;
      case "down":
        return XCircle;
      default:
        return Activity;
    }
  };

  const overallStatus = servers.every((s) => s.status === "operational")
    ? "All Systems Operational"
    : servers.some((s) => s.status === "down")
    ? "Partial Outage"
    : "Minor Issues";

  const averageLatency = Math.round(
    servers.filter(s => s.location.includes("BDIX") || s.location.includes("Dhaka")).reduce((acc, s) => acc + s.latency, 0) / 
    servers.filter(s => s.location.includes("BDIX") || s.location.includes("Dhaka")).length
  );

  const averageUptime = (servers.reduce((acc, s) => acc + s.uptime, 0) / servers.length).toFixed(2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Server <span className="text-gradient">Status</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Real-time monitoring of our infrastructure
            </p>
            
            {/* Overall Status Banner */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-card rounded-xl border border-border">
              <div className={`w-3 h-3 rounded-full ${
                overallStatus === "All Systems Operational" ? "bg-primary animate-pulse" : "bg-yellow-500"
              }`} />
              <span className="font-semibold">{overallStatus}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground text-sm">Avg BDIX Latency</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{averageLatency}ms</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground text-sm">Overall Uptime</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{averageUptime}%</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground text-sm">Active Nodes</span>
              </div>
              <div className="text-3xl font-bold text-gradient">{servers.length}</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground text-sm">Last Updated</span>
              </div>
              <div className="text-lg font-semibold">
                {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Server List */}
          <div className="space-y-4">
            {servers.map((server, index) => {
              const StatusIcon = getStatusIcon(server.status);
              return (
                <div
                  key={server.name}
                  className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <StatusIcon className={`w-6 h-6 ${getStatusColor(server.status)}`} />
                      <div>
                        <h3 className="font-semibold text-lg">{server.name}</h3>
                        <p className="text-sm text-muted-foreground">{server.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 md:gap-8">
                      {/* Latency */}
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Latency</div>
                        <div className={`text-lg font-bold ${server.latency < 20 ? "text-primary" : "text-foreground"}`}>
                          {server.latency}ms
                        </div>
                      </div>

                      {/* Load */}
                      <div className="text-center min-w-[100px]">
                        <div className="text-xs text-muted-foreground mb-1">Load</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                server.load > 80 ? "bg-destructive" : server.load > 60 ? "bg-yellow-500" : "bg-primary"
                              }`}
                              style={{ width: `${server.load}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-10">{server.load}%</span>
                        </div>
                      </div>

                      {/* Uptime */}
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">Uptime</div>
                        <div className="text-lg font-bold text-primary">{server.uptime}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Incident History */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
            <div className="p-6 bg-card rounded-xl border border-border text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">No incidents reported in the last 30 days</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
