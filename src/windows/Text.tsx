import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window"

const Text = () => {
    const { windows } = useWindowStore()
    const data = windows.textfile?.data

    if (!data) return null

    const { name, image, subtitle, description } = data

    return (
        <>
            <div id="window-header">
                <WindowControls target="textfile" />
                <h2>{name}</h2>
            </div>

            <div className="p-5 space-y-6 bg-white">
                {image ? (
                    <div className="w-full">
                        
                    </div>
                )}
            </div>
        </>
    )
}