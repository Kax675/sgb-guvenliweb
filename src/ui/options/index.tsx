import { render } from "preact";
import { useState } from "preact/hooks";
import { useSettings } from "../useSettings";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import "../style.css";

const Icons = {
  Shield: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Settings: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  Globe: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Zap: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Trash: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Plus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

function Options() {
  const {
    settings,
    updateSettings,
    resetSettings,
    clearCache,
    cacheCount,
    loading,
  } = useSettings();
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("");
  const [newDomain, setNewDomain] = useState("");

  if (loading && !import.meta.env.DEV) {
    return (
      <div className="p-12 text-center text-neutral-400">Yükleniyor...</div>
    );
  }

  const save = async (field: string, value: any) => {
    await updateSettings({ [field]: value });
    showStatus("Değişiklikler kaydedildi");
  };

  const handleReset = async () => {
    if (
      confirm("Tüm ayarları varsayılana sıfırlamak istediğinize emin misiniz?")
    ) {
      await resetSettings();
      showStatus("Tüm ayarlar sıfırlandı");
    }
  };

  const handleClearCache = async () => {
    if (confirm("Önbelleği temizlemek istediğinize emin misiniz?")) {
      await clearCache();
      showStatus("Önbellek temizlendi");
    }
  };

  const addDomain = () => {
    const domain = newDomain.trim().toLowerCase();
    if (domain && !settings.excludedDomains.includes(domain)) {
      const updated = [...settings.excludedDomains, domain];
      save("excludedDomains", updated);
      setNewDomain("");
    }
  };

  const removeDomain = (domain: string) => {
    const updated = settings.excludedDomains.filter((d) => d !== domain);
    save("excludedDomains", updated);
  };

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2000);
  };

  const tabs = [
    { id: "general", label: "Genel", icon: Icons.Settings },
    { id: "whitelist", label: "İstisnalar", icon: Icons.Globe },
    { id: "performance", label: "Performans", icon: Icons.Zap },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 font-sans text-neutral-900">
      <header className="flex items-center mb-8">
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Ayarlar
          </h1>
          
        </div>
      </header>

      <nav className="flex gap-1 bg-neutral-100 p-1 rounded-lg mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-white text-sky-600 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
            }`}
          >
            <tab.icon />
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="min-h-[400px]">
        {activeTab === "general" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <Input
                type="checkbox"
                label="Aktif Koruma"
                description="Zararlı bağlantıları USOM veritabanı ile gerçek zamanlı olarak kontrol edin ve engelleyin."
                checked={settings.protectionEnabled}
                onChange={(e) =>
                  save(
                    "protectionEnabled",
                    (e.target as HTMLInputElement).checked,
                  )
                }
                className="mb-8"
              />

              <div className="pt-6 border-t border-neutral-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-base">
                      Bloklama Hassasiyeti
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Hangi kritiklik seviyesindeki bağlantıların
                      engelleneceğini belirleyin.
                    </p>
                  </div>
                  <span className="text-xl font-bold text-sky-600">
                    {settings.minCriticality}
                  </span>
                </div>
                <Input
                  type="range"
                  min="1"
                  max="10"
                  value={settings.minCriticality}
                  onChange={(e) =>
                    save(
                      "minCriticality",
                      parseInt((e.target as HTMLInputElement).value),
                    )
                  }
                />
                <div className="flex justify-between text-xs text-neutral-400 mt-2">
                  <span>Düşük Hassasiyet</span>
                  <span>Yüksek Hassasiyet</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "whitelist" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base mb-1">
                Güvenli Alan Adları
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                Bu listedeki web siteleri hiçbir zaman bloklanmaz.
              </p>

              <div className="flex gap-2 mb-6">
                <Input
                  type="text"
                  placeholder="örnek: google.com"
                  className="flex-1"
                  value={newDomain}
                  onKeyPress={(e) => e.key === "Enter" && addDomain()}
                  onInput={(e) =>
                    setNewDomain((e.target as HTMLInputElement).value)
                  }
                />
                <Button onClick={addDomain} className="h-[38px]">
                  <Icons.Plus /> Ekle
                </Button>
              </div>

              <div className="space-y-2">
                {settings.excludedDomains.length === 0 ? (
                  <div className="text-center py-8 text-neutral-400 text-sm border border-dashed border-neutral-200 rounded-lg">
                    Henüz bir istisna eklenmemiş.
                  </div>
                ) : (
                  settings.excludedDomains.map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-lg border border-neutral-100 group hover:bg-neutral-100 transition-colors"
                    >
                      <span className="font-medium text-sm text-neutral-700">
                        {domain}
                      </span>
                      <button
                        onClick={() => removeDomain(domain)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-all"
                        title="Sil"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-base mb-1">
                Önbellek Ayarları
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                Tarama performansını artırmak için sorgu sonuçlarını geçici
                olarak saklayın.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Input
                  type="number"
                  label="Saklama Süresi (Saat)"
                  min="1"
                  value={settings.cacheDuration}
                  onChange={(e) =>
                    save(
                      "cacheDuration",
                      Math.max(
                        1,
                        parseInt((e.target as HTMLInputElement).value) || 1,
                      ),
                    )
                  }
                />
                <Input
                  type="number"
                  label="Maksimum Kayıt"
                  min="100"
                  value={settings.cacheSize}
                  onChange={(e) =>
                    save(
                      "cacheSize",
                      Math.max(
                        100,
                        parseInt((e.target as HTMLInputElement).value) || 100,
                      ),
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-neutral-500">
                    {cacheCount} Kayıt Önbelleklendi
                  </span>
                </div>
                <Button
                  variant="danger"
                  onClick={handleClearCache}
                  disabled={cacheCount === 0}
                >
                  Temizle
                </Button>
              </div>
            </section>
          </div>
        )}
      </div>

      <footer className="mt-12 flex items-center justify-between pt-8 border-t border-neutral-100">
        <Button variant="secondary" onClick={handleReset}>
          Tüm Ayarları Sıfırla
        </Button>
        <div className="text-xs font-semibold text-neutral-400">
          Versiyon 1.0.0
        </div>
      </footer>

      {status && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          {status}
        </div>
      )}
    </div>
  );
}

render(<Options />, document.getElementById("app")!);
