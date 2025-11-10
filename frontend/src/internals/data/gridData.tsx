import Chip from '@mui/material/Chip';
import { 
  GridColDef,
} from '@mui/x-data-grid';

export interface Transaction {
  id: number;
  senderId: number;
  recipientId: number;
  amount: number;
  status: string;
  timestamp: string;
}

function renderStatus(status: string) {
  const colors: { [index: string]: 'success' | 'warning' | 'error' | 'default' } = {
    COMPLETED: 'success',
    PENDING: 'warning',
    FAILED: 'error',
    PROCESSING: 'default',
  };

  return <Chip label={status} color={colors[status] || 'default'} size="small" />;
}

export const columns: GridColDef<Transaction>[] = [
  { 
    field: 'id', 
    headerName: 'Transaction ID', 
    flex: 0.5, 
    minWidth: 100 
  },
  { 
    field: 'senderId', 
    headerName: 'Sender ID', 
    flex: 0.5, 
    minWidth: 100 
  },
  { 
    field: 'recipientId', 
    headerName: 'Recipient ID', 
    flex: 0.5, 
    minWidth: 100 
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    flex: 0.5,
    minWidth: 100,
    headerAlign: 'right',
    align: 'right',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderStatus(String(params.value)),
  },
  {
    field: 'timestamp',
    headerName: 'Time',
    flex: 1,
    minWidth: 180,
  },
];

export const rows = [];
