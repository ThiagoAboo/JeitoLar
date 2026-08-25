import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { regioes } from "../lib/pricing";

const STORAGE_KEY = "jeitolar_region";
const RegionContext = createContext(null);

function getInitialRegion() {
  if (typeof window === "undefined") return "";
  const param = new URLSearchParams(window.location.search).get("regiao") || "";
  if (regioes.some((region) => region.id === param)) return param;
  const saved = window.localStorage.getItem(STORAGE_KEY) || "";
  return regioes.some((region) => region.id === saved) ? saved : "";
}

export function RegionProvider({ children }) {
  const [regionId, setRegionIdState] = useState(getInitialRegion);

  const setRegionId = useCallback((value) => {
    const next = regioes.some((region) => region.id === value) ? value : "";
    setRegionIdState(next);
  }, []);

  useEffect(() => {
    if (regionId) window.localStorage.setItem(STORAGE_KEY, regionId);
    else window.localStorage.removeItem(STORAGE_KEY);
  }, [regionId]);

  const value = useMemo(() => ({
    regionId,
    region: regioes.find((item) => item.id === regionId) || null,
    setRegionId,
    clearRegion: () => setRegionIdState(""),
  }), [regionId, setRegionId]);

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error("useRegion deve ser usado dentro de RegionProvider");
  return context;
}
