import useWindowStore from "#store/window.js";

const WindowControls = ( { target } ) => {
    const { closeWindow } = useWindowStore();

  return (
    <div id= "widnow-controls">
      <div className="close" onClick={()=>closeWindow(target)} />
      <div className="minimize"/>
      <div className="maximize"/>
    </div>
  );
};

export default WindowControls;