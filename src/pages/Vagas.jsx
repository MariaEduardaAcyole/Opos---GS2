import { useState, useEffect } from "react";
import vagasData from "../data/vagas.json";
import concursosData from "../data/concursos.json";
import eventosData from "../data/eventos.json";
import CardVaga from "../components/CardVaga";
import CardVagaConcurso from "../components/CardVagaConcurso";

import CarrosselEventos from "../components/CarrosselEventos";
import PopupApply from "../components/PopupApply";

export default function Vagas() {
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");

  const [vagasFiltradas, setVagasFiltradas] = useState(vagasData);

  const [concursosFiltrados, setconcursosFiltrados] = useState(concursosData);

  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let filtradas = vagasData;

    if (busca.trim() !== "") {
      filtradas = filtradas.filter((v) =>
        v.titulo.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (filtroArea) {
      filtradas = filtradas.filter((v) => v.area === filtroArea);
    }

    if (filtroCidade) {
      filtradas = filtradas.filter(
        (v) => v.localizacao.toLowerCase() === filtroCidade.toLowerCase()
      );
    }

    if (filtroNivel) {
      filtradas = filtradas.filter((v) => v.nivel === filtroNivel);
    }

    setVagasFiltradas(filtradas);
  }, [busca, filtroArea, filtroCidade, filtroNivel]);

  const handleApply = (vaga) => {
    setVagaSelecionada(vaga);
    setShowPopup(true);
  };

  const handleApprove = () => {
    if (!vagaSelecionada) return;

    alert(
      `Candidatura enviada com currículo otimizado para: ${vagaSelecionada.titulo}`
    );

    setShowPopup(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Vagas</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Pesquisar vaga..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
      />

      {/* FILTROS */}
      <div className="flex gap-4 mb-8">
        <select
          className="p-3 bg-gray-800 text-white rounded-lg"
          onChange={(e) => setFiltroArea(e.target.value)}
        >
          <option value="">Área</option>
          <option value="Desenvolvimento">Desenvolvimento</option>
          <option value="Design">Design</option>
          <option value="Dados">Dados</option>
        </select>

        <select
          className="p-3 bg-gray-800 text-white rounded-lg"
          onChange={(e) => setFiltroCidade(e.target.value)}
        >
          <option value="">Cidade</option>
          <option value="São Paulo, SP">São Paulo</option>
          <option value="Rio de Janeiro, RJ">Rio de Janeiro</option>
          <option value="Curitiba, PR">Curitiba</option>
        </select>

        <select
          className="p-3 bg-gray-800 text-white rounded-lg"
          onChange={(e) => setFiltroNivel(e.target.value)}
        >
          <option value="">Nível</option>
          <option value="Júnior">Júnior</option>
          <option value="Pleno">Pleno</option>
          <option value="Sênior">Sênior</option>
        </select>
      </div>

      {/* ⭐ CARROSSEL DE EVENTOS */}
      <CarrosselEventos eventos={eventosData} />

      {/* ⭐ VAGAS RECOMENDADAS */}
      <div className="flex items-center gap-4 my-10">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 text-sm uppercase tracking-widest">
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Vagas recomendadas
          </h2>{" "}
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vagasData
          .filter((v) => v.recomendado)
          .map((v) => (
            <CardVaga key={v.id} vaga={v} onApply={handleApply} />
          ))}
      </div>

      {/* VAGAS FILTRADAS */}
    <div className="flex items-center gap-4 my-10">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 text-sm uppercase tracking-widest">
          <h2 className="text-2xl font-semibold mt-10 mb-4">
           Todas as Vagas 
          </h2>{" "}
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vagasFiltradas.map((v) => (
          <CardVaga key={v.id} vaga={v} />
        ))}
      </div>

      {/* 🏛 CONCURSOS PUBLICOS */}
    <div className="flex items-center gap-4 my-10">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 text-sm uppercase tracking-widest">
          <h2 className="text-2xl font-semibold mt-10 mb-4">
            Concursos publicos
          </h2>{" "}
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concursosFiltrados.map((c) => (
          <CardVagaConcurso key={c.id} concurso={c} onApply={handleApply} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concursosFiltrados.map((c) => (
          <CardVagaConcurso key={c.id} concurso={c} onApply={handleApply} />
        ))}
      </div>

      {/* POPUP DE CANDIDATURA */}
      {showPopup && vagaSelecionada && (
        <PopupApply
          vaga={vagaSelecionada}
          onClose={() => setShowPopup(false)}
          onApprove={handleApprove}
        />
      )}
    </div>
  );
}
