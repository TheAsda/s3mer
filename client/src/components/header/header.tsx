import React from 'react';
import { Text } from '../text/text';
import { useVisitorId } from '../../lib/useVisitorId';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { Switch } from '../switch/switch';
import { Link } from '../link/link';
import { useLocation } from 'react-router';

export interface HeaderProps {
  isDarkMode: boolean;
  onModeChange: (value: boolean) => void;
}

export const Header = (props: HeaderProps) => {
  const visitorId = useVisitorId();
  const location = useLocation();

  return (
    <header className="flex justify-between items-stretch px-2 gap-4 h-8 bg-gray-100 dark:bg-gray-800">
      <nav className="flex items-center">
        {location.pathname !== '/' && (
          <Link to="/" variant="inline">
            Home
          </Link>
        )}
      </nav>
      <div className="flex items-center">
        <Text className="font-bold">{visitorId}</Text>
        <div className="flex flex-row items-center gap-1">
          <SunIcon className="h-5 w-5 text-bright-sun-600 dark:text-bright-sun-300" />
          <Switch
            name="Dark mode switch"
            checked={props.isDarkMode}
            onChange={props.onModeChange}
          />
          <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-200" />
        </div>
      </div>
    </header>
  );
};
