"use client";
import React from "react";
import "./avaliacao.css"; 

const Avaliacao = () => {
  const [nota, setNota] = React.useState<number | null>(null);
  const [texto, setTexto] = React.useState<string>("");
  const [envioSucesso, setEnvioSucesso] = React.useState<boolean>(false);
  const initialNota = null;
  const initialTexto = "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nota !== null && texto.trim() !== "") {
      try {
        const response = await fetch("http://localhost:8080/avaliacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ AVALIACAO: nota, TEXTO: texto }), 
        });
        
        if (response.ok) {
          setNota(initialNota);
          setTexto(initialTexto);
          setEnvioSucesso(true); 
        } else {
          console.error("Erro ao enviar dados para o servidor:", response.statusText);
        }
      } catch (error: any) {
        console.error("Erro ao enviar requisição:", error.message);
      }
    }
  };

  return (
    <div className="avaliacao-container">
      <h2 className="avaliacao-title">Avaliação do Site</h2>
      <form onSubmit={handleSubmit} className="avaliacao-form">
        <div className="avaliacao-rating">
          <label>Avalie sua experiência conosco:</label>
          <select
            value={nota ?? ""}
            onChange={(e) => setNota(Number(e.target.value))}
            required
          >
            <option value="">Selecione uma nota</option>
            {[1, 2, 3, 4, 5].map((nota) => (
              <option key={nota} value={nota}>
                {nota}
              </option>
            ))}
          </select>
        </div>

        <div className="feedback-input">
          <label>Texto:</label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Deixe seu texto aqui..."
            required
          />
        </div>

        <button type="submit" className="avaliacao-button">
          Enviar
        </button>
      </form>

      {envioSucesso && <p className="success-message">Avaliação enviada com sucesso!</p>}
    </div>
  );
};

export default Avaliacao;
