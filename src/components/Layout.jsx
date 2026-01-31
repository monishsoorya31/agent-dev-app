import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, PlusCircle, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

const SidebarItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            )
        }
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </NavLink>
);

const Sidebar = ({ isOpen, closeMobileMenu }) => {
    return (
        <div
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
                isOpen ? "translate-x-0 bg-white shadow-2xl" : "-translate-x-full"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-slate-50">
                    <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Receipt className="w-5 h-5" />
                        </div>
                        ExpenseFlow
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</div>
                    <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" onClick={closeMobileMenu} />
                    <SidebarItem to="/expenses" icon={Receipt} label="All Expenses" onClick={closeMobileMenu} />
                    <SidebarItem to="/add" icon={PlusCircle} label="Add Expense" onClick={closeMobileMenu} />
                </nav>

                {/* Footer User Profile (Dummy) */}
                <div className="p-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">MS</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-slate-900 truncate">Monish Soorya</p>
                            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar isOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-30">
                    <div className="font-bold text-lg text-slate-900">ExpenseFlow</div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -mr-2 text-slate-600 active:bg-slate-100 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
