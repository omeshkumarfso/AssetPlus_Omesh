import './App.css';
import Posts from './Posts';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CreatePost from './Posts/CreatePost';
import ShowPost from './Posts/ShowPost';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Posts />} />
      <Route path='post' element={<Posts />} />
      <Route path='createPost' element={<CreatePost />} />
      <Route path='showPost' element={<ShowPost />} />

    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
