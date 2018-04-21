import * as React from 'react';
import {
  SmallCard,
  IBand,
  Loadable,
  Grid,
} from '../shared';

const defaultImage = require('./bandDefault.svg') as string;

interface IGridProps {
  className?: string;
  bands: Loadable<IBand[]>;
  changePage: (delta: number) => void;
}

const BandsGrid = (props: IGridProps) => (
  <Grid
    {...props}
    data={props.bands}
    minRows={2}
    displayError={JSON.stringify}
    cell={b =>
      <SmallCard
        key={b.url}
        bgUrl={b.imageUrl || defaultImage}
        {...b}
      >
        {b.name}
      </SmallCard>}
  />
);

export default BandsGrid;