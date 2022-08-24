const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><img className="main-logo" src="../assets/img/logo.png" /><span className="text-logo">AppSus.</span></h3>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            {/* <NavLink to="/mail"><img className="main-logo" src="../assets/img/logo.png" /></NavLink> */}
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Notes</NavLink>
        </nav>
    </header>
}
