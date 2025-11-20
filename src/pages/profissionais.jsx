import { useState } from "react";
import profiles from "../data/profissionais.json";
import ProfileCard from "../components/ProfileCard.jsx";
import ProfileModal from "../components/ProfileModal";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";

import FloatingInviteButton from "../components/FloatingInviteButton";

export default function Profissionais() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [filtered, setFiltered] = useState(profiles);
  const [search, setSearch] = useState("");

  const handleSearch = (query) => {
    setSearch(query);

    const results = profiles.filter((p) =>
      p.nome.toLowerCase().includes(query.toLowerCase()) ||
      p.cargo.toLowerCase().includes(query.toLowerCase()) ||
      p.habilidadesTecnicas.some((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      )
    );

    setFiltered(results);
  };

  return (
<div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-6">Profissionais</h1>

      <SearchBar value={search} onChange={handleSearch} />

      <FilterPanel
        profiles={profiles}
        setFilteredProfiles={setFiltered}
      />

      <div className="grid mt-8 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((perfil) => (
          <ProfileCard
            key={perfil.id}
            profile={perfil}
            onClick={() => setSelectedProfile(perfil)}
          />
        ))}
      </div>

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

         <FloatingInviteButton /> {/* Botão sempre visível */}
    </div>
  );
}
