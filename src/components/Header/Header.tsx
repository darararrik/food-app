import { useState } from 'react'
import { Link } from 'react-router'
import styles from './Header.module.scss'
import FavoriteIcon from '@/components/icons/FavoriteIcon/Favoriteicon'
import UserIcon from '@/components/icons/UserIcon'
import logo from '@/assets/logo.svg'
import Text from '@/components/Text/Text'
import NavText from './components/NavText'
import LoginModal from '@/components/Modal/components/LoginModal/LoginModal'

const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" width={36} height={36} />
          <Text view="p-20">Food Client</Text>
        </Link>
        <nav className={styles.nav}>
          <div className={styles.links}>
            <NavText to="/recipes" text="Recipes" />
            <NavText to="/" text="Meals Categories" />
            <NavText to="/" text="Products" />
            <NavText to="/" text="Menu Items" />
            <NavText to="/" text="Planning" />
          </div>
          <div className={styles.actions}>
            <Link to="/favorites">
              <FavoriteIcon width={20} height={20} />
            </Link>
            <div className={styles.actionIcon} onClick={() => setLoginModalOpen(true)}>
              <UserIcon />
            </div>
          </div>
        </nav>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  )
}

export default Header
