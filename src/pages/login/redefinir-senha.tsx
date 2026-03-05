import { useState, useEffect } from "react";
import { supabase } from "../../auth/supabase-client";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { allContext } from "../../context/all-context";
import "../../styles/redefinir-senha.css";


export default function RedefinirSenha() {
  const navigate = useNavigate();
  const { user } = allContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [canReset, setCanReset] = useState(false);

  useEffect(() => {
    const initRecovery = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        setErrorMsg("Link inválido ou expirado.");
        return;
      }

      setCanReset(true);
    };

    initRecovery();
  }, []);

  const handleUpdatePassword = async () => {
    if (!password || !confirmPassword) {
      setErrorMsg("Preencha ambos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      console.error("Erro ao redefinir senha:", error);
      setErrorMsg("Não foi possível redefinir a senha. Tente novamente.");
    } else {
      console.log("Senha redefinida com sucesso:", data);
      setSuccessMsg(
        "Senha redefinida com sucesso! Redirecionando para login..."
      );

      // Redireciona após 3 segundos
      setTimeout(async () => {
        await supabase.auth.signOut();
        {/*
        await supabase.auth.signInWithPassword({
          email: user?.email ?? '',
          password
        });
        */}
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div
    className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
        {(!successMsg && !errorMsg) &&
        <h1 style={{marginBottom: 18}} className="text-2xl font-bold text-gray-200 text-center">
          Redefinir Senha
        </h1>
        }

        {successMsg && (
          <div className="flex items-center gap-2 bg-green-900 text-green-200 rounded-lg p-4 mb-4">
            <CheckCircle size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="flex items-center gap-2 bg-red-900 text-red-200 rounded-lg p-4 mb-4">
            <XCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        <label style={{marginBottom: 6}} className="block text-gray-300 font-medium">
          Nova senha
        </label>
        <div className="relative mb-5">
          <input
            type={mostrarSenha ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua nova senha"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3"
          />

          <i onClick={() => setMostrarSenha(!mostrarSenha)} className={`fa-regular ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2`}></i>
        </div>

        <label className="block mb-2 text-gray-300 font-medium">
          Confirme a senha
        </label>
        <div className="relative mb-5">
          <input
            type={mostrarConfirmarSenha ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repita a senha"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3"
          />
          <i onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)} className={`fa-regular ${mostrarConfirmarSenha ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 cursor-pointer absolute top-1/2 right-4 -translate-y-1/2`}></i>
        </div>

        <button
          onClick={handleUpdatePassword}
          disabled={loading && canReset}
          style={{padding: '10px 0px'}}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Atualizando..." : "Redefinir senha"}
        </button>

        <p style={{marginTop: 18}} className="mt-6 text-center text-gray-400 text-sm">
          Lembrou sua senha?{" "}
          <a
            onClick={() => navigate('/login')}
            className="text-blue-400 font-medium hover:underline cursor-pointer"
          >
            Voltar ao login
          </a>
        </p>
      </div>
    </div>
  );
}
