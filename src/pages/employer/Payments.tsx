import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PaymentsOverview from './PaymentsOverview';
import PaymentsAlignment from './PaymentsAlignment';
import PaymentsTopUp from './PaymentsTopUp';
import PaymentsWithdraw from './PaymentsWithdraw';
import PaymentsTransactions from './PaymentsTransactions';
import PaymentsMethods from './PaymentsMethods';

const Payments: React.FC = () => (
  <Routes>
    <Route index element={<PaymentsOverview />} />
    <Route path="top-up" element={<PaymentsTopUp />} />
    <Route path="withdraw" element={<PaymentsWithdraw />} />
    <Route path="transactions" element={<PaymentsTransactions />} />
    <Route path="methods" element={<PaymentsMethods />} />
    <Route path="alignment" element={<PaymentsAlignment />} />
    <Route path="*" element={<Navigate to="/payments" replace />} />
  </Routes>
);

export default Payments;
