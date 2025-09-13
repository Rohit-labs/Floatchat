import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Download } from "lucide-react";

const MapVisualization = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Interactive Ocean Data Visualization
          </h2>
          <p className="text-xl text-muted-foreground">
            Explore ARGO float trajectories and oceanographic data on interactive maps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Controls */}
          <Card className="lg:col-span-1 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Data Filters
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Region</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Indian Ocean</option>
                  <option>Arabian Sea</option>
                  <option>Bay of Bengal</option>
                  <option>Equatorial Region</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Time Range</label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>2023</option>
                  <option>Custom range</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Parameters</label>
                <div className="space-y-2">
                  {["Temperature", "Salinity", "Oxygen", "Chlorophyll"].map((param) => (
                    <label key={param} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{param}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="ocean" className="w-full">
                Apply Filters
              </Button>
            </div>
          </Card>

          {/* Map Area */}
          <Card className="lg:col-span-3 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                ARGO Float Locations
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Layers
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Placeholder Map */}
            <div className="relative h-96 bg-gradient-to-br from-ocean-light/20 to-primary/10 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h4>
                <p className="text-muted-foreground mb-4">
                  Map component will show ARGO float locations, trajectories, and data points
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary">124 Active Floats</Badge>
                  <Badge variant="secondary">Indian Ocean</Badge>
                  <Badge variant="secondary">Last 30 days</Badge>
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm">Active Floats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent"></div>
                <span className="text-sm">Recent Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                <span className="text-sm">Historical Data</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Data Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {summaryData.map((item, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <h4 className="text-2xl font-bold text-primary mb-2">{item.value}</h4>
              <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
              <p className="text-xs text-accent">{item.change}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const summaryData = [
  {
    value: "2,847",
    label: "Total Profiles",
    change: "+12% this month"
  },
  {
    value: "124",
    label: "Active Floats",
    change: "5 new deployments"
  },
  {
    value: "98.5%",
    label: "Data Quality",
    change: "↑ 0.3% from last month"
  }
];

export default MapVisualization;