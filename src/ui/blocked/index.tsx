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
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full overflow-hidden">
        <div className="bg-red-700 px-8 py-5 text text-white">
          <h1 className="text-2xl font-bold tracking-tight text-center">
            Erişim Engellendi
          </h1>
        </div>

        <div className="py-8">
          <p className="text-neutral-600 mb-8 text-sm leading-relaxed text-center">
            Bu site <strong className="text-red-600">USOM</strong> tarafından
            zararlı olarak işaretlendiği için güvenliğiniz amacıyla
            engellenmiştir.
          </p>

          <div className="mb-8 space-y-4 text-xs">
            <div className="flex flex-col gap-2">
              <span className="text-neutral-400 font-bold uppercase">
                Kritiklik
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-6 rounded-full ${generateCrticalityColor(parseInt(params.level || "0"))} ${i < parseInt(params.level || "0") ? "" : "opacity-10"}`}
                    />
                  ))}
                </div>
                <span className="text-neutral-400 text-xs">
                  {params.level || "0"} / 10
                </span>
              </div>
            </div>
            <div className="pt-3 border-t border-neutral-200">
              <span className="text-neutral-400 font-bold uppercase block mb-1">
                Alan Adı
              </span>
              <span className="text-neutral-800 font-mono break-all">
                {params.domain || "Bilinmiyor"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={goBack}>Geri Dön</Button>
            <Button
              variant="secondary"
              onClick={() => setShowDetails(!showDetails)}
            >
              Detaylar
            </Button>
          </div>

          {showDetails && (
            <div className="mt-6 p-4 bg-yellow-100 rounded-md text-xs text-yellow-900 space-y-2 animate-in fade-in slide-in-from-top-2">
              <p>
                <strong>Tür:</strong> {params.desc || "Zararlı Yazılım"}
              </p>
              <p>
                <strong>Kaynak:</strong> {params.source || "USOM API"}
              </p>
              <p>
                <strong>Tarih:</strong> {params.date || "-"}
              </p>
              <p className="pt-2 border-t border-yellow-200">
                Bu site Oltalama (Phishing) veya zararlı içerik barındırdığı
                için engellenmiştir.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

render(<Blocked />, document.getElementById("app")!);
