import React from 'react';
import { Text } from '../text/text';
import { useVisitorId } from '../../lib/useVisitorId';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { Switch } from '../switch/switch';

export interface HeaderProps {
  isDarkMode: boolean;
  onModeChange: (value: boolean) => void;
}

export const Header = (props: HeaderProps) => {
  const visitorId = useVisitorId();

  return (
    <div className="w-full flex justify-end items-center px-2 gap-4 h-8 dark:bg-gray-700">
      <Text className="font-bold">{visitorId}</Text>
      <div className="flex flex-row items-center gap-1">
        <SunIcon className="h-5 w-5" />
        <Switch
          name="Dark mode switch"
          checked={props.isDarkMode}
          onChange={props.onModeChange}
        />
        <MoonIcon className="h-5 w-5" />
      </div>
    </div>
  );
};
