import {TEXT_COLORS, TextColor} from '@/constants/colors';

interface ColorPickerProps {
    selectedColor: TextColor;
    onColorChange: (color: TextColor) => void;
    label?: string;
    disabled?: boolean;
}

export default function ColorPicker({
                                        selectedColor,
                                        onColorChange,
                                        label,
                                        disabled = false
                                    }: ColorPickerProps) {
    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="flex flex-wrap gap-2">
                {TEXT_COLORS.map((color) => (
                    <button
                        key={color}
                        type="button"
                        disabled={disabled}
                        onClick={() => onColorChange(color)}
                        className={`
                            w-8 h-8 rounded-full border-2 transition-all duration-200
                            ${selectedColor === color
                            ? 'border-[var(--color-primary)] scale-110 shadow-md'
                            : 'border-gray-300 hover:border-gray-400'
                        }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        style={{
                            backgroundColor: color,
                            boxShadow: color === '#FFFFFF' ? 'inset 0 0 0 1px #e5e7eb' : undefined
                        }}
                        title={color}
                    />
                ))}
            </div>
        </div>
    );
}