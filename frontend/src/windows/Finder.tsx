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
    if (item.fileType === "pdf") {
      openWindow("resume", item.path);
      return;
    }

    if (item.kind === "folder") {
      setActiveLocation(item);
      openWindow("folder", item);
    }

    if (["fig", "url"].includes(item.fileType ?? "") && item.href) {
      return window.open(item.href, "_blank");
    }

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderSidebarList = (name: string, items: any[]) => (
    <div>
      <h3 className=" px-3 text-xs sm:block hidden font-bold text-gray-400 uppercase mb-2">{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setActiveLocation(item);
            }}
            className={clsx(
              item.id === activeLocation?.id ? "bg-blue-500 text-white" : "hover:bg-gray-200 text-black"
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
    <div id="finder" className="finder">
      <div id="window-header">
        <WindowControls target="finder" />
          <button 
            onClick={goBack} 
            disabled={history.length === 0}
            className="p-1 hover:bg-gray-300 hover:shadow-2xl drop-shadow-black rounded disabled:opacity-20"
          >
            <ChevronLeft size={18} />
          </button>
        <h2 className="text-sm font-semibold">{activeLocation.name}</h2>
      </div>

      <div className="mainfinder">
        {/* Sidebar */}
        <div className="sidebarfinder">
          {renderSidebarList("Favorites", Object.values(locations))}
        </div>

        {/* Content Area */}
        <div className="content" >
          <ul className="grid grid-cols-4 gap-2">
            {activeLocation?.children?.map((item: any) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-1 py-2 rounded cursor-pointer group"
                onDoubleClick={() => openItem(item)}
                onClick={(e) => {
                  e.stopPropagation();
                    openItem(item);
                }}
              >
                <img src={item.icon} alt={item.name} className="w-16 h-16 object-contain" />
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