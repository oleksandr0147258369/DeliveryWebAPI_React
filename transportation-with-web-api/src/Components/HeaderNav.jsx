import {Menu, Layout} from "antd";
import {Link, useLocation} from "react-router-dom";

const {Header} = Layout;

const HeaderNav = () => {
	const location = useLocation();
	return (
		<Header style={{ display: 'flex', alignItems: 'center', height: 70,            // ← increase header height
			paddingInline: 24}}>
			<Menu
				theme={'light'}
				mode={'horizontal'}
				style={{
					flex: 1,
					minWidth: 0,
					height: '100%',
					fontSize: 16,
					display: 'flex',
					alignItems: 'center'
				}}
				selectedKeys={[location.pathname]}
			>
				<Menu.Item key="/" >
					<Link to="/">Home</Link>
				</Menu.Item>
				<Menu.Item key="/create">
					<Link to="/create">Create</Link>
				</Menu.Item>
			</Menu>
		</Header>
	)
}

export default HeaderNav;