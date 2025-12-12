import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import { locations } from "#constants";
import useWindowStore from "#store/window";

import clsx from "clsx";

interface LocationItem {
  id: string;
  name: string;
  kind?: string;
  fileType?: string;
  icon: string;
  href?: string;
  position?: string;
  children?: LocationItem[];
}

function Finder() {
  const { openWindow } = useWindowStore() as {
    openWindow: (id: string, data?: any) => void;
  };

  const { activeLocation, setActiveLocation } = useLocationStore() as {
    activeLocation: LocationItem;
    setActiveLocation: (item: LocationItem) => void;
  };

  const openItem = (item: LocationItem) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType ?? "") && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name: string, items: LocationItem[]) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(item.id === activeLocation?.id ? "active" : "not-active")}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <h2>Finder</h2>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations) as LocationItem[])}
          {renderList("Work", locations.work.children as LocationItem[])}
        </div>

        <ul className="content">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
