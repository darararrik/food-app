import React from 'react'
import classNames from 'classnames'
import styles from './CheckBox.module.scss'

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({
  onChange,
  className,
  checked,
  disabled,
  ...props
}) => {
  return (
    <label
      className={classNames(styles.checkboxLabel, className, {
        [styles.checkboxLabel_disabled]: disabled,
      })}
    >
      <input
        {...props}
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  )
}

export default CheckBox
