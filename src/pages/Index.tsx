import { useEffect } from 'react';
import { Users, Camera, DollarSign, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StatusDistribution } from '@/components/dashboard/StatusDistribution';
import { ClientsList } from '@/components/dashboard/ClientsList';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const csvUrl = 'https://docs.google.com/spreadsheets/d/1pY023LcrV-6mwz3PKi3S2raJmzaEbqz5PXAuy75CrxE/export?format=csv';
  const { data, loading, error, refetch } = useGoogleSheets(csvUrl);
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Data Sync Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Calculate metrics
  const totalClients = data.length;
  const totalHeadshots = data.reduce((sum, row) => sum + row.headshots, 0);
  const totalRevenue = data.reduce((sum, row) => sum + row.price, 0);
  const completedProjects = data.filter(row => row.status.toLowerCase() === 'completed').length;
  const pendingProjects = data.filter(row => row.status.toLowerCase() === 'pending').length;
  const avgProjectValue = totalClients > 0 ? totalRevenue / totalClients : 0;

  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      <DashboardHeader
        onRefresh={refetch}
        isRefreshing={loading}
        lastUpdated={new Date()}
      />

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Clients"
          value={totalClients}
          change="+12%"
          changeType="positive"
          icon={Users}
          description="Active client portfolio"
          className="animate-float"
        />
        
        <MetricCard
          title="Total Headshots"
          value={totalHeadshots.toLocaleString()}
          change="+8%"
          changeType="positive"
          icon={Camera}
          description="Shots completed to date"
          className="animate-float"
          style={{ animationDelay: '0.1s' }}
        />
        
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+15%"
          changeType="positive"
          icon={DollarSign}
          description="Gross revenue generated"
          className="animate-float"
          style={{ animationDelay: '0.2s' }}
        />
        
        <MetricCard
          title="Avg Project Value"
          value={`$${avgProjectValue.toFixed(0)}`}
          change="+3%"
          changeType="positive"
          icon={TrendingUp}
          description="Average per project"
          className="animate-float"
          style={{ animationDelay: '0.3s' }}
        />
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Completed Projects"
          value={completedProjects}
          icon={Activity}
          description="Successfully delivered"
          className="border-cyber-green/50"
        />
        
        <MetricCard
          title="Pending Projects"
          value={pendingProjects}
          icon={AlertTriangle}
          description="Awaiting completion"
          className="border-cyber-orange/50"
        />
        
        <MetricCard
          title="Completion Rate"
          value={`${totalClients > 0 ? ((completedProjects / totalClients) * 100).toFixed(1) : 0}%`}
          icon={TrendingUp}
          description="Project success rate"
          className="border-cyber-cyan/50"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={data} />
        <StatusDistribution data={data} />
      </div>

      {/* Clients List */}
      <ClientsList data={data} />

      {loading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-8 flex items-center gap-4">
            <div className="w-8 h-8 border-2 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
            <span className="text-cyber-cyan font-medium">Syncing data from Google Sheets...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
