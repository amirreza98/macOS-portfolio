import useWindowStore from "../store/window";
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowControlsProps {
  target: string;
}

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore() as {
    closeWindow: (id: string) => void;
  };

  return (
    <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)}><X size={11} color="#444444" strokeWidth={4}/></div>
        <div className="minimize" onClick={() => closeWindow(target)} ><Minus size={11} color="#444444" strokeWidth={4}/></div>
        <div className="maximize"  ><Maximize2 size={8} color="#444444" strokeWidth={4}/></div>
    </div>
  );
};

export default WindowControls;
