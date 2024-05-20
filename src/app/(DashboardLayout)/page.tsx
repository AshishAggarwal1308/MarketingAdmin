// Assuming this code is within a client-side component (e.g., Dashboard.js)

'use client'; // Only necessary in Next.js 13+

import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

// Components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import CustomizedTables from './components/dashboard/StyledTable';
import TotalUsers from './components/dashboard/Totalusers';


import { useSession, signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status != 'authenticated') {
    router.push("/api/auth/signin"); // Corrected typo
  }

  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TotalUsers />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CustomizedTables />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
