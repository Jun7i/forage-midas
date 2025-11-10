import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import Chatbot from './Chatbot';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard, { StatCardProps } from './StatCard';
import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  senderId: number;
  recipientId: number;
  amount: number;
  status: string;
  timestamp: string;
}

export default function MainGrid() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statsData, setStatsData] = useState<StatCardProps[]>([
    {
      title: 'Total Transactions',
      value: '0',
      interval: 'Real-time',
      trend: 'neutral',
      data: Array(30).fill(0),
    },
    {
      title: 'Unique Senders',
      value: '0',
      interval: 'Real-time',
      trend: 'neutral',
      data: Array(30).fill(0),
    },
    {
      title: 'Total Amount',
      value: '$0',
      interval: 'Real-time',
      trend: 'neutral',
      data: Array(30).fill(0),
    },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:8081/transactions');
        const data: Transaction[] = await response.json();
        setTransactions(data);
        
        // Calculate statistics
        const totalTransactions = data.length;
        const uniqueSenders = new Set(data.map(t => t.senderId)).size;
        const totalAmount = data.reduce((sum, t) => sum + t.amount, 0);
        
        // Group transactions by time for chart data (last 30 entries)
        const transactionCounts = Array(30).fill(0);
        const amountData = Array(30).fill(0);
        
        data.slice(-30).forEach((transaction, index) => {
          transactionCounts[index] = index + 1;
          amountData[index] = transaction.amount;
        });
        
        setStatsData([
          {
            title: 'Total Transactions',
            value: totalTransactions.toString(),
            interval: 'Real-time',
            trend: totalTransactions > 0 ? 'up' : 'neutral',
            data: transactionCounts,
          },
          {
            title: 'Unique Senders',
            value: uniqueSenders.toString(),
            interval: 'Real-time',
            trend: uniqueSenders > 0 ? 'up' : 'neutral',
            data: data.slice(-30).map(t => t.senderId),
          },
          {
            title: 'Total Amount',
            value: `$${totalAmount.toFixed(2)}`,
            interval: 'Real-time',
            trend: totalAmount > 0 ? 'up' : 'neutral',
            data: amountData,
          },
        ]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    // Fetch immediately
    fetchTransactions();
    
    // Poll every 2 seconds
    const interval = setInterval(fetchTransactions, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {statsData.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          {/* <HighlightedCard /> */}
          <Chatbot />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* <SessionsChart /> */}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {/* <PageViewsBarChart /> */}
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartUserByCountry />
            <CustomizedTreeView />
            
          </Stack>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}