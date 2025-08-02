import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SheetRow } from '@/hooks/useGoogleSheets';

interface RevenueChartProps {
  data: SheetRow[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Group data by status and calculate revenue
  const chartData = data.reduce((acc, row) => {
    const status = row.status;
    const existing = acc.find(item => item.status === status);
    
    if (existing) {
      existing.revenue += row.price;
      existing.count += 1;
    } else {
      acc.push({
        status,
        revenue: row.price,
        count: 1
      });
    }
    return acc;
  }, [] as Array<{ status: string; revenue: number; count: number }>);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-cyber-cyan/50">
          <p className="text-cyber-cyan font-medium">{`Status: ${label}`}</p>
          <p className="text-foreground">
            Revenue: <span className="text-cyber-cyan">₹{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-muted-foreground text-sm">
            {payload[0].payload.count} projects
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
        Revenue by Status
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--cyber-cyan))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--cyber-cyan))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="status" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--cyber-cyan))"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};