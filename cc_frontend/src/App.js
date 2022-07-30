import "bootstrap/dist/css/bootstrap.min.css";
import AddMentor from './Pages/AddMentor.js';
import BookTiming from './Pages/BookTiming.js'
import { Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" exact element={<AddMentor />} />
			<Route path="/book" exact element={<BookTiming />} />
      </Routes>
    </div>
  );
}

export default App;
