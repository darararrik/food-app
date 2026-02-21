import Text from '@/components/Text/Text'
import { NavLink } from 'react-router'
import styles from './NavText.module.scss'

interface NavTextProps {
  to: string
  text: string
}

const NavText: React.FC<NavTextProps> = ({ to, text }) => {
  return (
    <NavLink to={to} className={styles.link}>
      {({ isActive }) => (
        <Text view="p-16" className={isActive ? '' : styles.active}>
          {text}
        </Text>
      )}
    </NavLink>
  )
}

export default NavText
