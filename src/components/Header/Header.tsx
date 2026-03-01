import { useState } from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store/StoreContext'
import styles from './Header.module.scss'
import logo from '@/assets/logo.svg'
import Text from '@/components/Text/Text'
import NavText from '../NavText/NavText'
import LoginModal from '@/components/Modals/LoginModal'
import CloseIcon from '@/components/icons/CloseIcon'
import classNames from 'classnames'
import MenuIcon from '@/components/icons/MenuIcon'
import FavoriteIcon from '../icons/FavoriteIcon'
import UserIcon from '../icons/UserIcon'

const Header = observer(() => {
  const { user: userStore } = useStore()
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleUserClick = () => {
    if (userStore.isAuthenticated) {
      if (confirm('Are you sure you want to log out?')) {
        userStore.logout()
      }
    } else {
      setLoginModalOpen(true)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.burger} onClick={toggleMenu}>
          <MenuIcon />
        </button>

        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" width={36} height={36} />
          <Text view="p-20">Food Client</Text>
        </Link>

        <nav className={classNames(styles.nav, styles.desktopNav)}>
          <NavText to="/" text="Recipes" />
          <NavText to="/favorites" text="Favorites" />
          <NavText to="/products" text="Products" />
          <NavText to="/menu-items" text="Menu Items" />
          <NavText to="/planning" text="Planning" />
        </nav>

        <div className={classNames(styles.mobileMenu, { [styles.open]: isMenuOpen })}>
          <button className={styles.closeMenu} onClick={toggleMenu}>
            <CloseIcon />
          </button>
          <nav className={styles.mobileNav}>
            <NavText to="/" text="Recipes" onClick={toggleMenu} />
            <NavText to="/favorites" text="Favorites" onClick={toggleMenu} />
            <NavText to="/products" text="Products" onClick={toggleMenu} />
            <NavText to="/menu-items" text="Menu Items" onClick={toggleMenu} />
            <NavText to="/planning" text="Planning" onClick={toggleMenu} />
          </nav>
        </div>

        <div className={styles.actions}>
          <Link to="/favorites">
            <FavoriteIcon width={20} height={20} />
          </Link>
          <div
            className={classNames(styles.actionIcon, {
              [styles.authenticated]: userStore.isAuthenticated,
            })}
            onClick={handleUserClick}
          >
            <UserIcon color={userStore.isAuthenticated ? 'primary' : 'accent'} />
          </div>
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </header>
  )
})
export default Header
