import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";
/*
Feel free to copy/paste all of this, but take special note of the <Link> elements to prop:

Adding a "No Match" Route
That didn't go as you might have expected. If you click those links the page goes blank! 
That's because none of the routes we've defined match a URL like the ones we're linking to: "/invoices/123".
Before we move on, it's good practice to always handle this "no match" case. Go back to your route config and add this:

Reading URL Params
Alright, back to the individual invoice URLs. Let's add a route for a specific invoice. 
We just visited some URLs like "/invoices/1998" and "/invoices/2005", 
let's make a new component at src/routes/invoice.jsx to render at those URLs:

COOK ONEMLI-ROUTER LAR ARASI DINAMIK PARAMETRE GONDERMEK
We'd like to render the invoice number instead of "???".Bos statik bir ??? data yazmistik invoice.js icerisine ve biz bu statik yapiyi degil dinamik olarak invoices listesini listeleyince Link route u ile to yu biz invoices/number orda tikloanan numarasyi yazdrdik, iste hangi invoice numarasina tiklnirsa biz onu invoice.jsx gostersin diyoruz yani parametre olarak alsin, Invoice componenti parametre oalrak dinamik tiklanan numarayi alsin...
 Normally in React you'd pass this as a prop: <Invoice invoiceId="123" />, 
 but you don't control that information because it comes from the URL.
 Let's define a route that will match these kinds of URLs and enable us to get the invoice number from it.
 Create a new <Route> inside of the "invoices" route like this: bunu index.js sayfasinda yapaagiz ve invoices component inin icinde bulundugu Route etiketini de acilir kapanir etiket haline getirip icerisinde children olarak invoice isminde onlusturdugmuz componenti yerlestirecegiz...

 We just created a route that matches urls like "/invoices/2005" and "/invoices/1998". The :invoiceId part of the path is a "URL param", meaning it can match any value as long as the pattern is the same.
The <Route> adds a second layer of route nesting when it matches: <App><Invoices><Invoice /></Invoices></App>. Because the <Route> is nested the UI will be nested too.
Alright, now go click a link to an invoice, note that the URL changes but the new invoice component doesn't show up yet. Do you know why?

That's right! We need to add an outlet to the parent layout route (we're really proud of you).
*/
export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}//Bu input a girilen deger i veriyor var ise yok ise zaten bos getir diyoruz ki hata almayalim zaten input bos kalmamis gerekir default bir degeri olmalidir ki deger girilmedigi takdirde hata almayalim..., searchParams.get("filter") bu gordugmuz kadari ile bize input icine deger girilirse onu donderiyor, filter bir keyword, searchParams la beraber gelen bir keyword
         // useSearchParams is now returning a URLSearchParams with "filter" as one of its values.
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
          {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            console.log("filter: "+filter);//invoices.jsx:54 filter: santa -biz input a birsey yazarsak filter yazdigimz seyi donderiyor..
            if (!filter) return true;//Eger inputa birsey girmedi ise burda true return ederek filtreleme yapmadan tum datanin gelmesini sagliyuoruz
            //input a data girmis ise de o zaman inputa girilen degerin sira ile tum name lerde filtrelenerek var olup olmadini kontrol ediyoruz..
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());//girilen deger isim string inde basliyorsa onu getir....
          })

        .map(
          (
            invoice //Link attributune paramtereyi  gonderiyor tiklayinca to ya karsilik gelen url adres cubugunda gozukecek ve eger ki biz bu url li invoices route u altinda olusturmus isek o zaman bu invoice.jsx te useParams araciligi ile  invoiceId alinacaktir....Yani burda hangi numaralar invoices/number    bu url de gelirse
          ) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          )
        )}
      </nav>
      <Outlet />
    </div>
  );
}
/*
  Active Links
It's very common, especially in navigation lists, to display the link as the active link the user is looking at. Let's add this treatment to our invoices list by swapping out Link for NavLink. invoices icinde kullandigmiz Link i NavLink olarak degistiriyoruz...
Ayrica style a bir arrow function yaziyoruz.....isActive, yani tiklanan link tiklandigi belli olsun aktif gozuksun diye...
style kismini su sekilde degistirerek tiklanan  invoice in kirmizi renki olmasini sagliyoruz...

  style={{ display: "block", margin: "1rem 0" }} bunun yerine... asagidaki ni degistirerek
style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            We did three things there:

We swapped out Link for NavLink.
We changed the style from a simple object to a function that returns an object.
We changed the color of our link by looking at the isActive value that NavLink passed to our styling function.

normal string
<NavLink className="red" />
 function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />

Search Params
Search params are like URL params but they sit in a different position in the URL.
 Instead of being in the normal URL segments separated by /, they are at the end after a ?. 
 You've seen them across the web like "/login?success=1" or "/shoes?brand=nike&sort=asc&sortby=price".
React Router makes it easy to read and manipulate the search params with useSearchParams.
 It works a lot like React.useState() but stores and sets the state in the URL search params instead of in memory.
Let's see it in action by adding a little filter on the invoices nav list.

 
import { NavLink,Outlet, useSearchParams, } from "react-router-dom";
let [searchParams, setSearchParams] = useSearchParams();

 <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />  
          {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })

        .map  //input icine herhangi bir veri yazdigmizda listelenen invoice lerin name leri icinde filtreleme yapiyor ve cakisan name ler hangisi ise onlar ekranda kaliyor cakisan yok sa da eknrada hicbirisi kalmiyor ve de url de ise  ornegin biz eger santa yazarsak input a 
        http://localhost:3000/invoices/1997?filter=santa   seklinde santayi filtreleme yapmis oluyor...search params oluyor yani....

        Check this out, as the user types:
       setSearchParams() is putting the ?filter=... search params in the URL and rerendering the router.
       useSearchParams is now returning a URLSearchParams with "filter" as one of its values.
       The URLSearchParams interface defines utility methods to work with the query string of a URL.
       URLSearchParams()
      Returns a URLSearchParams object instance. 
      URLSearchParams.get()
      Returns the first value associated with the given search parameter.
      We set the value of the input to whatever is in the filter search param (it's just like useState but in the URLSearchParams instead!)
      We filter our list of invoices based on the filter search param.

     
      Custom Behavior
If you filter the list and then click a link, you'll notice that the list is no longer filtered and the search param is cleared from the <input> and the URL. You might want this, you might not! Maybe you want to keep the list filtered and keep the param in the URL.

We can persist the query string when we click a link by adding it to the link's href. We'll do that by composing NavLink and useLocation from React Router into our own QueryNavLink (maybe there's a better name, but that's what we're going with today).

import { useLocation, NavLink } from "react-router-dom";
function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;

  You can put that code anywhere you want in your app and then replace your NavLink in src/routes/invoices.jsx with QueryNavLink and you're done.
Like useSearchParams, useLocation returns a location that tells us information about the URL. A location looks something like this:
}
{
  pathname: "/invoices",
  search: "?filter=sa",
  hash: "",
  state: null,
  key: "ae4cz2j"
}

With that information, the task in QueryNavLink is pretty simple: add the location.search onto the to prop. You might be thinking, "Geez, seems like this should be a built-in component of React Router or something?". Well, let's look at another example.

EXAMPLE
What if you had links like this on an ecommerce site.
<Link to="/shoes?brand=nike">Nike</Link>
<Link to="/shoes?brand=vans">Vans</Link>
And then you wanted to style them as "active" when the url search params match the brand? You could make a component that does exactly that pretty quickly with stuff you've learned in this tutorial:

function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?brand=${brand}`}
      {...props}
    />
  );
}

That's going to be active for "/shoes?brand=nike" as well as "/shoes?brand=nike&brand=vans". Maybe you want it to be active when there's only one brand selected:

let brands = params.getAll("brand");
let isActive =
  brands.includes(brand) && brands.length === 1;
// ...
  Or maybe you want the links to be additive (clicking Nike and then Vans adds both brands to the search params) instead of replacing the brand:

  function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}

Or maybe you want it to add the brand if it's not there already and remove it if it's clicked again!


function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || value !== brand
      )
    );
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}

As you can see, even in this fairly simple example there are a lot of valid behaviors you might want. 
React Router doesn't try to solve every use-case we've ever heard of directly. 
Instead, we give you the components and hooks to compose whatever behavior you need


Navigating Programmatically
Okay, back to our app. Hang in there, you're almost done!

Most of the time the URL changes is in response to the user clicking a link. But sometimes you, the programmer, want to change the URL. 
A very common use case is after a data update like creating or deleting a record.

Let's add a button that marks the invoice as paid and then navigates to the index route.

First you can copy and paste this function that deletes an invoice from our fake data store:
Now let's add the delete button, call our new function, and navigate to the index route:

*/
