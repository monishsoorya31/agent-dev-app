import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Expenses from './pages/Expenses';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
    return (
        <ExpenseProvider>
            <BrowserRouter basename="/agent-dev-app">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="expenses" element={<Expenses />} />
                        <Route path="add" element={<AddExpense />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ExpenseProvider>
    );
}

export default App;
