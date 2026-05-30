import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button";
import "../style.css";

function generateCrticalityColor(level: number) {
  if (level <= 3) return "bg-green-500";
  if (level <= 6) return "bg-yellow-500";
  return "bg-red-500";
}

function Blocked() {
  const [params, setParams] = useState<Record<string, string>>({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setParams(Object.fromEntries(new URLSearchParams(window.location.search)));
  }, []);

  const goBack = () =>
    window.history.length > 1 ? window.history.back() : window.close();

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans text-neutral-900">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl overflow-hidden border border-neutral-200">
        <div className="bg-red-700 px-8 py-6 text-white text-center">
          <div className="w-12 h-12 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Erişim Engellendi
          </h1>
        </div>

        <div className="p-8">
          <p className="text-neutral-600 mb-8 text-sm leading-relaxed text-center">
            Bu web sitesi <strong className="text-red-600 font-bold">USOM</strong> tarafından
            güvenlik tehdidi olarak raporlandığı için erişiminiz durduruldu.
          </p>

          <div className="mb-8 space-y-5">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                Tehdit Seviyesi
              </span>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-4 rounded-sm ${i < parseInt(params.level || "0") ? generateCrticalityColor(parseInt(params.level || "0")) : "bg-neutral-100"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-neutral-700">
                  {params.level || "0"}/10
                </span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                Hedef Adres
              </span>
              <span className="text-sm font-semibold text-neutral-800 break-all bg-neutral-50 px-2 py-1 rounded">
                {params.domain || "Bilinmeyen Kaynak"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button onClick={goBack} variant="secondary">Geri Dön</Button>
            <Button
              onClick={() => setShowDetails(!showDetails)}
            >
              Detayları Gör
            </Button>
          </div>

          {showDetails && (
            <div className="mt-6 p-4 bg-neutral-50 rounded-xl text-xs text-neutral-600 space-y-3 border border-neutral-100 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between">
                <span className="font-semibold">Tehdit Türü:</span>
                <span>{params.desc || "Zararlı İçerik"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Bildirim Kaynağı:</span>
                <span>{params.source || "USOM"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Tespit Tarihi:</span>
                <span>{params.date || "Belirtilmemiş"}</span>
              </div>
              <p className="pt-3 border-t border-neutral-200 text-neutral-500 leading-relaxed italic">
                Bu sayfa, kişisel verilerinizi çalmaya yönelik oltalama veya kötü amaçlı yazılım barındırıyor olabilir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

render(<Blocked />, document.getElementById("app")!);
