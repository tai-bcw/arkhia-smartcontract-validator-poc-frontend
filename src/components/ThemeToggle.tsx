import DayNightToggle from "react-day-and-night-toggle";
import { useRecoilState } from 'recoil';

import atom from '@/atoms/atoms';

export default function ThemeToggle ({ size = 24 }: { size?: number }) {
    const [darkMode, setDarkMode] = useRecoilState(atom.darkMode);

    return (
        <DayNightToggle
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            shadows={false}
            size={size}
        />
    );
}
