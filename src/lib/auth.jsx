// src/lib/auth.js
import { users as fixedUsers } from "../data/users";

export function login(email, senha) {
  // carrega usuários fixos + os cadastrados via signup
  const saved = JSON.parse(localStorage.getItem("extraUsers") || "[]");
  const allUsers = [...fixedUsers, ...saved];

  const user = allUsers.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) {
    return { ok: false, message: "Credenciais inválidas" };
  }

  localStorage.setItem("session", JSON.stringify(user));

  return { ok: true, user };
}

export function signupUser(email, senha) {
  const saved = JSON.parse(localStorage.getItem("extraUsers") || "[]");

  // Evita duplicados
  const exists =
    saved.find((u) => u.email === email) ||
    fixedUsers.find((u) => u.email === email);

  if (exists) {
    return { ok: false, message: "E-mail já cadastrado" };
  }

  // salva novo usuário
  const newUser = { email, senha };
  saved.push(newUser);
  localStorage.setItem("extraUsers", JSON.stringify(saved));

  return { ok: true, message: "Cadastro realizado!", user: newUser };
}

export function getSession() {
  try {
    const data = localStorage.getItem("session");
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("session");
}
