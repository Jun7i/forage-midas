import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { columns } from '../internals/data/gridData';

interface Transaction {
  id: number;
  senderId: number;
  recipientId: number;
  amount: number;
  status: string;
  timestamp: string;
}

export default function CustomizedDataGrid() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8081/transactions');
        const data: Transaction[] = await response.json();
        console.log('Fetched transactions:', data); // Debug log
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchTransactions();
    
    // Poll every 2 seconds
    const interval = setInterval(fetchTransactions, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <DataGrid
      loading={loading}
      checkboxSelection
      rows={transactions}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableColumnResize
      density="compact"
      filterMode="server"
      sx={{
        '& .MuiDataGrid-filterForm': {
          '& .MuiFormControl-root': {
            mt: 0,
            '& .MuiInputBase-root': {
              height: 36
            }
          }
        }
      }}
    />
  );
}
