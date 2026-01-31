import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpenses must be used within an ExpenseProvider');
    }
    return context;
};

export const ExpenseProvider = ({ children }) => {
    // Load expenses from localStorage on initial render
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever expenses change
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => {
        const newExpense = {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            ...expense,
        };
        setExpenses(prev => [newExpense, ...prev]);
    };

    const deleteExpense = (id) => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    };

    const getTotalBalance = () => {
        // Assuming a simplified model where we just track spending for now.
        // If we tracked income, we'd subtract. Use negative for expenses if strictly summing.
        // But usually "Expense Manager" implies just tracking cost.
        // Let's summing up expenses.
        return expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
    };

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, getTotalBalance }}>
            {children}
        </ExpenseContext.Provider>
    );
};
