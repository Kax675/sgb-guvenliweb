import { render } from "preact";
import { useSettings } from "../useSettings";
import "../style.css";

function Popup() {
  const { settings, updateSettings } = useSettings();

  const toggle = () =>
    updateSettings({ protectionEnabled: !settings.protectionEnabled });
  const openOptions = () => chrome.runtime.openOptionsPage();

  return (
    <div className="w-xs p-4 font-sans bg-white">
      <header className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-200">
        <h3 className="font-bold text-neutral-800 flex items-center gap-2">
          USOM Güvenli
        </h3>
        <button
          onClick={openOptions}
          className="hover:bg-neutral-100 p-1.5 rounded-full transition-colors"
        >
          ⚙️
        </button>
      </header>

      <div className="flex justify-between items-center mb-4 p-3 bg-neutral-100 rounded-lg">
        <span className="text-sm font-semibold text-neutral-600">Koruma</span>
        <button
          onClick={toggle}
          className={`w-12 h-6 rounded-full transition-colors relative ${settings.protectionEnabled ? "bg-sky-600" : "bg-neutral-300"}`}
        >
          <div
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.protectionEnabled ? "translate-x-6" : ""}`}
          />
        </button>
      </div>

      <div
        className={`text-center py-2 rounded text-[10px] font-black uppercase tracking-wider mb-2 ${settings.protectionEnabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
      >
        {settings.protectionEnabled ? "Aktif" : "Pasif"}
      </div>

      <footer className="text-[9px] text-neutral-400 text-center italic mt-2">
        USOM
      </footer>
    </div>
  );
}

render(<Popup />, document.getElementById("app")!);
