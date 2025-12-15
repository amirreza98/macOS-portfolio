import useThemeStore from "../store/theme";

const choices = ["light", "dark", "system"] as const;

export default function ThemeSelector() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);

  return (
    <div className="flex gap-2 p-2">
      <h4 className="text-sm font-medium">Appearance:</h4>
      <div className="flex flex-col">
        {choices.map((c) => (
          <button
            key={c}
            onClick={() => setMode(c)}
            // Use a dedicated `selected` class so we can control colors
            // in theme variants via CSS and ensure accessibility.
            className={`text-sm px-3 py-2 text-left rounded ${mode === c ? "selected bg-blue-100" : "hover:bg-gray-50"}`}
          >
            {c[0].toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
