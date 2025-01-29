let totalquantity;
let  totalprice;
const api="https://crudcrud.com/api/6b4d80fb5d794a2a92b7c13860a3af66/"+"books";
 async function handleFormSubmit(event){
    event.preventDefault();
  const itemname=event.target.itemname.value;
  const description=event.target.description.value;
const price=event.target.price.value;
const quantity=event.target.quantity.value;

const userdetails={
itemname:itemname,
description:description,
price:price,
quantity:quantity
}
let response = await axios.post(api,{
userdetails
})
console.log(userdetails)
console.log(response.data);

display(response.data.userdetails,response.data._id);
}
function display(userdetails,id){
  //  console.log(userdetails.quantity)
    const buy1=document.createElement('button')
    const text1=document.createTextNode('buy1');
buy1.id='buybutton1';
   buy1.appendChild(text1);
const buy2=document.createElement('button');
const text2=document.createTextNode('buy 2')
buy2.appendChild(text2)
 const buy3=document.createElement('button');
 const text3=document.createTextNode('buy 3');
 buy3.appendChild(text3)

    const ul=document.querySelector('ul');
    const createnewele=document.createElement('li');
totalquantity=userdetails ?.quantity;
totalprice=userdetails ?.price;
    createnewele.textContent=userdetails.itemname+" "+ userdetails.description+" "+ totalprice +" "+totalquantity;
    ul.appendChild(createnewele );
    ul.appendChild(buy1)
     ul.appendChild(buy2)
     ul.appendChild(buy3)
    // const quantity=document.getElementById('quantity');

    buy1.addEventListener('click',function(){
      
if(totalquantity>0 && totalprice>0){
    totalquantity--;
    totalprice--;
    updateServer(userdetails, totalquantity, totalprice, createnewele,id) 
    createnewele.textContent=userdetails.itemname+" "+ userdetails.description+" "+ totalprice +totalquantity;
}

    
    })
    buy2.addEventListener('click',function(){
        if(totalquantity>0 && totalprice>0){
            totalprice=totalprice-2;
            totalquantity=totalquantity-2;
           // console.log(totalprice)
           updateServer(userdetails, totalquantity, totalprice, createnewele,id) 
            createnewele.textContent=userdetails.itemname+" "+ userdetails.description+" "+ totalprice+ " " +totalquantity;
        }
    })

   buy3.addEventListener('click',function(){
        if(totalquantity>0 && totalprice>0){
            totalquantity=totalquantity-3;
            totalprice=totalprice-3;
           // console.log(totalprice)
           updateServer(userdetails, totalquantity, totalprice, createnewele,id) 
            createnewele.textContent=userdetails.itemname+" "+ userdetails.description+" "+ totalprice +" "+totalquantity;
        }
    })

      async function updateServer(userdetails, totalquantity, totalprice, createnewele,id) {
        const updatedDetails = {
            ...userdetails,
            quantity: totalquantity,
            price: totalprice
        };
       // await fetch(api+id,{ method:'PUT', body:JSON.stringify(updatedDetails)})
        await axios.put(api+id,{updatedDetails})
            createnewele.textContent = updatedDetails.itemname+ updatedDetails.description+ price+ quantity;
       
    }

    
                
}

document.addEventListener('DOMContentLoaded',async()=>{
 let response=await axios.get(api)
console.log(response.data);
for(let item of response.data){
    display(item.userdetails,item._id)
}
})