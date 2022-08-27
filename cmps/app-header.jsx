const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><img className="main-logo" src="assets/img/logo.png" /><span className="text-logo">AppSus.</span></h3>
        </Link>
        <nav>
            <NavLink className="header-nav" exact to="/">Home</NavLink>
            <NavLink className="header-nav" to="/about">About</NavLink>
            <NavLink className="header-nav" to="/mail">Mail</NavLink>
            <NavLink className="header-nav" to="/note">Notes</NavLink>
        </nav>
    </header>
}
