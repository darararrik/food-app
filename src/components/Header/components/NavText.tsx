import Text from '@/components/Text/Text'
import { NavLink } from 'react-router'
import styles from './NavText.module.scss'
import classNames from 'classnames'

interface NavTextProps {
  to: string
  text: string
  end?: boolean
}

const NavText: React.FC<NavTextProps> = ({ to, text, end }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => classNames(styles.link, { [styles.active]: isActive })}
    >
      <Text view="p-16">{text}</Text>
    </NavLink>
  )
}

export default NavText
