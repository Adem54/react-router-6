/*
Reading URL Params
Alright, back to the individual invoice URLs. Let's add a route for a specific invoice. 
We just visited some URLs like "/invoices/1998" and "/invoices/2005", 
let's make a new component at src/routes/invoice.jsx to render at those URLs:

COOK ONEMLI-ROUTER LAR ARASI DINAMIK PARAMETRE GONDERMEK
We'd like to render the invoice number instead of "???".
 Normally in React you'd pass this as a prop: <Invoice invoiceId="123" />, 
 but you don't control that information because it comes from the URL.

 Let's define a route that will match these kinds of URLs and enable us to get the invoice number from it.
 Create a new <Route> inside of the "invoices" route like this:
 bunu index.js sayfasinda yapaagiz ve invoices component inin icinde bulundugu Route etiketini de acilir kapanir etiket haline getirip icerisinde children olarak invoice isminde onlusturdugmuz componenti yerlestirecegiz...
*/
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice,deleteInvoice } from "../data";
export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  console.log(`location: `+location.search);//Eger bir arama yapilirsa yapilan arama sonucunda url e gelecek olan text i getiriyor  http://localhost:3000/invoices/2000?filter=as  ?filter=as  eger input a as girilmis ise.... bu sekilde oolur
  let params = useParams();
  console.log("params: ", params);
  let invoice = getInvoice(parseInt(params.invoiceId, 10)); //10 decimal, 10 luk sayi sisteminde sonucu almak icin yazilir
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>

      <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            console.log("location.search: "+location.search);
            navigate("/invoices" + location.search);//Silme isleminden sonra seni bu url in oldugu sayfaya yonlendirmeisini istiyoruz...
            //input ta bir filtreleme yapilmis ise o url e ekleniyordu ve simdi de en son hangi filtreleme var ise url de silme isleminden sonra o urle yonlendir demis olyyouruz ornegin ..  silmeden once http://localhost:3000/invoices/1995?filter=san bu url mevcut ve delete basip silince ne yapiyoruzu ?filter=san kismni alip ana url e  invoices/(bundan sonrasi inputta filtrelem yapilmis ise ?filter=san) seklinde dir yapilmamis ise hic filter vs birsey gormeyiz sadece invoices i goruruz url de....  http://localhost:3000/invoices?filter=san bu sekilde ise
          }}
        >
          Delete
        </button>
      </p>

    </main>
  );
}
//Note that the key of the param on the params object is the same as the dynamic segment in the route path:
//:invoiceId -> params.invoiceId
//Let's use that information to build up a more interesting invoice page.
//Open up src/data.js and add a new function to lookup invoices by their number:
/*
  export function getInvoice(number) {
  return invoices.find(
    (invoice) => invoice.number === number
  );
  And now back in invoice.jsx we use the param to look up an invoice and display more information:
  Note that we used parseInt around the param. It's very common for your data lookups to use a number type, but URL params are always string.

Navigating Programmatically
LISTELENEN ITEM IN DETAYINI GOSTERDIGMIZ EKRANA DELETE KOYDUK VE DELETE BUTONUNA TIKLAYINCA BIZI 

Okay, back to our app. Hang in there, you're almost done!

Most of the time the URL changes is in response to the user clicking a link. But sometimes you, the programmer, want to change the URL. A very common use case is after a data update like creating or deleting a record.

Let's add a button that marks the invoice as paid and then navigates to the index route.

First you can copy and paste this function that deletes an invoice from our fake data store:
 
  src/data.js
  export function deleteInvoice(number) {
  invoices = invoices.filter(
    (invoice) => invoice.number !== number
  );
}

Now let's add the delete button, call our new function, and navigate to the index route:
src/routes/invoice.jsx

 import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getInvoice,deleteInvoice } from "../data";

export default function Invoice() {
 let navigate = useNavigate();
  let location = useLocation();


  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      
      BUTTONU EKLEDIK
 <p>
        <button
          onClick={() => {
            deleteInvoice(invoice.number);
            navigate("/invoices" + location.search);
          }}
        >
          Delete
        </button>
      </p>

      Notice we used useLocation again to persist the query string by adding location.search to the navigation link.

  */
