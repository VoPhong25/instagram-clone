import { useDispatch } from "react-redux";
import Router from "./Pages/Router/Router";
import { useEffect } from "react";
import { getUserProfileAction } from "./Redux/User/Action";
function App() {
  const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Tái xác thực và lấy lại thông tin người dùng sau khi tải lại trang
            dispatch(getUserProfileAction(token)); 
        }
    }, [dispatch]);
  return (
    <div className="App">
      <Router/>
      
    </div>
  );
}

export default App;
