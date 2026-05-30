import { render } from "preact";
import { useSettings } from "../useSettings";
import { Input } from "../components/Input";
import "../style.css";

function Popup() {
  const { settings, updateSettings, loading } = useSettings();

  const toggle = (e: any) => {
    const val = e.currentTarget.checked;
    updateSettings({ protectionEnabled: val });
  };
  const openOptions = () => chrome.runtime.openOptionsPage();

  if (loading && !import.meta.env.DEV) {
    return (
      <div className="w-[320px] p-12 flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-[320px] p-4 font-sans bg-white text-neutral-900">
      <header className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-100">
        <h3 className="font-bold text-base flex items-center gap-2">
          <img src="/SGB.svg" className="w-5 h-5 object-contain" alt="Logo" />
          SGB Güvenli Web
        </h3>
        <button
          onClick={openOptions}
          className="hover:bg-neutral-100 p-2 rounded-lg transition-colors text-neutral-500"
          title="Ayarlar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
        </button>
      </header>

      <div className="mb-6">
        <Input
          type="checkbox"
          label="Koruma Durumu"
          description={
            settings.protectionEnabled
              ? "Web trafiğiniz korunuyor"
              : "Koruma şu an kapalı"
          }
          checked={settings.protectionEnabled}
          onChange={toggle}
          disabled={loading && !import.meta.env.DEV}
        />
      </div>

      <div
        className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors ${
          settings.protectionEnabled
            ? "bg-green-50 text-green-700 border border-green-100"
            : "bg-red-50 text-red-700 border border-red-100"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${settings.protectionEnabled ? "bg-green-500" : "bg-red-500 animate-pulse"}`}
        />
        {settings.protectionEnabled
          ? "Aktif Koruma Etkin"
          : "Koruma Devre Dışı"}
      </div>

      <footer className="text-[11px] text-neutral-500 text-center mt-6 pt-4 border-t border-neutral-50">
        SGB Veri Tabanı ile Güçlendirilmiştir
      </footer>
    </div>
  );
}

render(<Popup />, document.getElementById("app")!);
