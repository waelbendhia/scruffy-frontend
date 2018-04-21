import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { definitions } from '.';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '30px !important',
    marginRight: '8px',
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    height: '40px',
    marginTop: '5px',
    marginBottom: '5px',
  },
  input: {
    padding: 0,
    outline: 'none',
    height: '38px',
    width: '100%',
    fontSize: '30px',
    border: 0,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    backgroundColor: 'transparent',
    borderBottomColor: definitions.colors.grey,
  },
  black: {
    color: definitions.colors.black,
  },
  white: {
    color: definitions.colors.white,
  },
  highlight: {
    position: 'absolute',
    fontSize: '30px',
    bottom: 0,
    left: 0,
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'pre',
    height: '2px',
    maxWidth: '100%',
    backgroundColor: definitions.colors.primary,
  },
});

interface InputPropsBase {
  className?: string;
  placeHolder?: string;
}

interface ITextInputProps extends InputPropsBase {
  type: 'text';
  onChange: (_: string) => void;
  value: string;
}

interface INumberInputProps extends InputPropsBase {
  type: 'number';
  onChange: (_: number) => void;
  value: number;
  minValue: number;
  maxValue: number;
}

type InputProps = ITextInputProps | INumberInputProps;

const Input = (props: InputProps & { whiteText?: boolean, icon?: string }) => (
  <div className={css(styles.container) + ' ' + props.className}>
    {!!props.icon
      ? <i className={'material-icons ' + css(styles.icon)}>{props.icon}</i>
      : null
    }
    <div className={css(styles.inputContainer)}>
      <input
        className={css(
          styles.input,
          props.whiteText ? styles.white : styles.black,
        )}
        type={props.type}
        onChange={
          e =>
            props.type === 'number'
              ? props.onChange(
                Math.max(
                  Math.min(parseFloat(e.target.value) || 0, props.maxValue),
                  props.minValue,
                )
              )
              : props.onChange(e.target.value)
        }
        value={props.value}
        placeholder={props.placeHolder}
      />
      <span className={css(styles.highlight)}>{props.value}</span>
    </div>
  </div>
);

export default Input;