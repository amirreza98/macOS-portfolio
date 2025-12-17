import { ChevronLeft } from "lucide-react";
import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import useLocationStore from "../store/location";
import { locations } from "../constants";
import useWindowStore from "../store/window";
import clsx from "clsx";

function Finder() {
  const { openWindow } = useWindowStore() as any;
  const { activeLocation, setActiveLocation, history, goBack } = useLocationStore();

  const openItem = (item: any) => {
    // IMPORTANT: Update store first, then open window
    if (item.fileType === "pdf") {
      setActiveLocation(item); 
      return openWindow("resume");
    }
    
    if (item.kind === "folder") {
      return setActiveLocation(item);
    }

    if (["fig", "url"].includes(item.fileType ?? "") && item.href) {
      return window.open(item.href, "_blank");
    }

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderSidebarList = (name: string, items: any[]) => (
    <div className="mb-4">
      <h3 className="px-4 text-xs font-bold text-gray-400 uppercase mb-2">{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 px-4 py-1 cursor-default text-sm",
              item.id === activeLocation?.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            )}
          >
            <img src={item.icon} className="w-4 h-4" alt="" />
            <span className="truncate">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      <div id="window-header" className="flex items-center gap-4 px-4 py-2 border-b bg-gray-50">
        <WindowControls target="finder" />
        
        <div className="flex items-center gap-2">
          <button 
            onClick={goBack} 
            disabled={history.length === 0}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
        <h2 className="text-sm font-semibold">{activeLocation.name}</h2>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 border-r bg-gray-50 py-4 overflow-y-auto hidden md:block">
          {renderSidebarList("Favorites", Object.values(locations))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ul className="grid grid-cols-4 gap-4">
            {activeLocation?.children?.map((item: any) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-50 cursor-default group"
                onDoubleClick={() => openItem(item)}
                onClick={(e) => e.detail === 1 && console.log("selected")} 
              >
                <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain" />
                <p className="text-xs text-center break-all line-clamp-2">{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WindowWrapper(Finder, "finder");