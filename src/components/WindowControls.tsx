import useWindowStore from "../store/window";

interface WindowControlsProps {
  target: string;
}

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore() as {
    closeWindow: (id: string) => void;
  };

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" onClick={() => closeWindow(target)} />
      <div className="maximize" />
    </div>
  );
};

export default WindowControls;
