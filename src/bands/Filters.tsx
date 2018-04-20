import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions, Input } from '../shared';

const styles = StyleSheet.create({
  filters: {
    padding: '24px',
    backgroundColor: definitions.colors.white,
  }
});

interface IFiltersProps {
  className?: string;
  updateName: (_: string) => void;
  value: string;
}

const Filters = ({ updateName, className, value }: IFiltersProps) => (
  <div
    className={css(styles.filters) + ' ' + className}
  >
    <h1>Search:</h1>
    <Input
      type="text"
      onChange={updateName}
      value={value}
      placeHolder="name"
    />
  </div>
);

export default Filters;