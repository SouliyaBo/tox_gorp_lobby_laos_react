import "./App.css";
import RouterLink from "./routes/RouterLink";
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<Toaster
				position="top-right"
				reverseOrder={false}
			/>
			<RouterLink />
		</>
	);
}

export default App;
