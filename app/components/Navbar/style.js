/*
 *navbar
 */
const Navbar = {
  display: 'flex',
  borderBottom: '1px solid',
  marginBottom: '1rem'
}

/*
 *navbar group
 */
const Navgroup = {
  display: 'inline-flex',
}

/*
 *navbar login
 */
const Navlogin = {
  marginLeft: 'auto',
}

/*
 *navbar links
 */
const Navlinks = {
  display: 'inline-flex',
  padding: '0.6rem 0.8rem',
  textDecoration: 'none',
  transition: 'opacity 0.25s ease-in-out',
}

const Isactive = {
  opacity: '0.5',
}

const SX = {
  navbar: Navbar,
  navgroup: Navgroup,
  navlogin: Navlogin,
  navlinks: Navlinks,
  isactive: Isactive
}

export default SX;
