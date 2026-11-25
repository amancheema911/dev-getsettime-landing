"use client";

import { useEffect, useState } from "react";

export type Profession = {
  id: string;
  name: string;
};

let memory: Profession[] | null = null;
let pending: Promise<Profession[] | null> | null = null;

function loadProfessions() {
  if (memory) return Promise.resolve(memory);
  if (pending) return pending;

  pending = fetch("/api/professions", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then(async (response) => {
      const body = (await response.json().catch(() => null)) as {
        success?: boolean;
        professions?: Profession[];
      } | null;
      if (!response.ok || !body?.success || !Array.isArray(body.professions)) return null;

      const professions = body.professions.filter(
        (profession): profession is Profession =>
          !!profession &&
          typeof profession.id === "string" &&
          typeof profession.name === "string" &&
          profession.name.trim().length > 0
      );
      if (!professions.length) return null;

      memory = professions;
      return professions;
    })
    .catch(() => null)
    .finally(() => {
      pending = null;
    });

  return pending;
}

/** Shared profession list from `/api/professions`. */
export function useProfessions() {
  const [professions, setProfessions] = useState<Profession[]>(memory ?? []);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(memory ? "ready" : "loading");

  useEffect(() => {
    let cancelled = false;
    loadProfessions().then((list) => {
      if (cancelled) return;
      setProfessions(list ?? []);
      setStatus(list?.length ? "ready" : "error");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { professions, status };
}
