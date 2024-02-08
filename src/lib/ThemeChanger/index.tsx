'use client'

import { useTheme } from 'next-themes'
import { memo, useEffect, useState } from 'react';

import SunIcon from './components/SunIcon';
import clsx from 'clsx';
import MoonIcon from './components/MoonIcon';

export enum ButtonTheme {
  CLEAR = '',
  OUTLINE = 'cursor-pointer rounded-[20px] border-2 md:border-0  px-[27px] py-[17px] bg-white dark:bg-dark-bg-content dark:hover:outline hover:outline hover:outline-[2px]  hover:outline-gray-text',
}

export enum IconSize {
  S = 16,
  M = 22,
  L = 26,
}

interface ButtonProps {
  buttonTheme?: ButtonTheme;
  size?: number;
  whiteColor?: string;
  darkColor?: string;
  hoverWColor?: string;
  hoverDColor?: string;
}

const ThemeChanger = (props: ButtonProps) => {
  const {
    buttonTheme = ButtonTheme.OUTLINE,
    size = IconSize.L,
    whiteColor = '#B5B5B5',
    darkColor = '#B5B5B5',


  } = props;
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      {theme !== 'light' ?
        <SunIcon onClick={() => setTheme('light')} className={clsx([buttonTheme])} width={size} height={size} fill={darkColor} />
        :
        <MoonIcon onClick={() => setTheme('dark')} className={clsx([buttonTheme])} width={size} height={size} fill={whiteColor} />
      }
    </ >
  )
}

export default memo(ThemeChanger);




