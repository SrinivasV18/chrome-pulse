import { useState, useEffect } from 'react';

export interface SheetRow {
  clients: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

export const useGoogleSheets = (csvUrl: string) => {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(csvUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const csvText = await response.text();
      const rows = csvText.split('\n').filter(row => row.trim());
      
      if (rows.length < 2) {
        throw new Error('No data found in CSV');
      }
      
      // Skip header row and parse data
      const parsedData = rows.slice(1).map((row, index) => {
        const columns = row.split(',').map(col => col.trim().replace(/"/g, ''));
        
        if (columns.length < 5) {
          console.warn(`Row ${index + 2} has insufficient columns:`, columns);
          return null;
        }
        
        return {
          clients: columns[0] || 'Unknown',
          headshots: parseInt(columns[1]) || 0,
          price: parseFloat(columns[2]) || 0,
          status: columns[3] || 'Unknown',
          email: columns[4] || 'No email'
        };
      }).filter(Boolean) as SheetRow[];
      
      setData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching Google Sheets data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [csvUrl]);

  return { data, loading, error, refetch: fetchData };
};