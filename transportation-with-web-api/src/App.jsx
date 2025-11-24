import './App.css'
import Countries from "./Components/Countries.jsx";
import {Breadcrumb, Layout} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderNav from "./Components/HeaderNav.jsx";
import Create from "./Pages/Create.jsx";
import Home from "./Pages/Home.jsx";

const {Header, Content} = Layout;

function App() {
	return (
		<BrowserRouter>
			<HeaderNav/>
			<Content style={{ padding: '0 48px' }}>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/create" element={<Create/>}/>
				</Routes>
			</Content>
		</BrowserRouter>
	)
}

export default App