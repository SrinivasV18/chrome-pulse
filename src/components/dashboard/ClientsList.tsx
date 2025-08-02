import { Mail, Camera, DollarSign, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SheetRow } from '@/hooks/useGoogleSheets';

interface ClientsListProps {
  data: SheetRow[];
}

export const ClientsList = ({ data }: ClientsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-cyber-green/20 text-cyber-green border-cyber-green/30';
      case 'in progress':
        return 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30';
      case 'pending':
        return 'bg-cyber-orange/20 text-cyber-orange border-cyber-orange/30';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const sortedData = [...data].sort((a, b) => b.price - a.price);

  return (
    <div className="glass-card">
      <h3 className="text-xl font-bold mb-6 bg-gradient-cyber bg-clip-text text-transparent">
        Client Projects
      </h3>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedData.map((client, index) => (
          <div 
            key={index}
            className="glass p-4 rounded-lg hover:scale-[1.02] transition-all duration-300 border border-border/50"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-cyber flex items-center justify-center">
                  <span className="text-black font-bold text-sm">
                    {client.clients.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{client.clients}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {client.email}
                  </div>
                </div>
              </div>
              
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-cyber-cyan">
                  <Camera className="h-4 w-4" />
                  <span>{client.headshots} shots</span>
                </div>
                
                <div className="flex items-center gap-1 text-cyber-magenta">
                  <DollarSign className="h-4 w-4" />
                  <span>${client.price.toLocaleString()}</span>
                </div>
              </div>
              
              {client.status.toLowerCase() === 'pending' && (
                <AlertCircle className="h-4 w-4 text-cyber-orange animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};