import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { regioes } from "../lib/pricing";

const STORAGE_KEY = "jeitolar_region";
const RegionContext = createContext(null);

const isValidRegion = (value) => regioes.some((region) => region.id === value);

export function RegionProvider({ children }) {
  // Começa vazio para manter o HTML do servidor igual ao da hidratação.
  const [regionId, setRegionIdState] = useState("");

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("regiao") || "";
    if (isValidRegion(param)) {
      setRegionIdState(param);
      return;
    }
    const saved = window.localStorage.getItem(STORAGE_KEY) || "";
    if (isValidRegion(saved)) setRegionIdState(saved);
  }, []);

  const setRegionId = useCallback((value) => {
    setRegionIdState(isValidRegion(value) ? value : "");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (regionId) window.localStorage.setItem(STORAGE_KEY, regionId);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [regionId]);

  const value = useMemo(
    () => ({
      regionId,
      region: regioes.find((item) => item.id === regionId) || null,
      setRegionId,
      clearRegion: () => setRegionIdState(""),
    }),
    [regionId, setRegionId],
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error("useRegion deve ser usado dentro de RegionProvider");
  return context;
}
