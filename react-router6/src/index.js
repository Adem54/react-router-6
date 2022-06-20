import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Invoice from "./routes/invoice";

const root = ReactDOM.createRoot(document.getElementById("root"));
/*
      Let's get some automatic, persistent layout handling by doing just two
      things: Nest the routes inside of the App route Render an Outlet First
      let's nest the routes. Right now the expenses and invoices routes are
      siblings to the app, we want to make them children of the app route:
      When routes have children it does two things:
      It nests the URLs ("/" + "expenses" and "/" + "invoices")
      It will nest the UI components for shared layout when the child route matches:
      Simdi App.js e gidersek orda en dis sarmalayici etikenin kapanis kisminin hemen ustunde eger <Outlet/> i kullandigmiz zaman ,
       biz App.js sayfasinda hangi Route lari kullanmis isek onlar arasinda degis tokus,takas yapar ve hangisine tiklanirsa veya
       hangisi url de tiklanirsa onun iceriginin render edilmesini saglar, yani dinamik bir sekilde calisyor....BESTPRACTISE
         Now click around again. The parent route (App.js) persists while the <Outlet> swaps between the two child routes (<Invoices> and <Expenses>)!
As we'll see later, this works at any level of the route hierarchy and is incredibly powerful
      */
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        {/*ana url e  /expense eklenirse expenses sayfasini getirecek.. */}
        <Route path="invoices" element={<Invoices />}>
        <Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            }
          />
          <Route path=":invoiceId" element={<Invoice />} />
          {/* : iki nokta ust uste yi koymak coook onemlidir useParams araciigi ile o sekilde parametre olarak gider */}
        </Route>
        {/*ana url e  /invoices eklenirse invoices sayfasini getirecek.. */}
        <Route
          path="*" //The "*" has special meaning here. It will match only when no other routes do.
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

/*
Eger biz ornegin ana sayfamiz App olacak ise App Route u ile onun altinda bulunacak sayfalar arasindas paretn child iliskisi
 kurmaz isek birbrileri arasinda baglantiyi kaybederiz soanra da sayflar arasi kontorllu gecis de zorlaniriz ondan dolayi biz 
 route lar arasi parent child iliskisi seklinde route larimizi ayarlayacagiz...
 Nested Routes-COOK ONEMLI BIR KONU.....
You may have noticed when clicking the links that the layout in App disappears. Repeating shared layouts is a pain in the neck.
 We've learned that most UI is a series of nested layouts that almost always map to segments of the URL so this idea is baked 
 right in to React Router
Let's get some automatic, persistent layout handling by doing just two things:
Nest the routes inside of the App route
Render an Outlet
First let's nest the routes. Right now the expenses and invoices routes are siblings to the app, we want to make 
them children of the app route:


Index Routes
Index routes are possibly the most difficult concept in React Router for people to understand. So if you've struggled before, we hope this can clarify it for you.
Right now you're probably looking at one of the invoices. Click on the "Invoices" link in the global nav of your app. Notice that the main content area goes blank! We can fix this with an "index" route.
Kullanici invoices e tiklayinca invoices listelenecek http://localhost:3000/invoices url gelecek ama bos gelecek, biz listedeki invoice ten herhangi bir tanesine tiklayinca onun la ilgili bilgiler gelecek invoice.jsx componenti sayesinde.....Iste  http://localhost:3000/invoices  burasi tiklandiginda aslinda main content ana icerik blank-bos geliyor, iste bunu index route u yazarak cozuyoruz yani, bir route  yaziyoru o route attributune index veririz ve  dikkat edelim invoices route nin hemen altinda, ve invoiceId route nin de ustune yerlestiririz

  <Route path="invoices" element={<Invoices />}>
<Route
            index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
            }
          />
  <Route path=":invoiceId" element={<Invoice />} />

  Sweet! Now the index route fills the empty space!

Notice it has the index prop instead of a path. That's because the index route shares the path of the parent. That's the whole point--it doesn't have a path.
Dikkat edersek index attribute kullandigmiz route nin bir path i yok ve ne yapiyor parent inin path ini paylasiyor yani o path te calisiyor,butun mesele bu kendi path i yok, onun yerine index prop u var ve de parentinin path ini paylasiyor....

Maybe you're still scratching your head. There are a few ways we try to answer the question "what is an index route?". 
Hopefully one of these sticks for you:
Index routes render in the parent routes outlet at the parent route's path.-Ana parant in url inde iken onun icerigin render etmeyi saglar, index attribute u veya prop u
Index routes match when a parent route matches but none of the other children match..Index route parent route ile mathc oldugu ama hicbir children in mathc olmadigi durumda calisir
Index routes are the default child route for a parent route.-Index route lar parent route larin default child route leridir
Index routes render when the user hasn't clicked one of the items in a navigation list yet.
Index route lar parent route url inde iken ve children route larin listesi listelenmis ve onlardan henuz hicbirine tiklanmadigi zaman render ediliyor

Active Links
It's very common, especially in navigation lists, to display the link as the active link the user is looking at. Let's add this treatment to our invoices list by swapping out Link for NavLink. invoices icinde kullandigmiz Link i NavLink olarak degistiriyoruz...
*/
