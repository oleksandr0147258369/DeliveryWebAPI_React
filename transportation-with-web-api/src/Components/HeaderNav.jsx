import {Menu, Layout} from "antd";
import {Link, useLocation} from "react-router-dom";

const {Header} = Layout;

const HeaderNav = () => {
	const location = useLocation();
	return (
		<Header
			style={{
				display: 'flex',
				alignItems: 'center',
				height: 70,
				paddingInline: 24
			}}
		>
			<Menu
				theme="light"
				mode="horizontal"
				selectedKeys={[location.pathname]}
				style={{
					flex: 1,
					minWidth: 0,
					height: '100%',
					fontSize: 16,
					display: 'flex',
					alignItems: 'center'
				}}
				items={[
					{
						key: "/",
						label: <Link to="/">Countries</Link>
					},
					{
						key: "/cities",
						label: <Link to="/cities">Cities</Link>
					},
					{
						key: "/create/country",
						label: <Link to="/create/country">Create country</Link>
					},
					{
						key: "/create/city",
						label: <Link to="/create/city">Create city</Link>
					}
				]}
			/>
		</Header>
	)
}

export default HeaderNav;