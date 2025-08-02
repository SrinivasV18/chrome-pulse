import { RefreshCw, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated?: Date;
}

export const DashboardHeader = ({ onRefresh, isRefreshing, lastUpdated }: DashboardHeaderProps) => {
  return (
    <div className="glass-card mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-cyber">
            <Activity className="h-8 w-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
              Analytics Command Center
            </h1>
            <p className="text-muted-foreground">
              Real-time business intelligence dashboard
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {lastUpdated && (
          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
        
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="cyber-glow bg-gradient-cyber text-black hover:bg-gradient-cyber/80"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Refresh Data'}
        </Button>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></div>
          <span className="text-cyber-cyan">Live</span>
        </div>
      </div>
    </div>
  );
};