import "./App.css";
import RouterLink from "./routes/RouterLink";
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<>
			<RouterLink />
			<ToastContainer theme="colored" />
		</>
	);
}

export default App;
