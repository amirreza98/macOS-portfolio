import WindowControls from "../components/WindowControls";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "../store/window";

interface ImageData {
  name: string;
  imageUrl?: string;
}

const Image = () => {
  const { windows } = useWindowStore() as {
    windows: Record<
      string,
      { data?: ImageData; [key: string]: any } | undefined
    >;
  };

  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl && (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto rounded max-h-[70vh] object-contain"
            />
          </div>
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
