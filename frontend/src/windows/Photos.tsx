import { Mail, Search } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";
import { gallery, photosLinks } from "../constants";
import useWindowStore from "../store/window";

interface PhotoLink {
  id: number;
  icon: string;
  title: string;
}

interface GalleryItem {
  id: number;
  img: string;
}

const Photos = () => {
  const { openWindow } = useWindowStore() as {
    openWindow: (id: string, data?: any) => void;
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full h-100 sticky">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }: PhotoLink) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery h-100 overflow-y-scroll">
          <ul>
            {gallery.map(({ id, img }: GalleryItem) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
              >
                <img src={img} alt={`gallery-${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
