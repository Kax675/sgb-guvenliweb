import { render } from "preact";
import { useState } from "preact/hooks";
import { useSettings } from "../useSettings";
import { Button } from "../components/Button";
import "../style.css";

function Options() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [status, setStatus] = useState("");

  const save = (field: string, value: any) => {
    updateSettings({ [field]: value });
    showStatus("Kaydedildi");
  };

  const handleReset = async () => {
    if (
      confirm("Tüm ayarları varsayılana sıfırlamak istediğinize emin misiniz?")
    ) {
      await resetSettings();
      showStatus("Sıfırlandı");
    }
  };

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 1500);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6 font-sans text-neutral-800">
      <h1 className="text-2xl font-black mb-8 border-b-4 border-sky-600 pb-2 inline-block">
        USOM Ayarları
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
            Genel Yapılandırma
          </h2>
          <div className="bg-white border rounded-xl p-5 space-y-4 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-neutral-300 text-sky-600 focus:ring-sky-500"
                checked={settings.protectionEnabled}
                onChange={(e) =>
                  save(
                    "protectionEnabled",
                    (e.target as HTMLInputElement).checked,
                  )
                }
              />
              <span className="font-medium group-hover:text-sky-600 transition-colors">
                Korumayı Etkinleştir
              </span>
            </label>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Minimum Kritiklik (1-10)
              </label>

              <span>{settings.minCriticality}</span>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                value={settings.minCriticality}
                onChange={(e) =>
                  save(
                    "minCriticality",
                    parseInt((e.target as HTMLInputElement).value),
                  )
                }
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-bold mt-1 px-1">
                <span>DÜŞÜK</span>
                <span>YÜKSEK</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">
            İstisna Listesi
          </h2>
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <textarea
              className="w-full h-32 p-3 text-sm font-mono border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none bg-neutral-50"
              placeholder="example.com&#10;test.org"
              value={settings.excludedDomains.join("\n")}
              onChange={(e) =>
                save(
                  "excludedDomains",
                  (e.target as HTMLTextAreaElement).value
                    .split("\n")
                    .map((d) => d.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>
        </section>

        <section className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-4">
            Önbellek & Performans
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-bold text-sky-600 uppercase mb-1">
                Süre (Saat)
              </label>
              <input
                type="number"
                className="w-full p-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                value={settings.cacheDuration}
                onChange={(e) =>
                  save(
                    "cacheDuration",
                    parseInt((e.target as HTMLInputElement).value),
                  )
                }
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-sky-600 uppercase mb-1">
                Maksimum Kayıt
              </label>
              <input
                type="number"
                className="w-full p-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
                value={settings.cacheSize}
                onChange={(e) =>
                  save(
                    "cacheSize",
                    parseInt((e.target as HTMLInputElement).value),
                  )
                }
              />
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 flex justify-center">
        <Button variant="danger" onClick={handleReset}>
          Varsayılanlara Sıfırla
        </Button>
      </div>

      {status && (
        <div className="fixed bottom-8 right-8 bg-black text-white px-4 py-2 rounded-full text-xs font-bold animate-bounce shadow-lg">
          ✓ {status}
        </div>
      )}
    </div>
  );
}

render(<Options />, document.getElementById("app")!);
