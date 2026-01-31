import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

export default function Dashboard() {
    const { expenses, getTotalBalance } = useExpenses();
    const totalBalance = getTotalBalance().toFixed(2);

    // Calculate daily average (simple version)
    const uniqueDates = new Set(expenses.map(e => e.date)).size || 1;
    const dailyAverage = (getTotalBalance() / uniqueDates).toFixed(2);

    // Recent expenses
    const recentExpenses = expenses.slice(0, 5);

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Welcome back, here's your daily spending overview.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                {[
                    { label: 'Total Spent', value: `$${totalBalance}`, color: 'bg-blue-600', icon: DollarSign },
                    { label: 'Daily Average', value: `$${dailyAverage}`, color: 'bg-purple-600', icon: TrendingUp },
                    { label: 'Total Transactions', value: expenses.length, color: 'bg-emerald-600', icon: TrendingDown },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-${stat.color.replace('bg-', '')}`}>
                                <stat.icon size={24} className={`text-${stat.color.replace('bg-', '')}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 min-h-[400px]">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

                {expenses.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 flex flex-col items-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <DollarSign size={24} />
                        </div>
                        <p>No expenses recorded yet.</p>
                        <p className="text-sm">Add your first expense to get started.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {recentExpenses.map((expense) => (
                            <div key={expense.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {expense.title.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">{expense.title}</h3>
                                        <p className="text-sm text-slate-500">{expense.category} • {expense.date}</p>
                                    </div>
                                </div>
                                <div className="font-bold text-slate-900">
                                    -${Number(expense.amount).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
