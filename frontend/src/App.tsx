import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { restoreSession, logout } from "./features/auth/authSlice";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { LoginPage } from "./components/loginPage";

function App() {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (!token) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#202B30] text-[#FDFFFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl rounded-3xl bg-[#11181D] border border-[#26343A] shadow-2xl overflow-hidden">
        <header className="w-full px-6 py-4 border-b border-[#26343A] flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Painel de Transações</h1>
            {user && (
              <p className="text-xs text-gray-300">
                Logado como <span className="font-medium">{user.email}</span>
              </p>
            )}
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="rounded-lg border border-[#A7E97F] px-3 py-1 text-xs font-medium  hover:bg-[#A7E97F]/10 transition"
          >
            Sair
          </button>
        </header>

        <main className="px-6 py-6 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-[40%]">
            <TransactionForm />
          </div>
          <div className="w-full flex-1">
            <TransactionList />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
