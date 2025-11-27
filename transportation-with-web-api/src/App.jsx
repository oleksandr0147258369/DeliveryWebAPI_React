import './App.css'
import {Layout} from "antd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderNav from "./Components/HeaderNav.jsx";
import Create from "./Pages/Create.jsx";
import Home from "./Pages/Home.jsx";
import Edit from "./Pages/Edit.jsx";
import CreateCity from "./Pages/CreateCity.jsx";
import CitiesPage from "./Pages/CitiesPage.jsx";

const {Header, Content} = Layout;

function App() {
	return (
		<BrowserRouter>
			<HeaderNav/>
			<Content style={{ padding: '0 48px' }}>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/create/country" element={<Create/>}/>
					<Route path="/edit/:id" element={<Edit/>}/>
					<Route path="/cities" element={<CitiesPage/>}/>
					<Route path="/create/city" element={<CreateCity/>}/>
				</Routes>
			</Content>
		</BrowserRouter>
	)
}

export default App