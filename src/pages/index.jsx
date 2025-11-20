import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "../lib/auth";

import {
  LuSearch,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";
import { Fingerprint, Tickets } from "lucide-react";

import eventosData from "../data/eventos.json";
import vagasData from "../data/vagas.json";
import CarrosselEventos from "../components/CarrosselEventos";

export default function Home() {
  const router = useRouter();

  // Proteção da rota HOME
useEffect(() => {
  const session = getSession();

  if (session === null) {
    console.log("Sem sessão — indo para login");
    window.location.href = "/login";
  }
}, []);


  const vagasRecomendadas = vagasData.filter((v) => v.recomendado).slice(0, 4);
  const ultimosEventos = eventosData.slice(0, 8);

  return (
<div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">
      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mt-10">
        <h1 className="text-5xl font-extrabold leading-tight">
          Conectando você às{" "}
          <span className="text-blue-500">melhores oportunidades</span>
        </h1>

        <p className="text-gray-300 text-xl mt-4 max-w-3xl mx-auto">
          Tecnologias inteligentes para acelerar sua carreira, simplificar sua
          busca por vagas e fortalecer sua rede profissional.
        </p>

        <a
          href="/vagas"
          className="mt-8 inline-flex items-center gap-3 bg-blue-600 px-8 py-4 rounded-xl 
                     text-lg font-semibold hover:bg-blue-500 transition shadow-lg"
        >
          <LuSearch size={22} /> Encontrar vagas
        </a>
      </section>

      <div className="flex items-center gap-4 my-14">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 uppercase text-sm tracking-widest">
          Recomendações da plataforma
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>

      {/* ⭐ VAGAS RECOMENDADAS */}
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Fingerprint className="text-blue-400" /> Vagas recomendadas para
            você
          </h2>

          <a
            href="/vagas"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Ver todas <LuArrowRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vagasRecomendadas.map((vaga) => (
            <div
              key={vaga.id}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-blue-600 
                         hover:shadow-xl transition shadow-md"
            >
              <h3 className="text-xl font-bold">{vaga.titulo}</h3>
              <p className="text-gray-400">{vaga.empresa}</p>
              <p className="text-gray-500 text-sm mt-2">{vaga.localizacao}</p>

              <a
                href="/vagas"
                className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                Ver vaga <LuArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DIVISÓRIA */}
      <div className="flex items-center gap-4 my-14">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 uppercase text-sm tracking-widest">
          Eventos e oportunidades
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>

      {/* CARROSSEL DE EVENTOS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Tickets className="text-purple-400" /> Próximos eventos
        </h2>

        <CarrosselEventos eventos={ultimosEventos} />
      </section>

      {/* DIVISÓRIA */}
      <div className="flex items-center gap-4 my-14">
        <span className="flex-1 h-px bg-gray-700"></span>
        <span className="text-gray-400 uppercase text-sm tracking-widest">
          IA que impulsiona sua carreira
        </span>
        <span className="flex-1 h-px bg-gray-700"></span>
      </div>

      {/* SUGESTÕES DA IA */}
      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <LuSparkles className="text-yellow-400" /> Insights da IA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            "Seu perfil é altamente compatível com vagas de tecnologia. Atualize suas skills para aumentar sua relevância.",
            "Eventos de front-end e IA estão alinhados às suas áreas de interesse.",
            "Seu portfólio tem alta taxa de engajamento. Considere adicionar projetos recentes.",
          ].map((tip, i) => (
            <div
              key={i}
              className="p-6 bg-gray-900 rounded-xl border border-gray-800 shadow-md hover:shadow-xl transition"
            >
              <p className="text-gray-300">{tip}</p>
            </div>
          ))}
        </div>

        <a
          href="/ia"
          className="mt-6 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          Ver mais insights <LuArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
