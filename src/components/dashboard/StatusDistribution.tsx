import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { SheetRow } from '@/hooks/useGoogleSheets';

interface StatusDistributionProps {
  data: SheetRow[];
}

export const StatusDistribution = ({ data }: StatusDistributionProps) => {
  // Count projects by status
  const statusData = data.reduce((acc, row) => {
    const status = row.status;
    const existing = acc.find(item => item.status === status);
    
    if (existing) {
      existing.count += 1;
      existing.value += 1;
    } else {
      acc.push({
        status,
        count: 1,
        value: 1
      });
    }
    return acc;
  }, [] as Array<{ status: string; count: number; value: number }>);

  const colors = [
    'hsl(var(--cyber-cyan))',
    'hsl(var(--cyber-magenta))',
    'hsl(var(--cyber-purple))',
    'hsl(var(--cyber-orange))',
    'hsl(var(--cyber-green))',
    'hsl(var(--cyber-yellow))'
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4 border border-cyber-cyan/50">
          <p className="text-cyber-cyan font-medium">{data.status}</p>
          <p className="text-foreground">{data.count} projects</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
        Project Status Distribution
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  stroke="hsl(var(--background))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};