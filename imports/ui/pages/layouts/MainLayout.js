import React, { PropTypes } from 'react'
import NavBar from './NavBar'

const MainLayout = props => {
    return	<div>
		        <header>
		          {props.nav || <NavBar />}
		        </header>
		        <main className="container">
		          {props.main}
		        </main>
		    </div>
}

MainLayout.propTypes = {
	main: PropTypes.node.isRequired,
	nav: PropTypes.node
}

export default MainLayout
