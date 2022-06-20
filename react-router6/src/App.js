
import './App.css';
import {Outlet,Link} from "react-router-dom";
//We wrap our content first with <BrowserRouter>
function App() {
  return (

       <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{/*http://localhost:3001/invoices */}
        <Link to="/expenses">Expenses</Link>{/* sayfa ici link, render etmeden sayfa degistirererk degisiklikleri korumamizi saglar
         http://localhost:3001/expenses */}
      </nav>
      <Outlet/>
    </div>
  );
  /*
  Now click around again. The parent route (App.js) persists while the <Outlet> swaps between the two child routes (<Invoices> and <Expenses>)!
As we'll see later, this works at any level of the route hierarchy and is incredibly powerful
  */
}

export default App;
