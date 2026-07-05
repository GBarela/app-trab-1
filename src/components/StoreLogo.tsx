import { ComponentProps } from 'react';

import StoreLogoIcon from '../img/storeLogoIcon.0f542fa4.svg';

type StoreLogoProps = {
  width?: number;
  height?: number;
};

type SvgProps = ComponentProps<typeof StoreLogoIcon>;

export default function StoreLogo({ width = 108, height = 30 }: StoreLogoProps) {
  return <StoreLogoIcon width={width} height={height} />;
}